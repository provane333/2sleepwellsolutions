import { createContext, useContext, useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { getSessionId } from "@/lib/utils";
import { type Product } from "@shared/schema";

interface CartItem {
  productId: number;
  quantity: number;
  product: Product;
}

interface Cart {
  id: number;
  sessionId: string;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

interface CartContextType {
  cart: Cart | null;
  isLoading: boolean;
  cartTotal: number;
  cartItemCount: number;
  addToCart: (productId: number, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateCartItemQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

// Create a default value for the context to avoid "undefined" errors
const defaultCartContext: CartContextType = {
  cart: null,
  isLoading: true,
  cartTotal: 0,
  cartItemCount: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateCartItemQuantity: () => {},
  clearCart: () => {}
};

const CartContext = createContext<CartContextType>(defaultCartContext);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  // Get the session ID for the cart
  const sessionId = getSessionId();
  
  // Fetch the cart from the API
  const { data: cartData, isLoading, refetch } = useQuery<Cart>({
    queryKey: [`/api/carts/${sessionId}`],
    enabled: !!sessionId,
  });
  
  // Fetch products to populate cart items
  const { data: products } = useQuery<Product[]>({
    queryKey: ['/api/products'],
  });
  
  // Update the cart state when the cart data changes
  useEffect(() => {
    if (cartData && products) {
      // Check if cart already has items
      if (cartData.items && cartData.items.length > 0) {
        // Add product details to each item in the cart
        const itemsWithProducts = cartData.items.map(item => {
          const product = products.find(p => p.id === item.productId);
          return {
            ...item,
            product: product!
          };
        }).filter(item => item.product); // Filter out items with no matching product
        
        setCart({
          ...cartData,
          items: itemsWithProducts
        });
      } else {
        setCart(cartData);
      }
      
      setIsInitialized(true);
    }
  }, [cartData, products]);
  
  // Calculate the total price of all items in the cart
  const cartTotal = cart?.items?.reduce(
    (total, item) => {
      const price = item.product.salePrice || item.product.price;
      return total + (price * item.quantity);
    }, 
    0
  ) || 0;
  
  // Calculate the total number of items in the cart
  const cartItemCount = cart?.items?.reduce(
    (count, item) => count + item.quantity, 
    0
  ) || 0;
  
  // Add an item to the cart
  const addToCart = async (productId: number, quantity: number) => {
    if (!products) return;
    
    const product = products.find(p => p.id === productId);
    if (!product) {
      toast({
        title: "Error",
        description: "Product not found.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      if (!cart || cart.id === 0) {
        // Create a new cart
        const response = await apiRequest("POST", "/api/carts", {
          sessionId,
          items: [{ productId, quantity }]
        });
        
        await refetch();
        
      } else {
        // Update existing cart
        const existingItem = cart.items.find(item => item.productId === productId);
        
        if (existingItem) {
          // Update quantity if item already exists
          const updatedItems = cart.items.map(item => 
            item.productId === productId 
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
          
          await apiRequest("PUT", `/api/carts/${cart.id}`, {
            items: updatedItems.map(({ product, ...item }) => item)
          });
          
        } else {
          // Add new item
          const updatedItems = [
            ...cart.items,
            { productId, quantity }
          ];
          
          await apiRequest("PUT", `/api/carts/${cart.id}`, {
            items: updatedItems.map(({ product, ...item }) => item)
          });
        }
        
        await refetch();
      }
      
      toast({
        title: "Added to cart",
        description: `${product.name} added to your cart.`,
      });
      
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Remove an item from the cart
  const removeFromCart = async (productId: number) => {
    if (!cart || cart.id === 0) return;
    
    try {
      const updatedItems = cart.items.filter(item => item.productId !== productId);
      
      await apiRequest("PUT", `/api/carts/${cart.id}`, {
        items: updatedItems.map(({ product, ...item }) => item)
      });
      
      await refetch();
      
      toast({
        title: "Removed from cart",
        description: "Item removed from your cart.",
      });
      
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Update the quantity of an item in the cart
  const updateCartItemQuantity = async (productId: number, quantity: number) => {
    if (!cart || cart.id === 0) return;
    
    // Don't allow quantities less than 1
    if (quantity < 1) {
      quantity = 1;
    }
    
    try {
      const updatedItems = cart.items.map(item => 
        item.productId === productId 
          ? { ...item, quantity }
          : item
      );
      
      await apiRequest("PUT", `/api/carts/${cart.id}`, {
        items: updatedItems.map(({ product, ...item }) => item)
      });
      
      await refetch();
      
    } catch (error) {
      console.error("Error updating cart:", error);
      toast({
        title: "Error",
        description: "Failed to update cart. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  // Clear the cart
  const clearCart = async () => {
    if (!cart || cart.id === 0) return;
    
    try {
      await apiRequest("DELETE", `/api/carts/${cart.id}`);
      
      // Create a new empty cart
      const response = await apiRequest("POST", "/api/carts", {
        sessionId,
        items: []
      });
      
      await refetch();
      
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast({
        title: "Error",
        description: "Failed to clear cart. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading: isLoading || !isInitialized,
        cartTotal,
        cartItemCount,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
