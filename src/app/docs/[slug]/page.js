import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

async function getDocBySlug(slug) {
  const docsDirectory = path.join(process.cwd(), 'content/docs');
  const filePath = path.join(docsDirectory, `${slug}.mdx`);
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);
    return {
      slug,
      content,
      frontmatter: data,
      title: data.title || slug.replace(/-/g, ' ')
    };
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const doc = await getDocBySlug(params.slug);
  
  if (!doc) {
    return {
      title: 'Not Found',
      description: 'The requested documentation page could not be found.'
    };
  }

  return {
    title: doc.title,
    description: doc.frontmatter.description || `Documentation for ${doc.title} - GridLeaf API Documentation`,
    openGraph: {
      title: doc.title,
      description: doc.frontmatter.description || `Documentation for ${doc.title} - GridLeaf API Documentation`,
    },
  };
}

export async function generateStaticParams() {
  const docsDirectory = path.join(process.cwd(), 'content/docs');
  const files = fs.readdirSync(docsDirectory);
  
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => ({
      slug: file.replace(/\.mdx$/, '')
    }));
}

export default async function DocPage({ params }) {
  const doc = await getDocBySlug(params.slug);
  
  if (!doc) {
    notFound();
  }

  return (
    <div className="min-h-screen p-8">
      <article className="prose dark:prose-invert max-w-none">
        <MDXRemote source={doc.content} />
      </article>
    </div>
  );
} 