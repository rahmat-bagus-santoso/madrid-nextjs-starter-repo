'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { exerciseLoginAction } from './actions';
import { Box, Lock, User as UserIcon } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const callbackUrl = searchParams.get('callbackUrl') || '/exercise-dashboard/root/products';

  const handleLogin = async (role: 'user' | 'admin') => {
    setIsLoading(true);
    try {
      await exerciseLoginAction(role, callbackUrl);
    } catch (error) {
      console.error('Login failed', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#0a0a0a]">
      <div className="w-full max-w-md p-8 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl">
        <div className="flex flex-col items-center mb-8">
          <div className="p-3 bg-white rounded-full mb-4">
            <Box className="w-8 h-8 text-black" />
          </div>
          <h1 className="text-2xl font-bold text-white text-center">Exercise Dashboard</h1>
          <p className="text-zinc-400 text-sm mt-2">Choose your access level to continue</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => handleLogin('user')}
            disabled={isLoading}
            className="w-full flex items-center justify-between p-4 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-900 rounded-md">
                <UserIcon className="w-5 h-5 text-zinc-400 group-hover:text-white" />
              </div>
              <div className="text-left">
                <div className="text-white font-medium">Standard User</div>
                <div className="text-zinc-500 text-xs">View products and manage cart</div>
              </div>
            </div>
            <div className="text-zinc-600 group-hover:text-white transition-colors">→</div>
          </button>

          <button
            onClick={() => handleLogin('admin')}
            disabled={isLoading}
            className="w-full flex items-center justify-between p-4 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-lg transition-all group"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-zinc-900 rounded-md">
                <Lock className="w-5 h-5 text-zinc-400 group-hover:text-white" />
              </div>
              <div className="text-left">
                <div className="text-white font-medium">Admin Access</div>
                <div className="text-zinc-500 text-xs">Full access to dashboard demo</div>
              </div>
            </div>
            <div className="text-zinc-600 group-hover:text-white transition-colors">→</div>
          </button>
        </div>

        <div className="mt-8 text-center text-zinc-500 text-xs">
          Mock Authentication System &bull; DummyJSON API
        </div>
      </div>
    </div>
  );
}
