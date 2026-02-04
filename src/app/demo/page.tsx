"use client";

import { useState } from 'react';
import { useFetch } from '@/hooks/useFetch';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { useDebounce } from '@/hooks/useDebounce';
import { DemoImage } from '@/components/demo/DemoImage';

export default function DemoPage() {
  /**
   * INSTRUCTIONS:
   * Follow the TODOs in the sequence:
   * 1. Hook 1: useDebounce.ts (Easiest)
   * 2. Hook 2: useMediaQuery.ts
   * 3. Hook 3: useLocalStorage.ts
   * 4. Hook 4: useFetch.ts (Medium/Hard)
   * 5. Task 5: Next.js Performance (DemoImage.tsx & layout.tsx)
   */

  // TODO Hook 4: Implement useFetch to load these posts
  const { data: posts, loading, error } = useFetch<any[]>('https://jsonplaceholder.typicode.com/posts?_limit=3');

  // TODO Hook 3: Implement useLocalStorage to persist this name
  const [name, setName] = useLocalStorage('demo-name', 'Guest');

  // TODO Hook 2: Implement useMediaQuery to detect screen size
  const isMobile = useMediaQuery('(max-width: 768px)');

  // TODO Hook 1: Implement useDebounce to optimize this search
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-[family-name:var(--font-inter)]">
      <div className="max-w-4xl mx-auto space-y-12">
        <header className="text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Madrid Next.js Demo
          </h1>
          <p className="mt-4 text-xl text-gray-500">
            Showcasing custom hooks, performance improvements, and Next.js features.
          </p>
          <div className="mt-4 inline-block px-4 py-2 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
            Starter Code Mode: Implement the TODOs to see it in action!
          </div>
        </header>

        {/* Next.js Font & Media Query */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Responsive & Typography</h2>
          <div className="space-y-2">
            <p className="text-lg">
              Current Font: <span className="font-[family-name:var(--font-inter)]">Inter (Optimized by next/font)</span>
            </p>
            <p className="text-lg">
              Device: <span className={`font-bold ${isMobile ? 'text-blue-600' : 'text-green-600'}`}>
                {isMobile ? 'Mobile' : 'Desktop'}
              </span> (Detected by <code>useMediaQuery</code>)
            </p>
          </div>
        </section>

        {/* Custom Hooks: Local Storage & Debounce */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Persistence</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Update Name (useLocalStorage)</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <p className="text-gray-600">Saved in Local Storage: <span className="font-semibold text-gray-900">{name}</span></p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Search Optimization</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Search Query (useDebounce)</label>
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Type quickly..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Immediate: {searchTerm}</p>
                <p className="text-sm font-bold text-blue-600">Debounced (500ms): {debouncedSearchTerm}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Custom Hooks: useFetch */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Fetching (useFetch)</h2>
          {loading && <div className="text-center py-4">Loading posts... (Waiting for your implementation)</div>}
          {error && <div className="text-red-500 text-center py-4">Error: {error.message}</div>}
          <div className="space-y-4">
            {posts?.map((post) => (
              <div key={post.id} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="font-bold text-gray-900">{post.title}</h3>
                <p className="text-gray-600 mt-1">{post.body.substring(0, 100)}...</p>
              </div>
            ))}
            {!loading && !posts && (
              <p className="text-center text-gray-500 italic">No data yet. Implement useFetch to see posts!</p>
            )}
          </div>
        </section>

        {/* Next.js Image Component */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <DemoImage />
        </section>
      </div>
    </div>
  );
}
