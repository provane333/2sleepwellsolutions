import { useState } from "react";
import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { ArrowLeft, ChevronDown, ChevronUp, Check, Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Skeleton } from "@/components/ui/skeleton";
import StarRating from "@/components/ui/StarRating";
import { formatPrice, createMarkup } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { type Product } from "@shared/schema";

const ProductDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  const { data: product, isLoading, error } = useQuery<Product>({
    queryKey: [`/api/products/${slug}`],
  });
  
  const handleIncreaseQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product.id, quantity);
    }
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Skeleton className="h-6 w-32" />
        </div>
        <div className="flex flex-col md:flex-row gap-12">
          <div className="md:w-1/2">
            <Skeleton className="w-full h-[500px] rounded-lg" />
          </div>
          <div className="md:w-1/2">
            <Skeleton className="h-10 w-3/4 mb-4" />
            <Skeleton className="h-6 w-32 mb-6" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-full mb-2" />
            <Skeleton className="h-6 w-3/4 mb-6" />
            <Skeleton className="h-8 w-32 mb-6" />
            <div className="space-y-2 mb-8">
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} className="h-6 w-full" />
              ))}
            </div>
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Button asChild>
          <Link href="/products">Back to Products</Link>
        </Button>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{product.name} | TrimSleep</title>
        <meta name="description" content={product.shortDescription} />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Button variant="ghost" asChild className="pl-0">
            <Link href="/products">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Products
            </Link>
          </Button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-12">
          {/* Product Image */}
          <div className="md:w-1/2">
            <img 
              src={product.imageUrl} 
              alt={product.name} 
              className="w-full rounded-lg"
            />
          </div>
          
          {/* Product Information */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <div className="mb-6">
              <StarRating rating={4.7} reviews={342} />
            </div>
            
            <p className="text-lg mb-6">{product.shortDescription}</p>
            
            <div className="mb-6">
              {product.salePrice ? (
                <div className="flex items-center">
                  <span className="text-neutral-500 line-through mr-2">{formatPrice(product.price)}</span>
                  <span className="text-2xl font-bold">{formatPrice(product.salePrice)}</span>
                  <span className="ml-2 bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                    Save {Math.round((1 - product.salePrice / product.price) * 100)}%
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
              )}
              <span className="text-neutral-500 text-sm mt-1 block">{product.quantity} capsules per container</span>
            </div>
            
            <div className="mb-8">
              <h3 className="font-medium mb-3">Key Benefits:</h3>
              <ul className="space-y-2">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-primary mt-1 mr-3 h-5 w-5 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="flex items-center mb-6">
              <div className="flex items-center border border-neutral-300 rounded-md mr-4">
                <Button 
                  onClick={handleDecreaseQuantity}
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 rounded-none"
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-10 text-center">{quantity}</span>
                <Button 
                  onClick={handleIncreaseQuantity}
                  variant="ghost" 
                  size="icon" 
                  className="h-10 w-10 rounded-none"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              
              <Button 
                onClick={handleAddToCart}
                className="flex-1"
                size="lg"
              >
                Add to Cart
              </Button>
            </div>
            
            <div className="text-sm text-neutral-500">
              <p>Free shipping on orders over $50</p>
              <p>30-day satisfaction guarantee</p>
            </div>
          </div>
        </div>
        
        <Separator className="my-12" />
        
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="description">
              <AccordionTrigger className="text-xl font-semibold">
                Product Description
              </AccordionTrigger>
              <AccordionContent className="text-neutral-700">
                <p className="mb-4">{product.description}</p>
                <p>Our supplements are manufactured in FDA-registered facilities following strict Good Manufacturing Practice (GMP) guidelines.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="ingredients">
              <AccordionTrigger className="text-xl font-semibold">
                Ingredients
              </AccordionTrigger>
              <AccordionContent className="text-neutral-700">
                <p>{product.ingredients}</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="instructions">
              <AccordionTrigger className="text-xl font-semibold">
                How to Use
              </AccordionTrigger>
              <AccordionContent className="text-neutral-700">
                <p>Take 1-2 capsules approximately 30-60 minutes before bedtime with a glass of water. For best results, use consistently every night as part of your bedtime routine.</p>
                <p className="mt-2">Consult with a healthcare professional before starting any new supplement regimen, especially if you are pregnant, nursing, have a medical condition, or are taking medications.</p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="shipping">
              <AccordionTrigger className="text-xl font-semibold">
                Shipping & Returns
              </AccordionTrigger>
              <AccordionContent className="text-neutral-700">
                <p><strong>Shipping:</strong> We offer free standard shipping on all orders over $50. Orders typically ship within 1-2 business days and arrive within 3-5 business days.</p>
                <p className="mt-2"><strong>Returns:</strong> We stand behind our products with a 30-day satisfaction guarantee. If you're not completely satisfied, contact our customer service team for a full refund.</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </>
  );
};

export default ProductDetailPage;
