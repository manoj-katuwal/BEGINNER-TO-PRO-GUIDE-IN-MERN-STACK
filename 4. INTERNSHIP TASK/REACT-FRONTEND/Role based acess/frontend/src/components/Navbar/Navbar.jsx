import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { 
  FiSearch, FiUser, FiShoppingCart, FiMenu, FiX, 
  FiHome, FiBox, FiInfo, FiMessageCircle, FiBookOpen, FiMail 
} from 'react-icons/fi';

const Navbar = () => {
  // throw new Error("Navbar gayo randi ")
  const [isOpen, setIsOpen] = useState(false);

  // Desktop nav style
  const navLinkStyle = ({ isActive }) =>
    `font-medium text-gray-600 transition-all duration-300 hover:text-emerald-600 px-3 py-2 rounded-md relative ${
      isActive 
        ? 'text-emerald-700 font-semibold after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-emerald-600' 
        : 'hover:bg-gray-50'
    }`;

  // Mobile nav style
  const mobileNavLinkStyle = ({ isActive }) =>
    `flex items-center gap-4 font-medium text-base py-3 px-4 rounded-lg transition-all duration-200 ${
      isActive 
        ? 'bg-emerald-50 text-emerald-700 font-semibold shadow-sm' 
        : 'text-gray-700 hover:bg-gray-50 active:bg-gray-100'
    }`;

  return (
    <>
      {/* Top Navbar */}
      <nav className="bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm w-full fixed top-0 left-0 z-50">
          <div className="max-w-7xl mx-auto flex justify-between h-20 items-center px-4 sm:px-6 lg:px-8 w-full">
            
            {/* Logo */}
            <div className="shrink-0">
              <Link to="/" className="text-2xl font-black text-emerald-800 tracking-tight">
                Farm<span className="text-emerald-500">_Root</span>
              </Link>
            </div>

            {/* Desktop Links */}
            <div className="hidden lg:flex items-center gap-x-6 text-[16px]">
              <NavLink to="/" className={navLinkStyle}>Home</NavLink>
              <NavLink to="/products" className={navLinkStyle}>Products</NavLink>
              <NavLink to="/about" className={navLinkStyle}>About Us</NavLink>
              <NavLink to="/testimonials" className={navLinkStyle}>Testimonials</NavLink>
              <NavLink to="/recipes" className={navLinkStyle}>Recipes</NavLink>
              <NavLink to="/contact" className={navLinkStyle}>Contact</NavLink>
            </div>

            {/* Desktop Icons */}
            <div className="hidden lg:flex items-center gap-x-4 text-xl text-gray-700">
              <button className="hover:text-emerald-600 transition-colors p-2 hover:bg-gray-50 rounded-full">
                <FiSearch />
              </button>
              <Link to="/login" className="hover:text-emerald-600 transition-colors p-2 hover:bg-gray-50 rounded-full">
                <FiUser />
              </Link>
              <Link to="/cart" className="hover:text-emerald-600 transition-colors p-2 hover:bg-gray-50 rounded-full relative">
                <FiShoppingCart />
                <span className="absolute top-1 right-1 bg-emerald-500 w-2 h-2 rounded-full"></span>
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <div className="lg:hidden flex items-center">
              <button 
                onClick={() => setIsOpen(true)} 
                className="text-gray-700 text-2xl p-2 rounded-lg hover:bg-gray-50 active:scale-95 transition-transform"
              >
                <FiMenu />
              </button>
            </div>

          </div>
        
      </nav>

      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300 ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Sidebar */}
      <div className={`fixed top-0 right-0 bottom-0 w-[80%] max-w-90 bg-white z-50 lg:hidden shadow-2xl flex flex-col justify-between p-6 transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div>
          {/* Header */}
          <div className="flex justify-between items-center pb-6 border-b border-gray-100">
            <span className="text-xl font-black text-emerald-800">Farm<span className="text-emerald-500">_Root</span></span>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-500 hover:text-black rounded-full hover:bg-gray-100 transition-colors"
            >
              <FiX className="text-2xl" />
            </button>
          </div>

          {/* Links */}
          <div className="mt-6 space-y-2">
            <NavLink to="/" onClick={() => setIsOpen(false)} className={mobileNavLinkStyle}>
              <FiHome className="text-xl" />
              <span>Home</span>
            </NavLink>
            <NavLink to="/products" onClick={() => setIsOpen(false)} className={mobileNavLinkStyle}>
              <FiBox className="text-xl" />
              <span>Products</span>
            </NavLink>
            <NavLink to="/about" onClick={() => setIsOpen(false)} className={mobileNavLinkStyle}>
              <FiInfo className="text-xl" />
              <span>About Us</span>
            </NavLink>
            <NavLink to="/testimonials" onClick={() => setIsOpen(false)} className={mobileNavLinkStyle}>
              <FiMessageCircle className="text-xl" />
              <span>Testimonials</span>
            </NavLink>
            <NavLink to="/recipes" onClick={() => setIsOpen(false)} className={mobileNavLinkStyle}>
              <FiBookOpen className="text-xl" />
              <span>Recipes</span>
            </NavLink>
            <NavLink to="/contact" onClick={() => setIsOpen(false)} className={mobileNavLinkStyle}>
              <FiMail className="text-xl" />
              <span>Contact</span>
            </NavLink>
          </div>
        </div>

        {/* Bottom Icons */}
        <div className="border-t border-gray-100 pt-6">
          <div className="grid grid-cols-3 gap-4 text-center text-xl text-gray-600">
            <button className="flex justify-center py-3 hover:text-emerald-600 hover:bg-gray-50 rounded-lg transition-colors"><FiSearch /></button>
            <Link to="/login" onClick={() => setIsOpen(false)} className="flex justify-center py-3 hover:text-emerald-600 hover:bg-gray-50 rounded-lg transition-colors"><FiUser /></Link>
            <Link to="/cart" onClick={() => setIsOpen(false)} className="flex justify-center py-3 hover:text-emerald-600 hover:bg-gray-50 rounded-lg transition-colors relative">
              <FiShoppingCart />
              <span className="absolute top-3 right-8 bg-emerald-500 w-2 h-2 rounded-full"></span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
