import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const steps = [
  {
    number: 1,
    title: "Fai il Quiz del Sonno",
    description: "Rispondi ad alcune domande sulle tue abitudini e sfide del sonno per aiutarci a capire le tue esigenze.",
  },
  {
    number: 2,
    title: "Ottieni Soluzioni Personalizzate",
    description: "Ricevi raccomandazioni per integratori e pratiche di igiene del sonno adatte alla tua situazione.",
  },
  {
    number: 3,
    title: "Goditi un Sonno Migliore",
    description: "Sperimenta una migliore qualità del sonno con le nostre soluzioni scientificamente formulate e supporto continuo.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Come Funziona Trim<span className="text-accent">Sleep</span></h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Rendiamo facile trovare la soluzione giusta per le tue specifiche esigenze di sonno
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center">
              <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6 relative">
                <span className="text-white font-bold text-xl">{step.number}</span>
                {index < steps.length - 1 && (
                  <div className="absolute w-full h-1 bg-primary right-0 top-1/2 -z-10 hidden md:block"></div>
                )}
              </div>
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-neutral-600">{step.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <Button asChild className="bg-primary hover:bg-primary-light text-white px-8 py-3 rounded-full">
            <Link href="/quiz">Inizia la Tua Valutazione del Sonno</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
