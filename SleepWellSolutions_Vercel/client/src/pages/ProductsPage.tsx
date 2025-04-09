import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { Plus } from "lucide-react";
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

const ProductsPage = () => {
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
    <>
      <Helmet>
        <title>Sleep Supplements & Products | TrimSleep</title>
        <meta name="description" content="Browse our collection of scientifically formulated sleep supplements designed to help you achieve better, more restful sleep." />
      </Helmet>
      
      <div className="bg-neutral-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Sleep Supplements & Products</h1>
            <p className="text-lg text-neutral-600">
              Our scientifically formulated products are designed to help you achieve better, more restful sleep.
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
            <div className="text-lg font-medium">
              {filteredProducts?.length || 0} Products
            </div>
            <div className="mt-4 md:mt-0">
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Products" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  <SelectItem value="supplements">Supplements</SelectItem>
                  <SelectItem value="bundles">Bundles</SelectItem>
                  <SelectItem value="accessories">Accessories</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="border border-neutral-200 rounded-lg overflow-hidden bg-white">
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
                <div key={product.id} className="border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow bg-white">
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
                          Best Seller
                        </span>
                      </div>
                    )}
                    {product.salePrice && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          Save {Math.round((1 - product.salePrice / product.price) * 100)}%
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <Link href={`/products/${product.slug}`}>
                      <h2 className="text-xl font-semibold mb-2 hover:text-primary transition-colors">
                        {product.name}
                      </h2>
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
                        <span className="text-neutral-500 text-sm ml-2">{product.quantity} capsules</span>
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
          
          {filteredProducts?.length === 0 && !isLoading && (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium mb-2">No products found</h3>
              <p className="text-neutral-600">
                Try selecting a different category or check back later for new products.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
