"use client";

import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { ShoppingCart, User, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/use-cart';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";
import { Separator } from '@/components/ui/separator';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get('query') || '';
  const [searchQuery, setSearchQuery] = useState(currentQuery);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getItemCount } = useCart();
  const [cartCount, setCartCount] = useState(0);
  const { user, loading } = useAuth();


   // Zustand state isn't immediately available on server render,
   // so we sync it client-side.
   useEffect(() => {
     setCartCount(getItemCount());
   }, [getItemCount]);

   // Update search input if URL query changes
   useEffect(() => {
     setSearchQuery(currentQuery);
   }, [currentQuery]);

  // Debounce search query updates
  const debounce = (func: (value: string) => void, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (value: string) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(value), delay);
    };
  };

  const debouncedSetSearchQuery = debounce((value: string) => {
    setSearchQuery(value);
  }, 300);

  useEffect(() => {
  }, [pathname]);


  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery.trim()) {
      params.set('query', searchQuery);
    } else {
      params.delete('query');
    }
    // Reset category when performing a new search for simplicity
    params.delete('category');
    router.push(`/?${params.toString()}`);
    setIsMobileMenuOpen(false); // Close mobile menu on search
  };

  const NavLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
    <>
      <Button variant="ghost" asChild className={isMobile ? "w-full justify-start" : ""}>
        <Link href="/" onClick={() => isMobile && setIsMobileMenuOpen(false)}>Home</Link>
      </Button>
      {/* Add more navigation links here if needed, e.g., Categories, About */}
       <Button variant="ghost" asChild className={isMobile ? "w-full justify-start" : ""}>
        <Link href="/#products" onClick={() => isMobile && setIsMobileMenuOpen(false)}>Products</Link>
      </Button>
      {isMobile && <Separator />}
      <form onSubmit={handleSearchSubmit} className={`flex items-center gap-2 ${isMobile ? "w-full flex-col items-stretch" : ""}`}>
        <Input
          type="search"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => debouncedSetSearchQuery(e.target.value)}
          className="flex-grow bg-secondary border-none focus:ring-primary"
          aria-label="Search products"
        />
        <Button type="submit" variant="outline" size={isMobile ? "default" : "icon"} className={isMobile ? "w-full" : ""}>
          <Search className="h-4 w-4" />
           {isMobile && <span className="ml-2">Search</span>}
          <span className="sr-only">Search</span>
        </Button>
      </form>
        {isMobile && <Separator />}
       <div className={`flex items-center gap-2 ${isMobile ? "w-full flex-col items-stretch" : ""}`}>
        <Button variant="ghost" size="icon" asChild className={isMobile ? "w-full justify-start" : "relative"}>
          <Link href="/cart" onClick={() => isMobile && setIsMobileMenuOpen(false)}>
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <Badge variant="destructive" className={`absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center text-xs ${isMobile ? "static ml-auto" : ""}`}>
                {cartCount}
              </Badge>
            )}
            <span className={isMobile ? "ml-2" : "sr-only"}>Cart</span>
          </Link>
        </Button>
        {!loading && (
  <Button variant="ghost" size="icon" asChild className={isMobile ? "w-full justify-start" : ""}>
    <Link href={user ? "/profile" : "/profile"} onClick={() => isMobile && setIsMobileMenuOpen(false)}>
      <User className="h-5 w-5" />
      {isMobile && (
        <span className="ml-2 text-sm font-medium">
          {user ? user.email : "Login"}
        </span>
      )}
      {!isMobile && (
        <span className="sr-only">
          {user ? "Profile" : "Login"}
        </span>
      )}
    </Link>
  </Button>
)}
        {/* <Button variant="ghost" size="icon" asChild className={isMobile ? "w-full justify-start" : ""}>
          <Link href="/profile" onClick={() => isMobile && setIsMobileMenuOpen(false)}>
            <User className="h-5 w-5" />
             <span className={isMobile ? "ml-2" : "sr-only"}>Profile / Login</span>
             {isMobile && <span className="ml-auto text-sm font-normal">Profile / Login</span>}
          </Link>
        </Button> */}
      </div>
    </>
  );


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-2xl font-bold text-primary">
          E-Commerce Shop
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-4">
           <NavLinks />
        </nav>

        {/* Mobile Navigation */}
         <div className="md:hidden">
           <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-xs sm:max-w-sm p-6">
              <div className="flex justify-between items-center mb-6">
                 <Link href="/" className="text-xl font-bold text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                  ShopWave
                </Link>
                <SheetClose asChild>
                  <Button variant="ghost" size="icon">
                    <X className="h-6 w-6" />
                    <span className="sr-only">Close Menu</span>
                  </Button>
                </SheetClose>
              </div>
              <nav className="flex flex-col gap-4">
                <NavLinks isMobile={true} />
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
