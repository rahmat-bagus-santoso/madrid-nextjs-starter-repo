import { ArrowLeft, ShoppingCart, Star, ShieldCheck, Truck } from 'lucide-react';
import Link from 'next/link';
import { AddToCartButton } from '@/components/AddToCartButton';

async function getProduct(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  
  if (!res.ok) {
    return null;
  }
  
  return res.json();
}

export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-2xl font-bold text-white mb-2">Product Not Found</h2>
        <Link href="/exercise-dashboard/root/products" className="text-zinc-400 hover:text-white flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <Link 
        href="/exercise-dashboard/root/products" 
        className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Catalog
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Gallery */}
        <div className="space-y-4">
          <div className="aspect-square bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
            <img 
              src={product.thumbnail} 
              alt={product.title} 
              className="w-full h-full object-contain p-8"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images?.slice(0, 4).map((img: string, i: number) => (
              <div key={i} className="aspect-square bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
                <img src={img} alt="" className="w-full h-full object-cover p-2" />
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-zinc-500 text-sm font-medium uppercase tracking-wider">
              {product.category} &bull; {product.brand}
            </div>
            <h1 className="text-4xl font-bold text-white">{product.title}</h1>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-bold">{product.rating}</span>
              </div>
              <div className="text-zinc-500 text-sm">
                ({product.stock} in stock)
              </div>
            </div>
          </div>

          <p className="text-zinc-400 text-lg leading-relaxed">
            {product.description}
          </p>

          <div className="py-6 border-y border-zinc-800 space-y-4">
            <div className="text-3xl font-bold text-white">${product.price}</div>
            <AddToCartButton product={product} />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="flex items-center gap-3 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl">
              <Truck className="w-5 h-5 text-zinc-500" />
              <div className="text-sm">
                <div className="text-white font-medium">Free Shipping</div>
                <div className="text-zinc-500">On orders over $100</div>
              </div>
            </div>
            <div className="flex items-center gap-3 p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl">
              <ShieldCheck className="w-5 h-5 text-zinc-500" />
              <div className="text-sm">
                <div className="text-white font-medium">1 Year Warranty</div>
                <div className="text-zinc-500">Official brand support</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
