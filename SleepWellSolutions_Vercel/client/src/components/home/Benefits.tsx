import { FlaskRound, PillIcon, UserRound } from "lucide-react";

const benefitsData = [
  {
    icon: <FlaskRound className="text-white text-2xl" />,
    title: "Formula Scientificamente Testata",
    description: "Ingredienti clinicamente provati per migliorare la qualità del sonno e ridurre il tempo necessario per addormentarsi.",
  },
  {
    icon: <PillIcon className="text-white text-2xl" />,
    title: "Non Crea Dipendenza",
    description: "Ingredienti naturali che non causano dipendenza o sonnolenza mattutina come i sonniferi da prescrizione.",
  },
  {
    icon: <UserRound className="text-white text-2xl" />,
    title: "Consulenza Specialistica",
    description: "Consulenza gratuita con specialisti del sonno per trovare la soluzione giusta per i tuoi specifici problemi di sonno.",
  },
];

const Benefits = () => {
  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Perché Scegliere Trim<span className="text-accent">Sleep</span></h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Le nostre soluzioni per il sonno sono progettate da esperti del sonno e clinicamente testate per affrontare le cause alla radice dei disturbi del sonno.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefitsData.map((benefit, index) => (
            <div 
              key={index} 
              className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow"
            >
              <div className="w-16 h-16 bg-primary-light rounded-full flex items-center justify-center mx-auto mb-6">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-neutral-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
