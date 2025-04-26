'use client';

// src/components/SidebarNav.js

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SidebarNav({ items }) {
  const pathname = usePathname();

  const renderNavItem = (item) => {
    const isActive = pathname === item.href;
    const hasItems = item.items && item.items.length > 0;

    return (
      <div key={item.href} className="space-y-1">
        <Link 
          href={item.href} 
          className={`
            block px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-150 
            ${isActive 
              ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300" 
              : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
            }
          `}
        >
          {item.title}
        </Link>
        {hasItems && (
          <div className="ml-4 space-y-1">
            {item.items.map((subItem) => (
              <Link 
                key={subItem.href} 
                href={subItem.href}
                className={`
                  block px-4 py-1.5 rounded-lg text-sm transition-colors duration-150 
                  ${pathname === subItem.href
                    ? "text-blue-700 dark:text-blue-300"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                  }
                `}
              >
                {subItem.title}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="px-4 py-6 space-y-6">
      {items.map((item) => (
        <div key={item.href} className="space-y-2">
          {item.category && (
            <h3 className="px-4 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {item.category}
            </h3>
          )}
          {renderNavItem(item)}
        </div>
      ))}
    </nav>
  );
}
