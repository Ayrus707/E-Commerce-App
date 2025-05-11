"use client";

import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input'; // Assuming username input for now
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Star } from 'lucide-react';
import { submitReview } from '@/lib/data'; // Mock function
import { toast } from '@/hooks/use-toast';
import type { Review } from '@/lib/types';

const reviewSchema = z.object({
  userName: z.string().min(2, { message: "Username must be at least 2 characters." }), // Assuming username for now
  rating: z.coerce.number().min(1, { message: "Please select a rating." }).max(5),
  comment: z.string().min(10, { message: "Comment must be at least 10 characters." }).max(500),
});

type ReviewFormData = z.infer<typeof reviewSchema>;

interface ReviewFormProps {
  productId: string;
  onReviewSubmit: (newReview: Review) => void; // Callback to update UI
}

export default function ReviewForm({ productId, onReviewSubmit }: ReviewFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      userName: "", // Pre-fill if user is logged in
      rating: 0,
      comment: "",
    },
  });

   const onSubmit: SubmitHandler<ReviewFormData> = async (data) => {
    setIsSubmitting(true);
    try {
       // In a real app, userId would come from authentication context
      const newReviewData = {
        productId,
        userId: `u_${data.userName.toLowerCase()}`, // Simple mock userId
        userName: data.userName,
        rating: data.rating,
        comment: data.comment,
      };
      const submittedReview = await submitReview(newReviewData); // Use mock function
      onReviewSubmit(submittedReview); // Update parent component state
      toast({ title: "Review submitted successfully!" });
      form.reset(); // Reset form after successful submission
      setSelectedRating(0); // Reset visual rating
    } catch (error) {
      console.error("Failed to submit review:", error);
      toast({ title: "Failed to submit review", description: "Please try again later.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
         <FormField
          control={form.control}
          name="userName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Your Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="rating"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rating</FormLabel>
               <FormControl>
                {/* Wrap RadioGroup and Star Rating in a container */}
                <div>
                  {/* Hidden RadioGroup for react-hook-form */}
                  <RadioGroup
                    onValueChange={(value) => {
                      field.onChange(parseInt(value));
                      setSelectedRating(parseInt(value));
                    }}
                    value={String(field.value)}
                    className="hidden" // Hide the actual radio buttons
                  >
                    {[1, 2, 3, 4, 5].map((value) => (
                      <FormItem key={`radio-item-${value}`}>
                        <FormControl>
                          <RadioGroupItem value={String(value)} id={`rating-${value}`} />
                        </FormControl>
                        <FormLabel htmlFor={`rating-${value}`} className="sr-only">
                          {value} Star
                        </FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>

                  {/* Visual Star Rating */}
                  <div className="flex items-center space-x-1" onMouseLeave={() => setHoverRating(0)}>
                    {[1, 2, 3, 4, 5].map((starValue) => (
                      <Label key={starValue} htmlFor={`rating-${starValue}`} className="cursor-pointer">
                        <Star
                          onMouseEnter={() => setHoverRating(starValue)}
                          onClick={() => {
                            // Also update on click for accessibility/mobile
                            field.onChange(starValue);
                            setSelectedRating(starValue);
                          }}
                          className={`w-6 h-6 transition-colors ${hoverRating >= starValue || selectedRating >= starValue ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted-foreground"}`}
                        />
                      </Label>
                    ))}
                  </div>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Review Comment</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Share your thoughts on the product..."
                  className="resize-none"
                  rows={4}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto bg-accent hover:bg-accent/90">
          {isSubmitting ? 'Submitting...' : 'Submit Review'}
        </Button>
      </form>
    </Form>
  );
}
