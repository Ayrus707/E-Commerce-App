import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { CartItem } from '@/lib/types';
import { toast } from '@/hooks/use-toast';

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getTotalPrice: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (newItem) => {
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            (item) => item.productId === newItem.productId
          );
          let newItems;
          if (existingItemIndex > -1) {
            // Update quantity if item already exists
            newItems = [...state.items];
            const existingItem = newItems[existingItemIndex];
            newItems[existingItemIndex] = {
              ...existingItem,
              quantity: existingItem.quantity + newItem.quantity,
            };
            toast({ title: "Item quantity updated in cart" });
          } else {
            // Add new item
            newItems = [...state.items, newItem];
             toast({ title: "Item added to cart" });
          }
          return { items: newItems };
        });
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }));
         toast({ title: "Item removed from cart", variant: "destructive" });
      },
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          // If quantity is 0 or less, remove the item
          get().removeItem(productId);
        } else {
          set((state) => ({
            items: state.items.map((item) =>
              item.productId === productId ? { ...item, quantity } : item
            ),
          }));
          toast({ title: "Cart updated" });
        }
      },
      clearCart: () => {
        set({ items: [] });
        toast({ title: "Cart cleared" });
      },
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      },
      getTotalPrice: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'shopwave-cart-storage', // Unique name for local storage key
      storage: createJSONStorage(() => localStorage), // Use local storage
    }
  )
);
