'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsSearchOpen((open) => !open);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('keydown', down);
    return () => document.removeEventListener('keydown', down);
  }, []);

  useEffect(() => {
    let searchTimeout;
    if (searchQuery.trim()) {
      setIsLoading(true);
      searchTimeout = setTimeout(async () => {
        try {
          const response = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
          if (!response.ok) {
            throw new Error('Search failed');
          }
          const data = await response.json();
          setSearchResults(data.results);
        } catch (error) {
          console.error('Search failed:', error);
          setSearchResults([]);
        }
        setIsLoading(false);
      }, 300);
    } else {
      setSearchResults([]);
    }

    return () => {
      if (searchTimeout) {
        clearTimeout(searchTimeout);
      }
    };
  }, [searchQuery]);

  const handleResultClick = (slug) => {
    router.push(`/docs${slug}`);
    setIsSearchOpen(false);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800 bg-black/50 backdrop-blur-xl">
      <div className="flex items-center justify-between h-16 px-4">
        <div className="flex items-center w-64">
          <Link href="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="GridLeaf Logo" className="h-12 w-auto" />
            <span className="text-xl font-bold text-white">Docs</span>
          </Link>
        </div>
        
        <div className="flex-1 max-w-2xl mx-8">
          <button
            onClick={() => setIsSearchOpen(true)}
            className="w-full flex items-center space-x-2 px-4 py-2.5 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
          >
            <Search className="w-5 h-5 text-gray-400" />
            <span className="text-sm text-gray-400">Search documentation...</span>
            <kbd className="hidden sm:inline-block px-2 py-1 text-xs bg-gray-700 rounded text-gray-300">
              ⌘K
            </kbd>
          </button>
        </div>

        <div className="flex items-center space-x-4">
          <a
            href="https://gridleaf.org/login"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
          >
            Go to Portal
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
          <div className="w-full max-w-3xl mx-4">
            <div className="bg-gray-900 rounded-xl shadow-2xl border border-gray-800">
              <form onSubmit={handleSearchSubmit} className="p-6">
                <div className="flex items-center space-x-3">
                  <Search className="w-6 h-6 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search documentation..."
                    className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-400 text-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                </div>
              </form>

              {/* Search Results */}
              <div className="border-t border-gray-800">
                {isLoading ? (
                  <div className="p-4 text-center text-gray-400">Searching...</div>
                ) : searchResults.length > 0 ? (
                  <div className="max-h-[60vh] overflow-y-auto">
                    {searchResults.map((result, index) => (
                      <button
                        key={index}
                        onClick={() => handleResultClick(result.slug)}
                        className="w-full p-4 hover:bg-gray-800/50 transition-colors text-left border-b border-gray-800 last:border-b-0"
                      >
                        <div className="font-medium text-white">{result.title}</div>
                        {result.description && (
                          <div className="text-sm text-gray-400 mt-1">{result.description}</div>
                        )}
                        <div className="text-sm text-gray-500 mt-2">{result.snippet}</div>
                      </button>
                    ))}
                  </div>
                ) : searchQuery ? (
                  <div className="p-4 text-center text-gray-400">No results found</div>
                ) : null}
              </div>

              <div className="border-t border-gray-800 p-4">
                <div className="text-sm text-gray-400">
                  Press <kbd className="px-2 py-1 bg-gray-800 rounded">Esc</kbd> to close
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 