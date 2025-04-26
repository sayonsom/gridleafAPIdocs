import fs from 'fs';
import path from 'path';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata = {
  title: 'Home',
  description: 'Welcome to GridLeaf API Documentation. Find comprehensive guides and documentation for our grid planning and resiliency tools.',
};

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

async function getDocs() {
  const docsDirectory = path.join(process.cwd(), 'content/docs');
  const files = fs.readdirSync(docsDirectory);
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => ({
      slug: file.replace(/\.mdx$/, ''),
      title: file.replace(/\.mdx$/, '').replace(/-/g, ' ')
    }));
}

export default async function Home() {
  const docs = await getDocs();

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
