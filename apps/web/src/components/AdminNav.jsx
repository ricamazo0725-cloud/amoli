import React from 'react';
import { NavLink } from 'react-router-dom';

const tabClass = ({ isActive }) =>
  `px-4 py-2 font-display text-sm font-bold uppercase tracking-wide transition-colors rounded-sm ${
    isActive ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
  }`;

const AdminNav = () => (
  <nav className="mb-8 flex gap-2 border-b border-border pb-4">
    <NavLink to="/admin" end className={tabClass}>Productos</NavLink>
    <NavLink to="/admin/orders" className={tabClass}>Pedidos</NavLink>
    <NavLink to="/admin/blog" className={tabClass}>Blog</NavLink>
  </nav>
);

export default AdminNav;
