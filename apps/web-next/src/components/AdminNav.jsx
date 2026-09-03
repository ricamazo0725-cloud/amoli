'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { href: '/admin', label: 'Productos', exact: true },
  { href: '/admin/orders', label: 'Pedidos' },
  { href: '/admin/blog', label: 'Blog' },
];

const AdminNav = () => {
  const pathname = usePathname();
  return (
    <nav className="mb-8 flex gap-2 border-b border-border pb-4">
      {TABS.map((tab) => {
        const isActive = tab.exact ? pathname === tab.href : pathname.startsWith(tab.href);
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-4 py-2 font-display text-sm font-bold uppercase tracking-wide transition-colors rounded-sm ${
              isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default AdminNav;
