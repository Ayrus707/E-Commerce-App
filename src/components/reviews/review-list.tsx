import type { Review } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns'; // For relative time formatting

interface ReviewListProps {
  reviews: Review[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-4 h-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'fill-muted text-muted-foreground'}`}
        />
      ))}
    </div>
  );
}

export default function ReviewList({ reviews }: ReviewListProps) {
  if (!reviews || reviews.length === 0) {
    return <p className="text-muted-foreground">No reviews yet. Be the first to review!</p>;
  }

  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <Card key={review.id} className="bg-secondary">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
             <div className="flex items-center gap-3">
               <Avatar className="h-8 w-8">
                  {/* Add AvatarImage if user images are available */}
                  {/* <AvatarImage src="/path/to/user/image.jpg" alt={review.userName} /> */}
                  <AvatarFallback>{review.userName.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <CardTitle className="text-base font-medium">{review.userName}</CardTitle>
             </div>
            <StarRating rating={review.rating} />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground mb-2">{review.comment}</p>
            <p className="text-xs text-muted-foreground">
              {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
