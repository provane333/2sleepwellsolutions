import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import { 
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { MenuIcon, ShoppingCartIcon, UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const [location] = useLocation();
  const { cart } = useCart();
  const cartItemCount = cart?.items?.length || 0;

  // Calculate if the link is active
  const isActive = (path: string) => {
    const currentPath = location === '/' ? '/' : location.split('/')[1];
    const linkPath = path === '/' ? '/' : path.split('/')[1];
    return currentPath === linkPath;
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-primary text-2xl font-bold">Trim<span className="text-accent">Sleep</span></span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`${isActive('/') ? 'text-primary font-medium' : 'text-neutral-600'} hover:text-primary transition-colors`}>
              Home
            </Link>
            <Link href="/products" className={`${isActive('/products') ? 'text-primary font-medium' : 'text-neutral-600'} hover:text-primary transition-colors`}>
              Prodotti
            </Link>
            <Link href="/learn" className={`${isActive('/learn') ? 'text-primary font-medium' : 'text-neutral-600'} hover:text-primary transition-colors`}>
              Informazioni
            </Link>
            <Link href="/quiz" className={`${isActive('/quiz') ? 'text-primary font-medium' : 'text-neutral-600'} hover:text-primary transition-colors`}>
              Quiz del Sonno
            </Link>
          </div>
          
          {/* Cart and Login */}
          <div className="flex items-center space-x-4">
            <Link href="/cart" className="p-2 text-neutral-600 hover:text-primary transition-colors relative">
              <ShoppingCartIcon className="h-5 w-5" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
              <span className="ml-1 hidden sm:inline">Carrello</span>
            </Link>
            
            <Button variant="ghost" className="hidden md:flex items-center gap-1">
              <UserIcon className="h-5 w-5" />
              <span>Accedi</span>
            </Button>
            
            {/* Mobile Menu Button */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <MenuIcon className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle className="text-primary text-2xl font-bold">Trim<span className="text-accent">Sleep</span></SheetTitle>
                </SheetHeader>
                <div className="py-6 flex flex-col space-y-4">
                  <SheetClose asChild>
                    <Link href="/" className="block px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded">
                      Home
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/products" className="block px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded">
                      Prodotti
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/learn" className="block px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded">
                      Informazioni
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/quiz" className="block px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded">
                      Quiz del Sonno
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Link href="/cart" className="block px-4 py-2 text-neutral-600 hover:bg-neutral-100 rounded">
                      Carrello
                    </Link>
                  </SheetClose>
                  <SheetClose asChild>
                    <Button className="block w-full mt-4" variant="default">
                      Accedi
                    </Button>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
