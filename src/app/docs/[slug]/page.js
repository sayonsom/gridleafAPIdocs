import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import matter from 'gray-matter';
import rehypeSlug from 'rehype-slug';
import rehypePrism from 'rehype-prism-plus';
import { notFound } from 'next/navigation';

const components = {
  pre: (props) => <div className="overflow-auto my-4 rounded-lg" {...props} />,
  code: (props) => <code className="text-sm" {...props} />,
  h1: (props) => (
    <h1 
      {...props} 
      id={props.children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-')}
      className="scroll-mt-20"
    />
  ),
  h2: (props) => (
    <h2 
      {...props} 
      id={props.children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-')}
      className="scroll-mt-20"
    />
  ),
  h3: (props) => (
    <h3 
      {...props} 
      id={props.children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-')}
      className="scroll-mt-20"
    />
  ),
  h4: (props) => (
    <h4 
      {...props} 
      id={props.children?.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-')}
      className="scroll-mt-20"
    />
  ),
};

async function getDocBySlug(slug) {
  try {
    if (!slug) return null;
    
    const realSlug = slug.replace(/\.mdx$/, '');
    const filePath = path.join(process.cwd(), 'content/docs', `${realSlug}.mdx`);
    
    if (!fs.existsSync(filePath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { content, data } = matter(fileContents);
    
    const { content: compiledContent } = await compileMDX({
      source: content,
      components,
      options: { 
        parseFrontmatter: true,
        mdxOptions: {
          format: 'mdx',
          rehypePlugins: [
            rehypeSlug,
            [rehypePrism, { showLineNumbers: true }]
          ],
        }
      }
    });

    return {
      content: compiledContent,
      frontmatter: data
    };
  } catch (error) {
    console.error('Error reading doc:', error);
    return null;
  }
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
  const slug = await params.slug;
  
  if (!slug) {
    notFound();
  }

  const doc = await getDocBySlug(slug);
  
  if (!doc) {
    notFound();
  }
  
  return (
    <article className="prose prose-slate dark:prose-invert max-w-none">
      {doc.content}
    </article>
  );
} 