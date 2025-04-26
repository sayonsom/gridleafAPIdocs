'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function TableOfContents() {
  const [headings, setHeadings] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    // Reset headings when path changes
    setHeadings([]);
    
    // Small delay to ensure the new content is rendered
    const timeoutId = setTimeout(() => {
      const elements = Array.from(document.querySelectorAll('h1, h2, h3, h4'));
      const items = elements.map((element) => ({
        id: element.id,
        text: element.textContent,
        level: Number(element.tagName.charAt(1))
      }));
      setHeadings(items);
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [pathname]);

  if (headings.length === 0) return null;

  return (
    <nav className="w-64 border-l h-screen overflow-y-auto scrollbar-hide">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4">On this page</h2>
        <ul className="space-y-2">
          {headings.map((heading) => (
            <li
              key={heading.id}
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
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
} 