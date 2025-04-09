import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { ArrowRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import StarRating from "@/components/ui/StarRating";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { type Product } from "@shared/schema";

const ProductCatalog = () => {
  const [category, setCategory] = useState<string>("all");
  const { addToCart } = useCart();
  
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });
  
  const filteredProducts = products && category !== 'all'
    ? products.filter(product => product.category === category)
    : products;
  
  const handleAddToCart = (productId: number) => {
    addToCart(productId, 1);
  };
  
  return (
    <section id="products" className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold mb-2">Soluzioni per il Sonno</h2>
            <p className="text-neutral-600">Scopri prodotti personalizzati per le tue esigenze di sonno</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tutti i Prodotti" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti i Prodotti</SelectItem>
                <SelectItem value="supplements">Integratori</SelectItem>
                <SelectItem value="bundles">Bundle</SelectItem>
                <SelectItem value="accessories">Accessori</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="border border-neutral-200 rounded-lg overflow-hidden">
                <Skeleton className="w-full h-64" />
                <div className="p-6">
                  <Skeleton className="h-7 w-3/4 mb-2" />
                  <Skeleton className="h-5 w-full mb-4" />
                  <Skeleton className="h-4 w-32 mb-4" />
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-10 w-10 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts?.map((product) => (
              <div key={product.id} className="border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative">
                  <Link href={`/products/${product.slug}`}>
                    <img 
                      src={product.imageUrl} 
                      alt={product.name} 
                      className="w-full h-64 object-cover"
                    />
                  </Link>
                  {product.bestSeller && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                        Più Venduto
                      </span>
                    </div>
                  )}
                  {product.salePrice && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Risparmia {Math.round((1 - product.salePrice / product.price) * 100)}%
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <Link href={`/products/${product.slug}`}>
                    <h3 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-neutral-600 mb-4">{product.shortDescription}</p>
                  <div className="mb-4">
                    <StarRating rating={4.7} reviews={342} />
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-lg font-bold">
                        {product.salePrice 
                          ? formatPrice(product.salePrice) 
                          : formatPrice(product.price)
                        }
                      </span>
                      <span className="text-neutral-500 text-sm ml-2">{product.quantity} capsule</span>
                    </div>
                    <Button 
                      onClick={() => handleAddToCart(product.id)}
                      variant="default" 
                      size="icon" 
                      className="rounded-full w-10 h-10"
                    >
                      <Plus className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="mt-12 text-center">
          <Link href="/products" className="inline-flex items-center text-primary hover:text-primary-dark font-medium transition-colors">
            Visualizza Tutti i Prodotti
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductCatalog;
