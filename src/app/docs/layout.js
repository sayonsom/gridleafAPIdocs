import DocsLayoutClient from './DocsLayoutClient';
import TableOfContents from './TableOfContents';

export default function DocsLayout({ children }) {
  return (
    <div className="flex min-h-screen h-screen overflow-hidden">
      <DocsLayoutClient />
      <main className="flex-1 overflow-y-auto scrollbar-hide">
        <div className="p-4 md:p-8">
          {children}
        </div>
      </main>
      <TableOfContents />
    </div>
  );
} 