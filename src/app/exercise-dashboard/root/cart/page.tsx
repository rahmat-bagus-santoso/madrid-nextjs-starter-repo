'use client';

import { useCartStore } from '@/lib/store';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, PackageOpen } from 'lucide-react';
import Link from 'next/link';

export default function CartPage() {
  const { items, addItem, removeItem, clearCart, totalPrice } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6">
        <div className="p-6 bg-zinc-900 rounded-full border border-zinc-800">
          <PackageOpen className="w-12 h-12 text-zinc-600" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Your cart is empty</h2>
          <p className="text-zinc-500 max-w-xs mx-auto">
            Looks like you haven't added anything to your cart yet.
          </p>
        </div>
        <Link 
          href="/exercise-dashboard/root/products" 
          className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-zinc-200 transition-all flex items-center gap-2"
        >
          Start Shopping <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <ShoppingCart className="w-8 h-8" />
          Your Shopping Cart
        </h1>
        <button 
          onClick={clearCart}
          className="text-zinc-500 hover:text-red-400 text-sm transition-colors flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" /> Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {items.map((item) => (
          <div 
            key={item.id} 
            className="flex items-center gap-6 p-4 bg-zinc-900/50 border border-zinc-800 rounded-2xl group transition-all hover:border-zinc-700"
          >
            <div className="w-24 h-24 bg-zinc-800 rounded-xl overflow-hidden flex-shrink-0">
              <img src={item.thumbnail} alt={item.title} className="w-full h-full object-cover" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="text-zinc-500 text-xs uppercase font-medium mb-1">{item.category}</div>
              <h3 className="text-lg font-bold text-white truncate">{item.title}</h3>
              <div className="text-xl font-bold text-white mt-1">${item.price}</div>
            </div>

            <div className="flex items-center gap-4 bg-zinc-900 border border-zinc-800 p-1 rounded-lg">
              <button 
                onClick={() => removeItem(item.id)}
                className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-bold text-white">{item.quantity}</span>
              <button 
                onClick={() => addItem(item)}
                className="p-1 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            <div className="text-right min-w-[100px]">
              <div className="text-zinc-500 text-xs mb-1">Subtotal</div>
              <div className="text-lg font-bold text-white">${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-8 bg-zinc-900 border border-zinc-800 rounded-3xl space-y-6">
        <div className="space-y-4">
          <div className="flex justify-between text-zinc-400">
            <span>Subtotal</span>
            <span className="text-white font-medium">${totalPrice().toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-zinc-400">
            <span>Shipping</span>
            <span className="text-green-400 font-medium">Free</span>
          </div>
          <div className="pt-4 border-t border-zinc-800 flex justify-between items-center">
            <span className="text-xl font-bold text-white">Total Amount</span>
            <span className="text-3xl font-black text-white">${totalPrice().toFixed(2)}</span>
          </div>
        </div>

        <button className="w-full bg-white text-black py-4 rounded-2xl font-black text-lg hover:bg-zinc-200 transition-all shadow-xl shadow-white/5 active:scale-[0.99] flex items-center justify-center gap-3">
          Checkout Now <ArrowRight className="w-5 h-5" />
        </button>
        
        <p className="text-center text-zinc-600 text-xs">
          Demo purpose only &bull; No real transactions will be processed
        </p>
      </div>
    </div>
  );
}
