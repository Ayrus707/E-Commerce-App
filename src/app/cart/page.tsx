"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Trash2, Minus, Plus } from 'lucide-react';
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import type { CartItem } from '@/lib/types';

export default function CartPage() {
  // Use useState and useEffect to safely access client-side cart state
  const { items: cartItems, removeItem, updateQuantity, getTotalPrice, clearCart, getItemCount } = useCart();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
const { user } = useAuth();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    const quantity = Math.max(0, newQuantity); // Ensure quantity doesn't go below 0
    updateQuantity(productId, quantity);
  };

  const totalPrice = isClient ? getTotalPrice() : 0;
  const itemCount = isClient ? getItemCount() : 0;

  const formattedTotalPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(totalPrice);

   if (!isClient) {
    // Render a loading state or null while waiting for client-side hydration
     return (
       <div className="space-y-6">
         <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>
         <p>Loading cart...</p>
       </div>
     );
   }

  if (itemCount === 0) {
    return (
      <div className="text-center space-y-4 py-16">
        <h1 className="text-3xl font-bold tracking-tight">Your Cart is Empty</h1>
        <p className="text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
        <Button asChild>
          <Link href="/">Start Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8 items-start">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <Card key={item.productId} className="flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4 shadow-sm">
              <Link href={`/product/${item.productId}`} className="shrink-0">
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  width={100}
                  height={100}
                  className="rounded-md object-cover w-24 h-24 border"
                />
              </Link>
              <div className="flex-grow space-y-1">
                 <Link href={`/product/${item.productId}`} className="hover:underline">
                    <h3 className="font-medium">{item.name}</h3>
                  </Link>
                <p className="text-sm text-muted-foreground">
                  {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.price)}
                </p>
                 {/* Quantity Controls */}
                 <div className="flex items-center gap-2 pt-1">
                   <Button
                     variant="outline"
                     size="icon"
                     className="h-8 w-8"
                     onClick={() => handleQuantityChange(item.productId, item.quantity - 1)}
                     aria-label={`Decrease quantity of ${item.name}`}
                   >
                     <Minus className="h-4 w-4" />
                   </Button>
                   <Input
                      type="number"
                      min="0"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(item.productId, parseInt(e.target.value) || 0)}
                      className="h-8 w-14 text-center px-1"
                      aria-label={`Quantity of ${item.name}`}
                   />
                    <Button
                     variant="outline"
                     size="icon"
                     className="h-8 w-8"
                     onClick={() => handleQuantityChange(item.productId, item.quantity + 1)}
                     aria-label={`Increase quantity of ${item.name}`}
                   >
                     <Plus className="h-4 w-4" />
                   </Button>
                 </div>
              </div>
              <div className="flex flex-col items-end sm:ml-auto mt-2 sm:mt-0">
                 <p className="font-medium mb-2 sm:mb-4">
                    {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(item.price * item.quantity)}
                 </p>
                 <Button
                   variant="ghost"
                   size="icon"
                   className="text-muted-foreground hover:text-destructive h-8 w-8"
                   onClick={() => removeItem(item.productId)}
                   aria-label={`Remove ${item.name} from cart`}
                 >
                   <Trash2 className="h-4 w-4" />
                 </Button>
              </div>
            </Card>
          ))}
           <Button variant="outline" onClick={clearCart} className="mt-4 text-destructive hover:bg-destructive/10 border-destructive">
                Clear Cart
           </Button>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1 sticky top-20"> {/* Sticky summary */}
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal ({itemCount} {itemCount === 1 ? 'item' : 'items'})</span>
                <span>{formattedTotalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>FREE</span> {/* Or calculate shipping */}
              </div>
              {/* Add discount code input if needed */}
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{formattedTotalPrice}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button
  size="lg"
  className="w-full bg-accent hover:bg-accent/90"
  onClick={() => {
    if (user) {
      router.push("/checkout");
    } else {
      router.push("/profile");
    }
  }}
>
  Proceed to Checkout
</Button>


              {/* <Button size="lg" className="w-full bg-accent hover:bg-accent/90" asChild>
                  <Link href="/checkout">Proceed to Checkout</Link>
              </Button> */}
              <Button variant="outline" className="w-full" asChild>
                  <Link href="/">Continue Shopping</Link>
               </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
