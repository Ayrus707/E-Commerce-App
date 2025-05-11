"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from '@/components/ui/label';

interface CategoryFilterProps {
  categories: string[];
}

export default function CategoryFilter({ categories }: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category && category !== 'all') {
      params.set('category', category);
    } else {
      params.delete('category');
    }
    // Keep existing query parameter
    const query = searchParams.get('query');
    if (query) {
      params.set('query', query);
    } else {
      params.delete('query'); // Ensure query is removed if not present
    }

    router.push(`/?${params.toString()}`, { scroll: false }); // Navigate without scrolling to top
  };

  return (
    <div className="w-full md:w-auto">
       <Label htmlFor="category-select" className="sr-only">Filter by Category</Label>
       <Select value={currentCategory} onValueChange={handleCategoryChange}>
        <SelectTrigger id="category-select" className="w-full md:w-[180px]" aria-label="Filter by Category">
          <SelectValue placeholder="Filter by Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category.toLowerCase()}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
