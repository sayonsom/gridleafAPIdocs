import { MDXRemote } from 'next-mdx-remote/rsc';

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

const components = {
  h1: ({ children, ...props }) => {
    const id = slugify(children);
    return (
      <h1 
        id={id}
        className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-8 mt-2 scroll-mt-20" 
        {...props}
      >
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }) => {
    const id = slugify(children);
    return (
      <h2 
        id={id}
        className="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-20" 
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }) => {
    const id = slugify(children);
    return (
      <h3 
        id={id}
        className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-white mt-8 mb-4 scroll-mt-20" 
        {...props}
      >
        {children}
      </h3>
    );
  },
  h4: ({ children, ...props }) => {
    const id = slugify(children);
    return (
      <h4 
        id={id}
        className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white mt-6 mb-4 scroll-mt-20" 
        {...props}
      >
        {children}
      </h4>
    );
  },
  p: (props) => (
    <p 
      className="text-base leading-7 text-gray-600 dark:text-gray-300 mb-4 max-w-prose" 
      {...props} 
    />
  ),
  pre: (props) => (
    <pre 
      className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg mb-6 overflow-x-auto border border-gray-200 dark:border-gray-700" 
      {...props} 
    />
  ),
  code: (props) => (
    <code 
      className="bg-gray-50 dark:bg-gray-800/50 px-1.5 py-0.5 rounded text-sm font-mono text-gray-900 dark:text-gray-100" 
      {...props} 
    />
  ),
  ul: (props) => (
    <ul 
      className="list-disc pl-6 mb-4 space-y-2 text-gray-600 dark:text-gray-300 max-w-prose" 
      {...props} 
    />
  ),
  ol: (props) => (
    <ol 
      className="list-decimal pl-6 mb-4 space-y-2 text-gray-600 dark:text-gray-300 max-w-prose" 
      {...props} 
    />
  ),
  li: (props) => (
    <li 
      className="text-base leading-7" 
      {...props} 
    />
  ),
  blockquote: (props) => (
    <blockquote 
      className="border-l-4 border-gray-200 dark:border-gray-700 pl-4 italic text-gray-600 dark:text-gray-300 mb-4 max-w-prose" 
      {...props} 
    />
  ),
  a: (props) => (
    <a 
      className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline-offset-2 hover:underline transition-colors" 
      {...props} 
    />
  ),
};

export function Mdx({ source }) {
  return (
    <article className="prose dark:prose-invert max-w-none">
      <div className="max-w-prose">
        <MDXRemote 
          source={source} 
          components={components}
        />
      </div>
    </article>
  );
} 