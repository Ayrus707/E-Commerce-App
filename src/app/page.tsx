"use client"; // Needed for hooks like useSearchParams, useState, useEffect

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductList from '@/components/product/product-list';
import CategoryFilter from '@/components/product/category-filter';
import { fetchProducts, mockProducts } from '@/lib/data'; // Using mock fetch
import type { Product } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton'; // For loading state

// Helper component to extract unique categories
function getUniqueCategories(products: Product[]): string[] {
  const categories = products.map(p => p.category);
  return Array.from(new Set(categories)).sort();
}

function ProductDisplay() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || undefined;
  const category = searchParams.get('category') || undefined;

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    // Fetch initial categories from mock data (or fetch from API if needed)
    setCategories(getUniqueCategories(mockProducts));
  }, []);


  useEffect(() => {
    const loadProducts = async () => {
      setIsLoading(true);
      try {
        const fetchedProducts = await fetchProducts({ query, category });
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        // Handle error state here, e.g., show a toast message
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [query, category]); // Re-fetch when query or category changes


   // Loading Skeleton
  const ProductSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <div key={index} className="space-y-3">
          <Skeleton className="h-[200px] w-full rounded-xl" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
             <Skeleton className="h-4 w-[80px]" />
          </div>
           <Skeleton className="h-10 w-full" />
        </div>
      ))}
    </div>
  );

  return (
    <div className="space-y-8">
      <section id="hero" className="text-center py-12 bg-secondary rounded-lg shadow">
        <h1 className="text-4xl font-bold tracking-tight mb-4 text-primary">Welcome to E-Commerce Shop</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover the best products curated just for you. Start exploring now!
        </p>
        {/* Optional: Add a call-to-action button */}
        {/* <Button size="lg" className="mt-6 bg-accent hover:bg-accent/90">Shop Now</Button> */}
      </section>

       <section id="products" className="space-y-6 pt-8">
         <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-3xl font-semibold tracking-tight">Products</h2>
            <CategoryFilter categories={categories} />
         </div>

        {isLoading ? (
          <ProductSkeleton />
        ) : (
          <ProductList products={products} />
        )}
      </section>
    </div>
  );
}


export default function Home() {
   // Wrap ProductDisplay in Suspense to handle useSearchParams
  return (
     <Suspense fallback={<PageSkeleton />}>
      <ProductDisplay />
     </Suspense>
  );
}

// Skeleton for the entire page while Suspense is resolving
const PageSkeleton = () => (
   <div className="space-y-8">
       <section className="text-center py-12 bg-secondary rounded-lg shadow">
          <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
          <Skeleton className="h-6 w-1/2 mx-auto" />
       </section>

       <section className="space-y-6 pt-8">
         <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-10 w-full md:w-[180px]" />
         </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="h-[200px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[200px]" />
                <Skeleton className="h-4 w-[150px]" />
                 <Skeleton className="h-4 w-[80px]" />
              </div>
               <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      </section>
    </div>
);
