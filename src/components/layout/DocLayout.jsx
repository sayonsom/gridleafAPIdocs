import React from 'react';
import { Text } from '../typography/Text';

export function DocLayout({ children, sidebar }) {
  return (
    <div className="min-h-screen bg-transparent">
      {/* Header */}
      <header className="fixed top-0 inset-x-0 z-40 h-16 border-b border-gray-800 bg-transparent px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-2">
            <span className="sr-only">GridLeaf</span>
            <div className="text-xl font-semibold text-gray-900 dark:text-white">GridLeaf</div>
          </a>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/docs" className="text-sm font-medium text-gray-900 dark:text-white">Docs</a>
            <a href="/api" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">API</a>
            <a href="/support" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">Support</a>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <a href="/login" className="text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white">
            Sign in
          </a>
          <button
            className="rounded-lg bg-transparent hover:bg-gray-800 px-4 py-2 text-sm font-medium text-white transition-colors"
          >
            Start free
          </button>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className="fixed inset-y-0 left-0 z-30 w-64 border-r border-gray-800 bg-transparent pt-16 pb-4 transition-transform duration-200 ease-in-out">
          {sidebar}
        </aside>

        {/* Main content */}
        <main className="flex-1 pt-16">
          <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg: lg:pr-8">
            {children}
          </div>
        </main>

        {/* Right sidebar for "On this page" */}
        <aside className="fixed inset-y-0 right-0 z-30 w-64 border-l border-gray-800 bg-transparent pt-16 pb-4">
          <div className="px-8 py-6">
            <Text variant="small" className="font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100">
              ON THIS PAGE
            </Text>
            <nav className="mt-4">
              {/* Add table of contents here */}
            </nav>
          </div>
        </aside>
      </div>
    </div>
  );
} 