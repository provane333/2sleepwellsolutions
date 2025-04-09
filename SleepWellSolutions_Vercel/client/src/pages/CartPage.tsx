import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Helmet } from "react-helmet";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatPrice } from "@/lib/utils";
import { useCart } from "@/context/CartContext";
import { type Product } from "@shared/schema";

const CartPage = () => {
  const { cart, removeFromCart, updateCartItemQuantity, cartTotal } = useCart();
  const [, setLocation] = useLocation();
  
  const isEmpty = !cart || cart.items.length === 0;
  
  // Redirect to checkout
  const handleCheckout = () => {
    setLocation("/checkout");
  };
  
  return (
    <>
      <Helmet>
        <title>Carrello | TrimSleep</title>
        <meta name="description" content="Rivedi e gestisci i prodotti nel tuo carrello prima di procedere all'acquisto." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8">Il Tuo Carrello</h1>
        
        {isEmpty ? (
          <div className="text-center py-16 max-w-lg mx-auto">
            <div className="bg-neutral-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="h-10 w-10 text-neutral-500" />
            </div>
            <h2 className="text-2xl font-semibold mb-4">Il tuo carrello è vuoto</h2>
            <p className="text-neutral-600 mb-8">
              Sembra che non hai ancora aggiunto nessuna soluzione per il sonno al tuo carrello.
            </p>
            <Button asChild size="lg">
              <Link href="/products">Sfoglia i Prodotti</Link>
            </Button>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Cart Items */}
            <div className="lg:w-2/3">
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-neutral-50 font-medium">
                  <div className="col-span-7">Prodotto</div>
                  <div className="col-span-2 text-center">Quantità</div>
                  <div className="col-span-2 text-right">Prezzo</div>
                  <div className="col-span-1"></div>
                </div>
                
                <div className="divide-y divide-neutral-200">
                  {cart?.items.map((item) => (
                    <div key={item.productId} className="p-4 md:grid md:grid-cols-12 md:gap-4 md:items-center">
                      {/* Product Info */}
                      <div className="md:col-span-7 flex items-center mb-4 md:mb-0">
                        <div className="w-20 h-20 rounded-md overflow-hidden mr-4 flex-shrink-0">
                          <img 
                            src={item.product.imageUrl} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">
                            <Link href={`/products/${item.product.slug}`} className="hover:text-primary">
                              {item.product.name}
                            </Link>
                          </h3>
                          <div className="text-sm text-neutral-500">
                            {item.product.quantity} capsule
                          </div>
                        </div>
                      </div>
                      
                      {/* Quantity */}
                      <div className="md:col-span-2 flex items-center justify-between md:justify-center mb-4 md:mb-0">
                        <span className="md:hidden">Quantità:</span>
                        <div className="flex items-center border border-neutral-300 rounded-md">
                          <Button 
                            onClick={() => updateCartItemQuantity(item.productId, item.quantity - 1)}
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-none"
                            disabled={item.quantity <= 1}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center text-sm">{item.quantity}</span>
                          <Button 
                            onClick={() => updateCartItemQuantity(item.productId, item.quantity + 1)}
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-none"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="md:col-span-2 md:text-right mb-4 md:mb-0 flex justify-between items-center md:block">
                        <span className="md:hidden">Prezzo:</span>
                        <span className="font-medium">
                          {formatPrice(
                            (item.product.salePrice || item.product.price) * item.quantity
                          )}
                        </span>
                      </div>
                      
                      {/* Remove Button */}
                      <div className="md:col-span-1 text-right">
                        <Button
                          onClick={() => removeFromCart(item.productId)}
                          variant="ghost"
                          size="icon"
                          className="text-neutral-500 hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:w-1/3">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4">Riepilogo dell'Ordine</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotale</span>
                    <span>{formatPrice(cartTotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Spedizione</span>
                    <span>{cartTotal >= 5000 ? 'Gratuita' : formatPrice(499)}</span>
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between font-semibold">
                    <span>Totale</span>
                    <span>{formatPrice(cartTotal >= 5000 ? cartTotal : cartTotal + 499)}</span>
                  </div>
                </div>
                
                <Button onClick={handleCheckout} className="w-full" size="lg">
                  Procedi al Pagamento
                </Button>
                
                <div className="mt-6">
                  <Link href="/products" className="text-primary hover:underline flex items-center justify-center">
                    <ShoppingBag className="mr-2 h-4 w-4" />
                    Continua gli Acquisti
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default CartPage;
