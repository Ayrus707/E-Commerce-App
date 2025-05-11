import type { Product } from '@/lib/types';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/hooks/use-cart';
import { Badge } from "@/components/ui/badge";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Prevent link navigation when clicking button
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      imageUrl: product.imageUrl,
    });
  };

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(product.price);

  return (
    <Card className="w-full overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col">
       <Link href={`/product/${product.id}`} className="block group">
        <CardHeader className="p-0 relative">
           <Image
             src={product.imageUrl}
             alt={product.name}
             width={400}
             height={300}
             className="object-cover w-full aspect-[4/3] group-hover:opacity-90 transition-opacity"
             data-ai-hint={`${product.category} ${product.name}`}
           />
           <Badge variant="secondary" className="absolute top-2 right-2">{product.category}</Badge>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <CardTitle className="text-lg mb-1 group-hover:text-primary transition-colors">{product.name}</CardTitle>
          <CardDescription className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</CardDescription>
           {product.averageRating && product.averageRating > 0 && (
            <div className="flex items-center text-sm text-muted-foreground mb-2">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span>{product.averageRating.toFixed(1)} ({product.reviews.length} reviews)</span>
            </div>
          )}
          <p className="text-lg font-semibold text-foreground">{formattedPrice}</p>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0 mt-auto">
        <Button onClick={handleAddToCart} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
}
