'use client';

import { useCartStore, type Product } from '@/lib/store';
import { ShoppingCart } from 'lucide-react';

export function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <button
      onClick={() => {
        // TODO: Exercise 3 - Wire this button to call your store's addItem action
      }}
      className="w-full bg-white text-black py-4 rounded-xl hover:bg-zinc-200 transition-all font-bold flex items-center justify-center gap-3 shadow-lg shadow-white/5 active:scale-[0.98]"
    >
      <ShoppingCart className="w-5 h-5" />
      Add to Cart
    </button>
  );
}
