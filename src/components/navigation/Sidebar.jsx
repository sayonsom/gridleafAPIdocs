import React, { useState } from 'react';
import { Text } from '../typography/Text';

function NavItem({ href, children, isActive }) {
  return (
    <a
      href={href}
      className={`block py-2 px-3 text-sm rounded-md transition-colors ${
        isActive
          ? 'text-blue-600 bg-blue-50 hover:bg-blue-100'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      }`}
    >
      {children}
    </a>
  );
}

function NavSection({ title, items }) {
  const [isOpen, setIsOpen] = useState(true);
  const hasActiveItem = items.some(item => item.isActive);

  return (
    <div className="mb-6">
      <button
        className={`flex items-center justify-between w-full text-left mb-2 group ${
          hasActiveItem ? 'text-gray-900' : 'text-gray-600'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm font-semibold group-hover:text-gray-900">
          {title}
        </span>
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'transform rotate-0' : 'transform -rotate-90'
          }`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>
      {isOpen && (
        <ul className="space-y-1">
          {items.map((item) => (
            <li key={item.href}>
              <NavItem href={item.href} isActive={item.isActive}>
                {item.name}
              </NavItem>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function Sidebar({ sections }) {
  return (
    <nav className="py-4 px-3">
      {sections.map((section) => (
        <NavSection
          key={section.title}
          title={section.title}
          items={section.items}
        />
      ))}
    </nav>
  );
} 