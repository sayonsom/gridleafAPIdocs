import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

export async function GET() {
  const docsDirectory = path.join(process.cwd(), 'content/docs');
  const files = fs.readdirSync(docsDirectory);
  
  const docs = files
    .filter(file => file.endsWith('.mdx'))
    .map(file => ({
      slug: file.replace(/\.mdx$/, ''),
      title: file.replace(/\.mdx$/, '').replace(/-/g, ' ')
    }));

  return NextResponse.json(docs);
} 