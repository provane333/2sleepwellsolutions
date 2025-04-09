import { useState } from "react";
import { useLocation, Link } from "wouter";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";

const quizSchema = z.object({
  sleepDifficulty: z.enum(["falling_asleep", "staying_asleep", "both", "neither"]),
  sleepDuration: z.enum(["less_than_5", "5_to_6", "6_to_7", "7_to_8", "more_than_8"]),
  sleepQuality: z.enum(["very_poor", "poor", "fair", "good", "excellent"]),
  wakeUpFeeling: z.enum(["very_tired", "tired", "neutral", "refreshed", "very_refreshed"]),
  caffeine: z.enum(["none", "morning_only", "afternoon", "evening"]),
  screenTime: z.enum(["none", "30_min", "1_hour", "2_hours", "more_than_2"]),
  stressLevel: z.enum(["very_low", "low", "moderate", "high", "very_high"]),
  sleepConditions: z.array(z.string()).optional(),
  medications: z.string().optional(),
  email: z.string().email("Inserisci un indirizzo email valido"),
  name: z.string().min(2, "Inserisci il tuo nome"),
});

type QuizFormValues = z.infer<typeof quizSchema>;

const steps = [
  "Abitudini del Sonno",
  "Fattori di Stile di Vita",
  "Storia Medica",
  "Informazioni Personali",
  "Risultati",
];

const SleepQuizPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [quizData, setQuizData] = useState<Partial<QuizFormValues>>({});
  const [showResults, setShowResults] = useState(false);
  const [, setLocation] = useLocation();
  
  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      sleepDifficulty: undefined,
      sleepDuration: undefined,
      sleepQuality: undefined,
      wakeUpFeeling: undefined,
      caffeine: undefined,
      screenTime: undefined,
      stressLevel: undefined,
      sleepConditions: [],
      medications: "",
      email: "",
      name: "",
    },
  });
  
  const progress = ((currentStep + 1) / steps.length) * 100;
  
  const nextStep = () => {
    // Validate current step fields
    if (currentStep === 0) {
      const isStepValid = form.getValues().sleepDifficulty && 
                         form.getValues().sleepDuration && 
                         form.getValues().sleepQuality && 
                         form.getValues().wakeUpFeeling;
      
      if (!isStepValid) {
        form.trigger(["sleepDifficulty", "sleepDuration", "sleepQuality", "wakeUpFeeling"]);
        return;
      }
    } else if (currentStep === 1) {
      const isStepValid = form.getValues().caffeine && 
                         form.getValues().screenTime && 
                         form.getValues().stressLevel;
      
      if (!isStepValid) {
        form.trigger(["caffeine", "screenTime", "stressLevel"]);
        return;
      }
    } else if (currentStep === 3) {
      const isStepValid = form.getValues().email && form.getValues().name;
      
      if (!isStepValid) {
        form.trigger(["email", "name"]);
        return;
      }
      
      // If at the last step and all data is valid, submit the form
      setQuizData(form.getValues());
      setShowResults(true);
      return;
    }
    
    setCurrentStep(prev => prev + 1);
  };
  
  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const onSubmit = (data: QuizFormValues) => {
    // In a real application, you would send the data to the server
    console.log(data);
    setQuizData(data);
    setShowResults(true);
  };
  
  const viewProduct = () => {
    setLocation("/products/trim-sleep-formula");
  };
  
  return (
    <>
      <Helmet>
        <title>Questionario per la Valutazione del Sonno | TrimSleep</title>
        <meta name="description" content="Fai il nostro questionario sul sonno per ricevere consigli personalizzati per migliorare la qualità del tuo sonno." />
      </Helmet>
      
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Questionario per la Valutazione del Sonno</h1>
          <p className="max-w-2xl mx-auto text-lg text-neutral-100">
            Rispondi ad alcune domande per aiutarci a capire le tue esigenze di sonno e ricevere soluzioni personalizzate.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium">Fase {currentStep + 1} di {steps.length}</span>
              <span className="text-sm font-medium">{steps[currentStep]}</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          {!showResults ? (
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {/* Step 1: Sleep Habits */}
                  {currentStep === 0 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold">Le Tue Abitudini di Sonno</h2>
                      <p className="text-neutral-600">Raccontaci la tua esperienza di sonno tipica.</p>
                      
                      <FormField
                        control={form.control}
                        name="sleepDifficulty"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Hai difficoltà ad addormentarti o a rimanere addormentato?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="falling_asleep" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Ad addormentarmi</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="staying_asleep" />
                                  </FormControl>
                                  <FormLabel className="font-normal">A rimanere addormentato</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="both" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Entrambi</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="neither" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Nessuno dei due</FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="sleepDuration"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>In media, quante ore dormi per notte?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="less_than_5" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Meno di 5 ore</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="5_to_6" />
                                  </FormControl>
                                  <FormLabel className="font-normal">5-6 ore</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="6_to_7" />
                                  </FormControl>
                                  <FormLabel className="font-normal">6-7 ore</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="7_to_8" />
                                  </FormControl>
                                  <FormLabel className="font-normal">7-8 ore</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="more_than_8" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Più di 8 ore</FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="sleepQuality"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Come valuteresti la qualità generale del tuo sonno?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="very_poor" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Molto scarsa</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="poor" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Scarsa</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="fair" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Discreta</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="good" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Buona</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="excellent" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Eccellente</FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="wakeUpFeeling"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Come ti senti generalmente quando ti svegli?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="very_tired" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Molto stanco</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="tired" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Stanco</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="neutral" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Neutrale</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="refreshed" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Riposato</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="very_refreshed" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Molto riposato</FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  
                  {/* Step 2: Lifestyle Factors */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold">Fattori di Stile di Vita</h2>
                      <p className="text-neutral-600">Le tue abitudini quotidiane possono influenzare significativamente la qualità del sonno.</p>
                      
                      <FormField
                        control={form.control}
                        name="caffeine"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Con che frequenza consumi caffeina (caffè, tè, energy drink)?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="none" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Non consumo caffeina</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="morning_only" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Solo al mattino</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="afternoon" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Fino al pomeriggio (prima delle 14:00)</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="evening" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Durante tutto il giorno (inclusa la sera)</FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="screenTime"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Quanto tempo trascorri davanti agli schermi prima di dormire (telefoni, tablet, TV)?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="none" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Nessun utilizzo di schermi prima di dormire</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="30_min" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Meno di 30 minuti</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="1_hour" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Da 30 minuti a 1 ora</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="2_hours" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Da 1 a 2 ore</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="more_than_2" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Più di 2 ore</FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="stressLevel"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>Come valuteresti il tuo livello di stress generale?</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                value={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="very_low" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Molto basso</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="low" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Basso</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="moderate" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Moderato</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="high" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Alto</FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="very_high" />
                                  </FormControl>
                                  <FormLabel className="font-normal">Molto alto</FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  
                  {/* Step 3: Medical History */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold">Storia Medica</h2>
                      <p className="text-neutral-600">Queste informazioni ci aiutano a fornire consigli più personalizzati.</p>
                      
                      <FormField
                        control={form.control}
                        name="sleepConditions"
                        render={() => (
                          <FormItem>
                            <div className="mb-4">
                              <FormLabel>Ti è stata diagnosticata una delle seguenti condizioni? (Seleziona tutte le opzioni applicabili)</FormLabel>
                              <FormDescription>
                                Queste informazioni sono utilizzate solo per fornire consigli migliori.
                              </FormDescription>
                            </div>
                            {[
                              {
                                id: "insomnia",
                                label: "Insonnia",
                              },
                              {
                                id: "sleep_apnea",
                                label: "Apnea notturna",
                              },
                              {
                                id: "restless_legs",
                                label: "Sindrome delle gambe senza riposo",
                              },
                              {
                                id: "anxiety",
                                label: "Disturbo d'ansia",
                              },
                              {
                                id: "depression",
                                label: "Depressione",
                              },
                              {
                                id: "none",
                                label: "Nessuna delle precedenti",
                              },
                            ].map((item) => (
                              <FormField
                                key={item.id}
                                control={form.control}
                                name="sleepConditions"
                                render={({ field }) => {
                                  return (
                                    <FormItem
                                      key={item.id}
                                      className="flex flex-row items-start space-x-3 space-y-0"
                                    >
                                      <FormControl>
                                        <Checkbox
                                          checked={field.value?.includes(item.id)}
                                          onCheckedChange={(checked) => {
                                            return checked
                                              ? field.onChange([...(field.value || []), item.id])
                                              : field.onChange(
                                                  field.value?.filter(
                                                    (value) => value !== item.id
                                                  )
                                                )
                                          }}
                                        />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        {item.label}
                                      </FormLabel>
                                    </FormItem>
                                  )
                                }}
                              />
                            ))}
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="medications"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Stai attualmente assumendo farmaci che potrebbero influenzare il sonno?</FormLabel>
                            <FormDescription>
                              Ad esempio: antidepressivi, farmaci per la pressione sanguigna, ecc. (Facoltativo)
                            </FormDescription>
                            <FormControl>
                              <Input placeholder="Elenca qui i farmaci (facoltativo)" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  
                  {/* Step 4: Personal Information */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <h2 className="text-2xl font-bold">Informazioni Personali</h2>
                      <p className="text-neutral-600">Useremo queste informazioni per inviarti il tuo piano del sonno personalizzato.</p>
                      
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Il Tuo Nome</FormLabel>
                            <FormControl>
                              <Input placeholder="Mario Rossi" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Indirizzo Email</FormLabel>
                            <FormDescription>
                              Invieremo il tuo piano del sonno personalizzato a questo indirizzo email.
                            </FormDescription>
                            <FormControl>
                              <Input placeholder="tuo@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                  
                  <div className="flex justify-between mt-8">
                    {currentStep > 0 && (
                      <Button type="button" variant="outline" onClick={prevStep}>
                        Precedente
                      </Button>
                    )}
                    {currentStep < steps.length - 2 ? (
                      <Button type="button" onClick={nextStep}>
                        Successivo
                      </Button>
                    ) : (
                      <Button type="button" onClick={nextStep}>
                        Invia
                      </Button>
                    )}
                  </div>
                </form>
              </Form>
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="text-center mb-8">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="h-10 w-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold mb-2">Risultati della Tua Valutazione del Sonno</h2>
                <p className="text-neutral-600">
                  In base alle tue risposte, abbiamo creato una raccomandazione personalizzata per il tuo sonno.
                </p>
              </div>
              
              <Separator className="my-6" />
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Il Tuo Profilo del Sonno</h3>
                
                <div className="bg-neutral-50 p-6 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <p className="font-medium text-neutral-600">Difficoltà di Sonno:</p>
                      <p className="font-semibold">Difficoltà ad addormentarsi</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-neutral-600">Durata del Sonno:</p>
                      <p className="font-semibold">Meno dell'ottimale (5-6 ore)</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-neutral-600">Fattori Contribuenti:</p>
                      <p className="font-semibold">Uso di schermi la sera, Stress moderato</p>
                    </div>
                    
                    <div>
                      <p className="font-medium text-neutral-600">Qualità del Sonno:</p>
                      <p className="font-semibold">Da scarsa a discreta</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold mb-4">Prodotto Consigliato</h3>
                
                <div className="flex flex-col md:flex-row gap-6 bg-primary-light/10 p-6 rounded-lg">
                  <div className="md:w-1/3">
                    <img 
                      src="https://images.unsplash.com/photo-1574482620811-1aa16ffe3c76?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                      alt="Trim Sleep Formula" 
                      className="rounded-lg w-full"
                    />
                  </div>
                  
                  <div className="md:w-2/3">
                    <h4 className="text-lg font-semibold mb-2">Trim Sleep Formula</h4>
                    <p className="mb-4">
                      Il nostro integratore per il sonno è perfetto per le tue esigenze. Contiene una miscela di ingredienti naturali come Melatonina, Radice di Valeriana e L-teanina per aiutarti ad addormentarti più velocemente e a dormire più a lungo.
                    </p>
                    <ul className="mb-6 space-y-2">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-primary mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Riduce il tempo necessario per addormentarsi</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-primary mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Migliora la qualità e la durata del sonno</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-primary mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Ingredienti naturali che non creano dipendenza</span>
                      </li>
                    </ul>
                    <Button onClick={viewProduct}>Visualizza Prodotto</Button>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-4">Consigli Aggiuntivi</h3>
                
                <div className="space-y-4">
                  <div className="p-4 border border-neutral-200 rounded-lg">
                    <h4 className="font-medium">Ridurre il Tempo davanti agli Schermi</h4>
                    <p className="text-neutral-600">Limita l'esposizione alla luce blu degli schermi almeno 1-2 ore prima di andare a dormire.</p>
                  </div>
                  
                  <div className="p-4 border border-neutral-200 rounded-lg">
                    <h4 className="font-medium">Programma di Sonno Costante</h4>
                    <p className="text-neutral-600">Vai a letto e svegliati alla stessa ora ogni giorno, anche nei fine settimana.</p>
                  </div>
                  
                  <div className="p-4 border border-neutral-200 rounded-lg">
                    <h4 className="font-medium">Tecniche di Rilassamento</h4>
                    <p className="text-neutral-600">Pratica la respirazione profonda o la meditazione per gestire lo stress prima di andare a dormire.</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 text-center">
                <p className="text-neutral-600 mb-4">
                  Abbiamo inviato una copia di questi consigli alla tua email.
                </p>
                <Button asChild>
                  <Link href="/products">Esplora Tutte le Soluzioni per il Sonno</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SleepQuizPage;
