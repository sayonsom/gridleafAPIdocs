'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function TableOfContents() {
  const [headings, setHeadings] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // Reset headings when path changes
    setHeadings([]);
    
    // Small delay to ensure the new content is rendered
    const timeoutId = setTimeout(() => {
      const elements = Array.from(document.querySelectorAll('h1, h2, h3, h4'));
      const items = elements.map((element, index) => ({
        id: element.id || `heading-${index}`,
        text: element.textContent,
        level: Number(element.tagName.charAt(1))
      }));
      setHeadings(items);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  if (headings.length === 0) return null;

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="fixed top-20 right-4 z-50 md:hidden p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 backdrop-blur-sm"
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isMobileMenuOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* Table of Contents */}
      <nav
        className={`
          fixed top-16 right-0 z-30 h-[calc(100vh-4rem)] w-64 bg-transparent border-l border-gray-800/50
          transform transition-transform duration-200 ease-in-out
          ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}
          md:translate-x-0 md:static
        `}
      >
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4 text-white">On this page</h2>
          <ul className="space-y-2">
            {headings.map((heading, index) => (
              <li
                key={`${heading.id}-${index}`}
                className={`${
                  heading.level === 1 ? 'font-bold' : ''
                } ${
                  heading.level === 2 ? 'ml-4' : ''
                } ${
                  heading.level === 3 ? 'ml-8' : ''
                } ${
                  heading.level === 4 ? 'ml-12' : ''
                }`}
              >
                <a
                  href={`#${heading.id}`}
                  className="text-gray-400 hover:text-white"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
} 