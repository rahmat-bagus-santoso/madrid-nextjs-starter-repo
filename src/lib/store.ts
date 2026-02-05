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
      setNotification: (message) => set({ notification: message }),
      addItem: (product) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          set({
            items: items.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            ),
            notification: `Increased ${product.title} quantity`,
          });
        } else {
          set({ 
            items: [...items, { ...product, quantity: 1 }],
            notification: `Added ${product.title} to cart`,
          });
        }

        // Auto hide notification after 3 seconds
        setTimeout(() => {
          set({ notification: null });
        }, 3000);
      },
      removeItem: (productId) => {
        const items = get().items;
        const existingItem = items.find((item) => item.id === productId);

        if (existingItem && existingItem.quantity > 1) {
          set({
            items: items.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity - 1 }
                : item
            ),
          });
        } else {
          set({ items: items.filter((item) => item.id !== productId) });
        }
      },
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((acc, item) => acc + item.quantity, 0),
      totalPrice: () =>
        get().items.reduce((acc, item) => acc + item.price * item.quantity, 0),
    }),
    {
      name: 'shopping-cart',
    }
  )
);
