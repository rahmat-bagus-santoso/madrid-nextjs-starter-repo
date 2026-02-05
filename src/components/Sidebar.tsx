'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, ShoppingCart, Package, Box, LogOut } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { exerciseLogoutAction } from '@/app/exercise-dashboard/login/actions';
import { useRouter } from 'next/navigation';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { label: 'Products', href: '/exercise-dashboard/root/products', icon: Package },
    { label: 'Trending (CSR)', href: '/exercise-dashboard/root/products-csr', icon: Box },
    { label: 'Cart', href: '/exercise-dashboard/root/cart', icon: ShoppingCart },
  ];

  const handleLogout = async () => {
    await exerciseLogoutAction();
  };

  return (
    <aside className="w-64 bg-[#0a0a0a] border-r border-zinc-800 flex flex-col h-screen fixed">
      <div className="p-6">
        <div className="flex items-center gap-2 font-bold text-xl text-white">
          <Box className="w-8 h-8 text-white" />
          <span>Exercise Dash</span>
        </div>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
              pathname.startsWith(item.href)
                ? "bg-zinc-800 text-white"
                : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900"
            )}
          >
            <item.icon className="w-5 h-5" />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="p-4 border-t border-zinc-800">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2 text-zinc-400 hover:text-red-400 hover:bg-zinc-900 rounded-md transition-colors"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
