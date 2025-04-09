import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import { type FAQ } from "@shared/schema";

const FAQSection = () => {
  const { data: faqs, isLoading } = useQuery<FAQ[]>({
    queryKey: ['/api/faqs'],
  });
  
  if (isLoading) {
    return (
      <section id="faq" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Domande Frequenti</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Trova risposte alle domande più comuni sui nostri prodotti e sulla salute del sonno
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="border-b border-neutral-200 py-5">
                <Skeleton className="h-7 w-3/4 mb-3" />
                <Skeleton className="h-20 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  if (!faqs || faqs.length === 0) {
    return null;
  }
  
  // Sort FAQs by order if available
  const sortedFaqs = [...faqs].sort((a, b) => (a.order || 0) - (b.order || 0));
  
  return (
    <section id="faq" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Domande Frequenti</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Trova risposte alle domande più comuni sui nostri prodotti e sulla salute del sonno
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {sortedFaqs.map((faq) => (
              <AccordionItem key={faq.id} value={`faq-${faq.id}`}>
                <AccordionTrigger className="text-lg font-semibold text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-neutral-600">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
