import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

export default function OrderConfirmationPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
       <Card className="w-full max-w-md shadow-lg">
         <CardHeader className="items-center">
            <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
            <CardTitle className="text-2xl font-bold">Order Confirmed!</CardTitle>
            <CardDescription>Thank you for your purchase.</CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
           <p className="text-muted-foreground">
             Your order has been placed successfully. You will receive an email confirmation shortly.
           </p>
           {/* Optional: Add order summary or tracking info here */}
           <Button asChild className="w-full bg-accent hover:bg-accent/90">
             <Link href="/">Continue Shopping</Link>
           </Button>
           {/* Optional: Link to user's order history */}
           {/* <Button variant="outline" asChild className="w-full">
             <Link href="/profile/orders">View Orders</Link>
           </Button> */}
         </CardContent>
       </Card>
    </div>
  );
}
