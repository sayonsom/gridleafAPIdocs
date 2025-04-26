import React from 'react';
import clsx from 'clsx';

const textStyles = {
  h1: 'text-4xl font-bold tracking-tight text-gray-900 dark:text-white mb-4',
  h2: 'text-2xl font-semibold text-gray-900 dark:text-white mt-12 mb-6',
  h3: 'text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4',
  body: 'text-base leading-7 text-gray-600 dark:text-gray-300',
  small: 'text-sm leading-6 text-gray-500 dark:text-gray-400',
  link: 'text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline-offset-2 hover:underline transition-colors',
  code: 'px-2 py-1 text-sm font-mono bg-gray-100 dark:bg-gray-800 rounded-md text-gray-900 dark:text-gray-100',
};

export function Text({ as = 'p', variant = 'body', className, children, ...props }) {
  const Component = as;
  
  return (
    <Component
      className={clsx(textStyles[variant], className)}
      {...props}
    >
      {children}
    </Component>
  );
}

export function Link({ href, className, children, ...props }) {
  return (
    <a
      href={href}
      className={clsx(
        'inline-flex items-center',
        textStyles.link,
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}

export function Code({ children, className }) {
  return (
    <code className={clsx(textStyles.code, className)}>
      {children}
    </code>
  );
} 