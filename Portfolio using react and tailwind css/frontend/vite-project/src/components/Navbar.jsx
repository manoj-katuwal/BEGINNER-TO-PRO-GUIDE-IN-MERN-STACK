import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';

const NAV_ITEMS = [
  { label: 'Projects', href: '#projects' },
  { label: 'Skills',   href: '#skills'   },
  { label: 'About',    href: '#about'    },
  { label: 'Journey',  href: '#journey'  },
  { label: 'Contact',  href: '#contact'  },
];

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      // Scroll-spy: find which section is currently in view
      const sections = NAV_ITEMS.map(({ href }) =>
        document.querySelector(href)
      );
      const offset = window.scrollY + 120;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = sections[i];
        if (el && el.offsetTop <= offset) {
          setActive(NAV_ITEMS[i].href);
          return;
        }
      }
      if (window.scrollY < 80) setActive('');
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleLinkClick = (href) => {
    setActive(href);
    setMobileOpen(false);
  };

  return (
    <>
      <motion.nav
        className={`navbar ${scrolled ? 'scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        <div className="container navbar-inner">
          <a href="#" className="logo" onClick={() => handleLinkClick('')}>
            MANOJ<span className="logo-dot" />
            <span className="dev-badge">
              <span className="dev-loader" />
              Under Construction
            </span>
          </a>

          {/* Desktop links */}
          <nav className="nav-links" aria-label="Primary navigation">
            {NAV_ITEMS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className={`nav-link ${active === href ? 'active' : ''}`}
                onClick={() => handleLinkClick(href)}
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Right actions */}
          <div className="nav-actions">
            {/* Theme toggle */}
            <button
              className="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              aria-live="polite"
            >
              <motion.span
                className="toggle-icon"
                key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0,   opacity: 1, scale: 1   }}
                exit={{    rotate:  90,  opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </motion.span>
            </button>

            {/* Hamburger */}
            <button
              className="menu-toggle"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="mobile-nav"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{    opacity: 0, y: -16 }}
            transition={{ duration: 0.28 }}
            aria-modal="true"
            role="dialog"
            aria-label="Mobile navigation"
          >
            <button
              className="mobile-nav-close"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation menu"
            >
              <X size={24} />
            </button>

            <nav className="mobile-nav-links">
              {NAV_ITEMS.map(({ label, href }) => (
                <a
                  key={href}
                  href={href}
                  className={`mobile-nav-link ${active === href ? 'active' : ''}`}
                  onClick={() => handleLinkClick(href)}
                >
                  {label}
                </a>
              ))}
            </nav>

            <a
              href="#contact"
              className="btn btn-primary"
              onClick={() => handleLinkClick('#contact')}
            >
              Let&apos;s Connect
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
