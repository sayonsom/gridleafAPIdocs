import fs from 'fs';
import path from "path";
import matter from "gray-matter";

export async function getSidebarItemsServer(baseDir = "content/docs") {
  const docsDir = path.join(process.cwd(), baseDir);
  const files = fs.readdirSync(docsDir);
  
  const apiDocs = files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const filePath = path.join(docsDir, file);
      const fileContents = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContents);
      const slug = file.replace(/\.mdx$/, '');
      
      return {
        title: data.title || slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
        href: `/docs/${slug}`,
      };
    });

  return [
    {
      title: 'Getting Started',
      href: '/docs',
      items: [
        {
          title: 'Overview',
          href: '/docs#overview'
        },
        {
          title: 'Quick Start',
          href: '/docs#quick-start'
        }
      ]
    },
    {
      title: 'API Documentation',
      href: '/docs/apis',
      items: apiDocs
    },
    {
      title: 'Advanced Topics',
      href: '/docs/advanced',
      items: [
        {
          title: 'Authentication',
          href: '/docs/advanced#authentication'
        },
        {
          title: 'Rate Limiting',
          href: '/docs/advanced#rate-limiting'
        }
      ]
    }
  ];
} 