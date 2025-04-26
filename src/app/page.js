import fs from 'fs';
import path from 'path';
import Link from 'next/link';

export default function Home() {
  const docsDirectory = path.join(process.cwd(), 'content/docs');
  const files = fs.readdirSync(docsDirectory);
  const docs = files
    .filter(file => file.endsWith('.mdx'))
    .map(file => ({
      slug: file.replace(/\.mdx$/, ''),
      title: file.replace(/\.mdx$/, '').replace(/-/g, ' ')
    }));

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">API Documentation</h1>
      <div className="grid gap-4">
        {docs.map((doc) => (
          <Link
            key={doc.slug}
            href={`/docs/${doc.slug}`}
            className="p-4 border rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            <h2 className="text-xl font-semibold">{doc.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}
