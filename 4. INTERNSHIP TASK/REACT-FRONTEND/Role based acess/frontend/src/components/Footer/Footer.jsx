import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  const linkClass = ({ isActive }) =>
    `transition-colors ${isActive ? 'text-emerald-700 font-semibold' : 'text-slate-700 hover:text-emerald-600'}`;

  return (
    <footer className="bg-white border-t border-slate-200 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">Farm Root</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Bringing fresh organic produce from farm to table with love, quality, and care.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 mb-3">Quick links</h3>
            <ul className="space-y-2 text-sm">
              <li><NavLink to="/" className={linkClass}>Home</NavLink></li>
              <li><NavLink to="/products" className={linkClass}>Products</NavLink></li>
              <li><NavLink to="/about" className={linkClass}>About Us</NavLink></li>
              <li><NavLink to="/contact" className={linkClass}>Contact</NavLink></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 mb-3">Contact</h3>
            <p className="text-sm text-slate-700">Email: support@farmroot.com</p>
            <p className="text-sm text-slate-700">Phone: +1 (555) 123-4567</p>
            <p className="text-sm text-slate-700 mt-4">123 Green Lane, Nature City</p>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-slate-200 text-sm text-slate-500 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Farm Root. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <NavLink to="/privacy" className={linkClass}>Privacy</NavLink>
            <NavLink to="/terms" className={linkClass}>Terms</NavLink>
            <NavLink to="/support" className={linkClass}>Support</NavLink>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
