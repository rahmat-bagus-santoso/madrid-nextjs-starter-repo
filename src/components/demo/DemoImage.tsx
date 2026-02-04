import Image from 'next/image';

// TODO Task 5: Implement Next.js Image Optimization
// Replace the standard <img> tags with Next.js <Image /> component.
// Hint: Use 'fill', 'sizes', and 'priority' for optimized performance.

export function DemoImage() {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Next.js Image Optimization</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* START TODO: Replace <img> with <Image /> */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
          <img
            src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
            alt="Demo Image 1"
            className="w-full h-full object-cover"
          />
          {/* HINT: Implement <Image fill sizes="..." priority /> here */}
        </div>
        
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085"
            alt="Demo Image 2"
            className="w-full h-full object-cover"
          />
          {/* HINT: Implement <Image fill sizes="..." loading="lazy" /> here */}
        </div>
        {/* END TODO */}
      </div>
      <p className="text-sm text-gray-500">
        Note: The standard img tag is not optimized. Try upgrading to next/image!
      </p>
    </div>
  );
}
