'use client';

import { MDXRemote } from 'next-mdx-remote/rsc';
import dynamic from 'next/dynamic';
import { useState, useRef, useEffect } from 'react';

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// Client-side only interactive wrapper
const InteractiveCodeBlock = dynamic(() => Promise.resolve(({ children, className, content }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const codeRef = useRef(null);
  const [shouldShowExpand, setShouldShowExpand] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      setShouldShowExpand(codeRef.current.scrollHeight > 200);
    }
  }, []);

  const handleCopy = async () => {
    if (content) {
      await navigator.clipboard.writeText(content);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  const isPythonCode = className?.includes('language-python');

  return (
    <div className="relative group">
      <div 
        ref={codeRef}
        className={`bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg mb-6 overflow-x-auto border border-gray-200 dark:border-gray-700 font-mono text-sm ${
          !isExpanded && shouldShowExpand ? 'max-h-[200px] overflow-hidden' : ''
        }`}
      >
        {children}
      </div>
      <div className="absolute bottom-2 right-2 flex gap-2">
        {shouldShowExpand && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
          >
            {isExpanded ? 'Show Less' : 'Show More'}
          </button>
        )}
        {isPythonCode && (
          <button
            onClick={handleCopy}
            className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors flex items-center gap-1"
          >
            {isCopied ? (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Copied!
              </>
            ) : (
              <>
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
                Copy
              </>
            )}
          </button>
        )}
      </div>
    </div>
  );
}), { ssr: false });

// Server-side rendered code block that hydrates with interactivity
const CodeBlock = ({ children, className }) => {
  // Extract the actual code content for copying
  const content = children?.props?.children || '';
  
  return (
    <InteractiveCodeBlock className={className} content={content}>
      <pre className="overflow-x-auto">
        {children}
      </pre>
    </InteractiveCodeBlock>
  );
};

const components = {
  h1: ({ children, ...props }) => {
    const id = slugify(children);
    return (
      <h1 
        id={id}
        className="text-4xl font-light tracking-tight text-gray-900 dark:text-white mb-8 mt-2 scroll-mt-20" 
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
        className="text-3xl font-light tracking-tight text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-20" 
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
  pre: (props) => <CodeBlock {...props} />,
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