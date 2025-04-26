'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DocsLayoutClient() {
  const [docs, setDocs] = useState([]);
  const pathname = usePathname();

  useEffect(() => {
    // Fetch the list of docs
    fetch('/api/docs')
      .then(res => res.json())
      .then(data => setDocs(data));
  }, []);

  return (
    <aside className="w-64 border-r h-screen overflow-y-auto scrollbar-hide">
      <nav className="p-4 space-y-2">
        {docs.map((doc) => (
          <Link
            key={doc.slug}
            href={`/docs/${doc.slug}`}
            className={`block p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 ${
              pathname === `/docs/${doc.slug}` ? 'bg-gray-100 dark:bg-gray-800' : ''
            }`}
          >
            {doc.title}
          </Link>
        ))}
      </nav>
    </aside>
  );
} 