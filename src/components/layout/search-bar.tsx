// components/layout/search-bar.tsx
"use client";

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

const debounce = (func: (value: string) => void, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (value: string) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(value), delay);
  };
};

export default function SearchBar() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentQuery = searchParams.get('query') || '';
  const [searchQuery, setSearchQuery] = useState(currentQuery);
  const debouncedSetSearchQuery = debounce((value: string) => {
    setSearchQuery(value);
  }, 300);

  useEffect(() => {
    setSearchQuery(currentQuery);
  }, [currentQuery]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery.trim()) {
      params.set('query', searchQuery);
    } else {
      params.delete('query');
    }
    params.delete('category'); // Reset category on new search
    router.push(`/?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearchSubmit} className="flex items-center gap-2">
      <Input
        type="search"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => debouncedSetSearchQuery(e.target.value)}
        className="flex-grow bg-secondary border-none focus:ring-primary"
        aria-label="Search products"
      />
      <Button type="submit" variant="outline" size="icon">
        <Search className="h-4 w-4" />
        <span className="sr-only">Search</span>
      </Button>
    </form>
  );
}