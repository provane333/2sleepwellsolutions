import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import StarRating from "@/components/ui/StarRating";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { type Product } from "@shared/schema";

const FeaturedProduct = () => {
  const { addToCart } = useCart();
  
  const { data: featuredProducts, isLoading, error } = useQuery<Product[]>({
    queryKey: ['/api/products/featured'],
  });
  
  // Just take the first featured product
  const product = featuredProducts?.[0];
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, 1);
    }
  };
  
  if (isLoading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-neutral-50 rounded-2xl p-8 md:p-12 shadow-lg">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-2/5 mb-8 md:mb-0">
                <Skeleton className="h-96 w-full" />
              </div>
              <div className="md:w-3/5 md:pl-12">
                <Skeleton className="h-8 w-40 mb-4" />
                <Skeleton className="h-10 w-60 mb-4" />
                <Skeleton className="h-6 w-32 mb-4" />
                <Skeleton className="h-20 w-full mb-6" />
                <div className="space-y-2 mb-8">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-6 w-full" />
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row items-center">
                  <Skeleton className="h-10 w-32 mb-4 sm:mb-0 sm:mr-6" />
                  <Skeleton className="h-12 w-40" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  if (error || !product) {
    return null;
  }
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-neutral-50 rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/5 mb-8 md:mb-0">
              <img 
                src={product.imageUrl} 
                alt={product.name} 
                className="rounded-lg shadow max-w-full mx-auto"
              />
            </div>
            <div className="md:w-3/5 md:pl-12">
              <span className="text-primary font-semibold">PRODOTTO IN EVIDENZA</span>
              <h2 className="text-3xl font-bold mt-2 mb-4">{product.name}</h2>
              <div className="mb-4">
                <StarRating rating={4.7} reviews={342} />
              </div>
              <p className="text-lg mb-6">{product.shortDescription}</p>
              <ul className="mb-8 space-y-2">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-primary mt-1 mr-3 h-5 w-5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row items-center">
                <div className="mb-4 sm:mb-0 sm:mr-6">
                  {product.salePrice ? (
                    <>
                      <span className="text-neutral-500 line-through">{formatPrice(product.price)}</span>
                      <span className="text-2xl font-bold ml-2">{formatPrice(product.salePrice)}</span>
                      <span className="text-green-600 ml-2">
                        Risparmia {Math.round((1 - product.salePrice / product.price) * 100)}%
                      </span>
                    </>
                  ) : (
                    <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
                  )}
                </div>
                <Button 
                  onClick={handleAddToCart}
                  className="bg-primary hover:bg-primary-light text-white px-8 py-3 rounded-full font-medium w-full sm:w-auto"
                >
                  Aggiungi al Carrello
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProduct;
