'use client';

import { Suspense, useState, useEffect } from 'react';
import { ShoppingCart, Search, User as UserIcon, Bell } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { useDebounce } from '@/hooks/useDebounce';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export function Navbar({ user }: { user: any }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const totalItems = useCartStore((state) => state.totalItems());
  const notification = useCartStore((state) => state.notification);
  
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const debouncedSearch = useDebounce(searchTerm, 500);

  useEffect(() => {
    // TODO: Exercise 6 - Implement debounced search logic
    // 1. Compare debouncedSearch with current query param 'q'
    // 2. If different, update URL using router.replace
  }, [debouncedSearch, pathname, router, searchParams]);

  return (
    <>
      <div className="fixed top-20 right-8 z-50 pointer-events-none">
        <AnimatePresence>
          {notification && (
            <motion.div
              initial={{ opacity: 0, x: 20, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 20, scale: 0.9 }}
              className="bg-white text-black px-6 py-3 rounded-xl shadow-2xl font-bold flex items-center gap-3 border border-zinc-200 pointer-events-auto"
            >
              <div className="bg-green-500 p-1 rounded-full">
                <ShoppingCart className="w-4 h-4 text-white" />
              </div>
              {/* TODO: Exercise 8 - Display notification message here */}
              Placeholder Notification
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <header className="h-16 border-b border-zinc-800 bg-[#0a0a0a]/80 backdrop-blur-md sticky top-0 z-40 flex items-center justify-between px-8">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-white transition-colors" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-900/50 border border-zinc-800 rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-zinc-700 focus:bg-zinc-900 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <Link 
          href="/exercise-dashboard/root/cart"
          className="relative p-2 text-zinc-400 hover:text-white transition-colors group"
        >
          <ShoppingCart className="w-5 h-5 transition-transform group-hover:scale-110" />
          <AnimatePresence>
            {totalItems > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] bg-white text-black text-[10px] font-black rounded-full flex items-center justify-center px-1 border-2 border-[#0a0a0a]"
              >
                {/* TODO: Exercise 4 - Show actual cart count */}
                {totalItems}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>

        <button className="relative p-2 text-zinc-400 hover:text-white transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0a0a0a]"></span>
        </button>

        <div className="flex items-center gap-3 pl-6 border-l border-zinc-800">
          <div className="text-right">
            <div className="text-sm font-bold text-white leading-none">{user?.name || 'User'}</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1 font-medium">{user?.role || 'Guest'}</div>
          </div>
          <div className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 overflow-hidden">
            <UserIcon className="w-5 h-5" />
          </div>
        </div>
      </div>
    </header>
    </>
  );
}

export function NavbarWrapper({ user }: { user: any }) {
  return (
    <Suspense fallback={<div className="h-16 border-b border-zinc-800 bg-[#0a0a0a]"></div>}>
      <Navbar user={user} />
    </Suspense>
  );
}
