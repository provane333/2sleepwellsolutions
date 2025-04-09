import { Link } from "wouter";
import { 
  FacebookIcon, 
  InstagramIcon, 
  TwitterIcon, 
  Linkedin 
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-neutral-800 text-neutral-300 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Trim<span className="text-accent">Sleep</span></h3>
            <p className="mb-4">Ti aiutiamo a ottenere un sonno migliore con soluzioni basate sulla scienza.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-neutral-300 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Products */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Prodotti</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products/trim-sleep-formula" className="hover:text-white transition-colors">
                  Formula Sonno Trim
                </Link>
              </li>
              <li>
                <Link href="/products/trim-deep-sleep" className="hover:text-white transition-colors">
                  Trim Sonno Profondo
                </Link>
              </li>
              <li>
                <Link href="/products/sleep-relax-bundle" className="hover:text-white transition-colors">
                  Pacchetto Sonno + Relax
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-white transition-colors">
                  Tutti i Prodotti
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Risorse</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/learn" className="hover:text-white transition-colors">
                  Blog sul Sonno
                </Link>
              </li>
              <li>
                <Link href="/quiz" className="hover:text-white transition-colors">
                  Quiz del Sonno
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">
                  Domande Frequenti
                </Link>
              </li>
              <li>
                <Link href="/learn" className="hover:text-white transition-colors">
                  Scienza del Sonno
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-white text-lg font-semibold mb-4">Supporto</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Contattaci
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Politica di Spedizione
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Resi e Rimborsi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">
                  Informativa sulla Privacy
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="border-t border-neutral-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="mb-4 md:mb-0">© {new Date().getFullYear()} TrimSleep. Tutti i diritti riservati.</p>
          <div className="flex space-x-6">
            <a href="#" className="text-sm hover:text-white transition-colors">
              Termini di Servizio
            </a>
            <a href="#" className="text-sm hover:text-white transition-colors">
              Informativa sulla Privacy
            </a>
            <a href="#" className="text-sm hover:text-white transition-colors">
              Policy sui Cookie
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
