import { ProductCard } from '@/components/ProductCard';
import { Package } from 'lucide-react';

async function getProducts(searchQuery?: string) {
  const url = searchQuery 
    ? `https://dummyjson.com/products/search?q=${searchQuery}`
    : 'https://dummyjson.com/products?limit=20';

  const res = await fetch(url, {
    next: { revalidate: 3600 } // ISR for performance demonstration
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  
  return res.json();
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const { products } = await getProducts(q);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Package className="w-8 h-8" />
            Product Catalog
          </h1>
          <p className="text-zinc-400 mt-1">Explore our collection of hand-picked items</p>
        </div>
        <div className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-full text-zinc-400 text-sm">
          {products.length} Items found
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
