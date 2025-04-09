import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import StarRating from "@/components/ui/StarRating";
import { type Testimonial } from "@shared/schema";

const Testimonials = () => {
  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials/featured'],
  });
  
  if (isLoading) {
    return (
      <section id="reviews" className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Cosa Dicono i Nostri Clienti</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Storie reali di persone che hanno trasformato il loro sonno con i nostri prodotti.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-8 rounded-lg shadow-md">
                <Skeleton className="h-5 w-24 mb-4" />
                <Skeleton className="h-24 w-full mb-6" />
                <div className="flex items-center">
                  <Skeleton className="h-12 w-12 rounded-full mr-4" />
                  <div>
                    <Skeleton className="h-5 w-24 mb-1" />
                    <Skeleton className="h-4 w-32" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  if (!testimonials || testimonials.length === 0) {
    return null;
  }
  
  return (
    <section id="reviews" className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Cosa Dicono i Nostri Clienti</h2>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Storie reali di persone che hanno trasformato il loro sonno con i nostri prodotti.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-md">
              <div className="mb-4">
                <StarRating rating={testimonial.rating} showCount={false} />
              </div>
              <p className="text-neutral-700 mb-6">"{testimonial.review}"</p>
              <div className="flex items-center">
                {testimonial.imageUrl && (
                  <img 
                    src={testimonial.imageUrl} 
                    alt={testimonial.customerName}
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                )}
                <div>
                  <h4 className="font-semibold">{testimonial.customerName}</h4>
                  {testimonial.verified && (
                    <p className="text-neutral-500 text-sm">Cliente Verificato</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
