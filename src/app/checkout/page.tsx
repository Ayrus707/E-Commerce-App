"use client";

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useCart } from '@/hooks/use-cart';
import { useRouter } from 'next/navigation';
import { processPayment, type PaymentDetails } from '@/services/payment-gateway'; // Import mock payment service
import { toast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import type { Address } from '@/lib/types';

// Schema for Address Form
const addressSchema = z.object({
  street: z.string().min(3, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, "Invalid zip code format"),
  country: z.string().min(2, "Country is required"),
});

// Schema for Payment Form (Basic Example)
// In a real app, use a library like Stripe Elements for secure handling
const paymentSchema = z.object({
  cardNumber: z.string().regex(/^\d{16}$/, "Invalid card number (must be 16 digits)"),
  expiryDate: z.string().regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Invalid expiry date (MM/YY)"),
  cvc: z.string().regex(/^\d{3,4}$/, "Invalid CVC"),
  cardHolderName: z.string().min(2, "Cardholder name is required"),
});

// Combined Schema (optional, can handle forms separately)
const checkoutSchema = addressSchema.merge(paymentSchema);
type CheckoutFormData = z.infer<typeof checkoutSchema>;

export default function CheckoutPage() {
  const { items: cartItems, getTotalPrice, clearCart, getItemCount } = useCart();
  const [isClient, setIsClient] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
      cardNumber: '',
      expiryDate: '',
      cvc: '',
      cardHolderName: '',
    },
  });

  const totalPrice = isClient ? getTotalPrice() : 0;
  const itemCount = isClient ? getItemCount() : 0;

  if (isClient && itemCount === 0 && !isProcessing) {
    // Redirect to home if cart is empty and not already processing payment
    router.replace('/');
    return null; // Prevent rendering anything further
  }

  const onSubmit = async (data: CheckoutFormData) => {
    setIsProcessing(true);
    console.log("Checkout Data:", data);

    const paymentDetails: PaymentDetails = {
      amountCents: Math.round(totalPrice * 100), // Convert to cents
      currency: 'INR',
      description: `E-Commerce Shop Order - ${itemCount} items`,
      // In a real scenario, you would securely pass tokenized payment info, not raw card data
    };

    try {
      const paymentResult = await processPayment(paymentDetails); // Call mock payment service

      if (paymentResult.status === 'success') {
        toast({
          title: "Payment Successful!",
          description: `Transaction ID: ${paymentResult.transactionId}`,
        });
        clearCart(); // Clear the cart after successful payment
        router.push('/order-confirmation'); // Redirect to a confirmation page
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      console.error("Payment failed:", error);
      toast({
        title: "Payment Failed",
        description: "Please check your payment details or try again later.",
        variant: "destructive",
      });
      setIsProcessing(false);
    }
    // No finally block needed here as we navigate away on success
  };

  const formattedTotalPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(totalPrice);

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Checkout</h1>

       <Form {...form}>
         <form onSubmit={form.handleSubmit(onSubmit)} className="grid lg:grid-cols-3 gap-8 items-start">
           {/* Shipping & Payment Forms */}
           <div className="lg:col-span-2 space-y-8">
              {/* Shipping Address */}
              <Card>
                 <CardHeader>
                   <CardTitle>Shipping Address</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-4">
                    <FormField control={form.control} name="street" render={({ field }) => (
                       <FormItem>
                         <FormLabel>Street Address</FormLabel>
                         <FormControl><Input {...field} /></FormControl>
                         <FormMessage />
                       </FormItem>
                    )} />
                   <div className="grid sm:grid-cols-3 gap-4">
                       <FormField control={form.control} name="city" render={({ field }) => (
                           <FormItem>
                             <FormLabel>City</FormLabel>
                             <FormControl><Input {...field} /></FormControl>
                             <FormMessage />
                           </FormItem>
                        )} />
                       <FormField control={form.control} name="state" render={({ field }) => (
                           <FormItem>
                             <FormLabel>State / Province</FormLabel>
                             <FormControl><Input {...field} /></FormControl>
                             <FormMessage />
                           </FormItem>
                        )} />
                       <FormField control={form.control} name="zipCode" render={({ field }) => (
                           <FormItem>
                             <FormLabel>Zip / Postal Code</FormLabel>
                             <FormControl><Input {...field} /></FormControl>
                             <FormMessage />
                           </FormItem>
                        )} />
                   </div>
                    <FormField control={form.control} name="country" render={({ field }) => (
                       <FormItem>
                         <FormLabel>Country</FormLabel>
                         <FormControl><Input {...field} /></FormControl>
                         <FormMessage />
                       </FormItem>
                    )} />
                 </CardContent>
               </Card>

               {/* Payment Details - Use a secure payment element in production */}
               <Card>
                 <CardHeader>
                   <CardTitle>Payment Details</CardTitle>
                    <CardDescription>Please enter your payment information. (Demo Only)</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-4">
                   <FormField control={form.control} name="cardHolderName" render={({ field }) => (
                       <FormItem>
                         <FormLabel>Cardholder Name</FormLabel>
                         <FormControl><Input {...field} /></FormControl>
                         <FormMessage />
                       </FormItem>
                    )} />
                    <FormField control={form.control} name="cardNumber" render={({ field }) => (
                       <FormItem>
                         <FormLabel>Card Number</FormLabel>
                         <FormControl><Input placeholder="•••• •••• •••• ••••" {...field} /></FormControl>
                         <FormMessage />
                       </FormItem>
                    )} />
                   <div className="grid grid-cols-2 gap-4">
                      <FormField control={form.control} name="expiryDate" render={({ field }) => (
                           <FormItem>
                             <FormLabel>Expiry Date (MM/YY)</FormLabel>
                             <FormControl><Input placeholder="MM/YY" {...field} /></FormControl>
                             <FormMessage />
                           </FormItem>
                        )} />
                        <FormField control={form.control} name="cvc" render={({ field }) => (
                           <FormItem>
                             <FormLabel>CVC</FormLabel>
                             <FormControl><Input placeholder="•••" {...field} /></FormControl>
                             <FormMessage />
                           </FormItem>
                        )} />
                   </div>
                 </CardContent>
               </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1 sticky top-20">
               <Card className="shadow-md">
                 <CardHeader>
                   <CardTitle>Order Summary</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-3">
                    {isClient && cartItems.map(item => (
                        <div key={item.productId} className="flex justify-between items-center text-sm">
                           <span>{item.name} x {item.quantity}</span>
                           <span className="text-muted-foreground">{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.price * item.quantity)}</span>
                        </div>
                     ))}
                    <Separator />
                   <div className="flex justify-between">
                     <span className="text-muted-foreground">Subtotal</span>
                     <span>{formattedTotalPrice}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-muted-foreground">Shipping</span>
                     <span>FREE</span>
                   </div>
                   <Separator />
                   <div className="flex justify-between font-semibold text-lg">
                     <span>Total</span>
                     <span>{formattedTotalPrice}</span>
                   </div>
                 </CardContent>
                 <CardFooter>
                   <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent/90" disabled={isProcessing || !isClient || itemCount === 0}>
                     {isProcessing ? 'Processing Payment...' : `Pay ${formattedTotalPrice}`}
                   </Button>
                 </CardFooter>
               </Card>
            </div>
         </form>
       </Form>
    </div>
  );
}
