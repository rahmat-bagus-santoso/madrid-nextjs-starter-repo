'use client';

import useSWR from 'swr';
import { ProductCard } from '@/components/ProductCard';
import { Zap, Loader2, AlertCircle } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductsCSRPage() {
  // TODO: Exercise 9 - Implement client-side fetching with useSWR
  // 1. Define fetcher (already done above)
  // 2. Call useSWR with the URL: 'https://dummyjson.com/products?limit=12'
  // 3. Extract { data, error, isLoading }
  const data: any = null;
  const error: any = null;
  const isLoading = true;

  if (error) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-zinc-500 gap-4">
      <AlertCircle className="w-12 h-12 text-red-500" />
      <p>Failed to load products. please check your connection.</p>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Zap className="w-8 h-8 text-yellow-500" />
            Trending Products (CSR)
          </h1>
          <p className="text-zinc-400 mt-1">Fetched on the client using useSWR</p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center min-h-[300px] text-zinc-500 gap-4">
          <Loader2 className="w-10 h-10 animate-spin text-zinc-700" />
          <p>Loading the latest trends...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data?.products?.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
