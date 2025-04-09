import { useState } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";

const emailSchema = z.string().email("Inserisci un indirizzo email valido");

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate the email
      emailSchema.parse(email);
      
      setIsSubmitting(true);
      const response = await apiRequest("POST", "/api/newsletter/subscribe", { email });
      
      toast({
        title: "Successo!",
        description: "Ti sei iscritto alla nostra newsletter.",
        variant: "default",
      });
      
      setEmail("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Email non valida",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Errore",
          description: "Si è verificato un errore durante l'iscrizione alla newsletter. Per favore riprova.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">Resta Aggiornato sulla Scienza del Sonno</h2>
          <p className="text-neutral-600 mb-8">
            Iscriviti alla nostra newsletter per le ultime ricerche sul sonno, consigli e offerte esclusive.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
            <Input
              type="email"
              placeholder="Il tuo indirizzo email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3"
              disabled={isSubmitting}
              required
            />
            <Button 
              type="submit" 
              className="px-6 py-3"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Iscrizione in corso..." : "Iscriviti"}
            </Button>
          </form>
          <p className="text-neutral-500 text-sm mt-4">
            Rispettiamo la tua privacy. Puoi annullare l'iscrizione in qualsiasi momento.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
