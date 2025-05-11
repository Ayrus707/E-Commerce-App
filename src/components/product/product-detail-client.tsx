"use client"; // This remains a client component

import { useState } from 'react';
import Image from 'next/image';
import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';
import type { Product, Review } from '@/lib/types';
import ReviewList from '@/components/reviews/review-list';
import ReviewForm from '@/components/reviews/review-form';

interface ProductDetailClientProps {
  product: Product; // Receive product data as a prop
}

export default function ProductDetailClient({ product: initialProduct }: ProductDetailClientProps) {
  // Use state to manage product details, especially for dynamic updates like reviews
  const [product, setProduct] = useState<Product>(initialProduct);
  const { addItem } = useCart();

  const handleAddToCart = () => {
    if (product) {
      addItem({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1, // Default quantity to 1
        imageUrl: product.imageUrl,
      });
    }
  };

  const handleReviewSubmit = (newReview: Review) => {
     // Update the product state locally to reflect the new review
     setProduct((prevProduct) => {
       const updatedReviews = [...prevProduct.reviews, newReview];
       const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
       const newAverageRating = totalRating / updatedReviews.length;

       return {
         ...prevProduct,
         reviews: updatedReviews,
         averageRating: newAverageRating,
       };
    });
  };

  // The product data is guaranteed to exist here because the server component
  // would have called notFound() otherwise.

  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(product.price);

  const averageRating = product.averageRating?.toFixed(1) ?? 'N/A';
  const reviewCount = product.reviews.length;

  return (
    <div className="space-y-12">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Product Image */}
        <div className="aspect-square rounded-lg overflow-hidden border shadow-sm">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={600}
            className="object-cover w-full h-full"
            data-ai-hint={`${product.category} ${product.name}`}
            priority // Prioritize loading the main product image
          />
        </div>

        {/* Product Details */}
        <div className="space-y-4">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">{product.name}</h1>

          <div className="flex items-center gap-4 flex-wrap">
            {product.averageRating && product.averageRating > 0 ? (
              <div className="flex items-center text-sm text-muted-foreground">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400 mr-1" />
                <span>{averageRating} ({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})</span>
              </div>
            ) : (
              <span className="text-sm text-muted-foreground">No reviews yet</span>
            )}
              <span className="text-sm text-muted-foreground hidden sm:inline">|</span>
              <span className="text-sm text-muted-foreground">Category: {product.category}</span>
          </div>

          <p className="text-2xl lg:text-3xl font-semibold text-foreground">{formattedPrice}</p>

          <Separator />

          {/* Use prose for better text styling */}
          <div className="prose prose-sm max-w-none text-muted-foreground dark:prose-invert">
            <p>{product.description}</p>
            {/* Add more details if available, e.g., specifications */}
          </div>

           <p className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600 dark:text-green-400' : 'text-destructive'}`}>
              {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
           </p>

          <Button
            size="lg"
            className="w-full sm:w-auto bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={handleAddToCart}
            disabled={product.stock <= 0}
            aria-label={product.stock > 0 ? `Add ${product.name} to cart` : `${product.name} is out of stock`}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </div>
      </div>

      {/* Reviews Section */}
      <Separator />
      <div className="space-y-8">
         <h2 className="text-2xl font-semibold tracking-tight">Customer Reviews</h2>
         <div className="grid md:grid-cols-2 gap-8 items-start">
            <div className="space-y-4">
                <h3 className="text-xl font-medium">Write a Review</h3>
                <ReviewForm productId={product.id} onReviewSubmit={handleReviewSubmit} />
            </div>
            <div className="space-y-4">
                <h3 className="text-xl font-medium">Existing Reviews ({reviewCount})</h3>
                <ReviewList reviews={product.reviews} />
            </div>
         </div>
      </div>
    </div>
  );
}
