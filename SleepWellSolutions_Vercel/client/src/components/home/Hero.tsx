import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="gradient-bg text-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Sonno Migliore, Domani Migliore</h1>
            <p className="text-lg mb-8 text-neutral-100">
              Integratori clinicamente testati per aiutarti ad addormentarti più velocemente, a dormire più a lungo e a svegliarti rigenerato.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button asChild className="bg-white text-primary hover:bg-neutral-100 px-8 py-3 rounded-full">
                <Link href="/products">Acquista Soluzioni per il Sonno</Link>
              </Button>
              <Button asChild className="bg-accent hover:bg-accent-light text-white px-8 py-3 rounded-full">
                <Link href="/quiz">Fai il Quiz del Sonno</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80" 
              alt="Donna che dorme tranquillamente" 
              className="rounded-lg shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
