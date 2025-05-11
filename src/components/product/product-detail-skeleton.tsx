import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

// Skeleton Loader for Product Detail Page
export default function ProductDetailSkeleton() {
  return (
    <div className="space-y-12 animate-pulse">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Image Skeleton */}
        <Skeleton className="aspect-square rounded-lg w-full bg-muted" />

        {/* Details Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-10 w-3/4 bg-muted" /> {/* Title */}
          <div className="flex items-center gap-4">
            <Skeleton className="h-5 w-24 bg-muted" /> {/* Rating */}
            <Skeleton className="h-5 w-20 bg-muted" /> {/* Category */}
          </div>
          <Skeleton className="h-8 w-1/4 bg-muted" /> {/* Price */}
          <Separator className="bg-muted/50" />
          <Skeleton className="h-4 w-full bg-muted" /> {/* Description line 1 */}
          <Skeleton className="h-4 w-5/6 bg-muted" /> {/* Description line 2 */}
          <Skeleton className="h-4 w-1/5 bg-muted" /> {/* Stock */}
          <Skeleton className="h-12 w-full sm:w-40 bg-muted" /> {/* Add to cart button */}
        </div>
      </div>
      <Separator className="bg-muted/50" />
      <div className="space-y-8">
        <Skeleton className="h-8 w-1/3 bg-muted" /> {/* Reviews Title */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/4 bg-muted" /> {/* Write Review Title */}
            <Skeleton className="h-10 w-full bg-muted" /> {/* Name Input */}
            <Skeleton className="h-8 w-1/2 bg-muted" /> {/* Rating Stars */}
            <Skeleton className="h-24 w-full bg-muted" /> {/* Comment Textarea */}
            <Skeleton className="h-10 w-32 bg-muted" /> {/* Submit Button */}
          </div>
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/4 bg-muted" /> {/* Existing Reviews Title */}
            <Skeleton className="h-20 w-full bg-muted" /> {/* Review 1 */}
            <Skeleton className="h-20 w-full bg-muted" /> {/* Review 2 */}
          </div>
        </div>
      </div>
    </div>
  );
}
