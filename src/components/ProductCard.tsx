'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ShoppingCart, Plus, Check } from 'lucide-react';
import { useCartStore, type Product } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);
  
  // TODO: Exercise 12 - Add local feedback state here (like 'isAdded') and trigger it in handleAdd
  const isAdded = false;

  const handleAdd = () => {
    // Logic moved to AddToCartButton or keep as wiring exercise
    addItem(product);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      className="bg-zinc-900/50 border border-zinc-800 rounded-lg overflow-hidden flex flex-col group transition-all hover:border-zinc-700"
    >
      <Link href={`/exercise-dashboard/root/products/${product.id}`} className="relative aspect-square overflow-hidden bg-zinc-800">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
      </Link>
      
      <div className="p-4 flex flex-col flex-1">
        <Link 
          href={`/exercise-dashboard/root/products/${product.id}`}
          className="text-lg font-semibold text-zinc-100 mb-1 hover:text-white transition-colors line-clamp-1"
        >
          {product.title}
        </Link>
        <p className="text-zinc-400 text-sm mb-4 line-clamp-2 flex-1">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-white">${product.price}</span>
          <button
            onClick={handleAdd}
            className={cn(
              "p-2 rounded-md transition-all flex items-center gap-2 font-medium text-sm",
              isAdded 
                ? "bg-green-500 text-white" 
                : "bg-white text-black hover:bg-zinc-200"
            )}
          >
            <AnimatePresence mode="wait">
              {isAdded ? (
                <motion.div
                  key="check"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Check className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div
                  key="plus"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(' ');
}
