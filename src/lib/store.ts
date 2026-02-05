import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image?: string;
  thumbnail: string;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
  notification: string | null;
  setNotification: (message: string | null) => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      notification: null,
      
      setNotification: (message) => {
        // TODO: Exercise 8 - Implement setNotification logic (set the message)
      },

      addItem: (product) => {
        // TODO: Exercise 2 - Implement addItem logic
        // 1. Check if item already exists in items array
        // 2. If exists, increment quantity
        // 3. If new, add to array with quantity 1
        // TODO: Exercise 8 - Add notification message here later
      },

      removeItem: (productId) => {
        // TODO: Exercise 5 - Implement removeItem logic
        // 1. Find the item
        // 2. Decrement quantity or remove from array if quantity is 1
      },

      clearCart: () => {
        // TODO: Exercise 2 - Implement clearCart logic (reset items to empty array)
      },

      totalItems: () => {
        // TODO: Exercise 4 - Calculate total quantity of items in cart
        return 0;
      },

      totalPrice: () => {
        // TODO: Exercise 4 - Calculate total price (price * quantity) of all items
        return 0;
      },
    }),
    {
      name: 'shopping-cart',
    }
  )
);
