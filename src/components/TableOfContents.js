'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

function getHeadings() {
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4'));
  return headings
    .map((heading) => ({
      id: heading.id,
      text: heading.textContent,
      level: parseInt(heading.tagName.charAt(1)),
    }))
    .filter(heading => heading.id && heading.text); // Filter out headings without IDs or text
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState([]);
  const [activeId, setActiveId] = useState('');
  const pathname = usePathname();

  useEffect(() => {
    const headingElements = getHeadings();
    setHeadings(headingElements);

    // Update headings when content changes
    const observer = new MutationObserver(() => {
      const newHeadings = getHeadings();
      setHeadings(newHeadings);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Intersection Observer for active heading
    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer2 = new IntersectionObserver(callback, {
      rootMargin: '-100px 0px -66%',
    });

    const elements = document.querySelectorAll('h1, h2, h3, h4');
    elements.forEach((elem) => observer2.observe(elem));

    return () => {
      observer.disconnect();
      observer2.disconnect();
    };
  }, [pathname]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <nav className="px-6 py-8">
      <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-gray-100 mb-4">
        On This Page
      </h2>
      <ul className="space-y-2.5">
        {headings.map((heading) => (
          <li
            key={heading.id}
            style={{
              paddingLeft: `${(heading.level - 1) * 0.75}rem`,
            }}
          >
            <a
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(heading.id)?.scrollIntoView({
                  behavior: 'smooth',
                  block: 'start',
                });
              }}
              className={`
                block text-sm transition-colors duration-150
                ${heading.id === activeId ? 'text-blue-600 dark:text-blue-400' : ''}
                ${heading.level === 1 ? 'font-semibold text-gray-900 dark:text-gray-100' : ''}
                ${heading.level === 2 ? 'text-gray-700 dark:text-gray-300' : ''}
                ${heading.level === 3 ? 'text-gray-600 dark:text-gray-400' : ''}
                ${heading.level === 4 ? 'text-gray-500 dark:text-gray-500' : ''}
                hover:text-blue-600 dark:hover:text-blue-400
              `}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
} 