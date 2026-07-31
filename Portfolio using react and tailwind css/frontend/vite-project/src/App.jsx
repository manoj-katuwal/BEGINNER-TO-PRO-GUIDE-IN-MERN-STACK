import { useState, useEffect, useCallback } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import About from './components/About';
import Journey from './components/Journey';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Safely get/set theme in localStorage (private browsing safe)
function getSavedTheme() {
  try { return localStorage.getItem('theme'); } catch { return null; }
}
function setSavedTheme(t) {
  try { localStorage.setItem('theme', t); } catch {}
}

function applyTheme(theme) {
  const root = document.documentElement;
  const meta = document.querySelector('#theme-meta');
  if (theme === 'dark') {
    root.classList.add('dark');
    if (meta) meta.setAttribute('content', '#0B0F19');
  } else {
    root.classList.remove('dark');
    if (meta) meta.setAttribute('content', '#F8FAFC');
  }
}

export default function App() {
  // Initialize from inline script state (avoids re-flash)
  const [theme, setTheme] = useState(() => {
    const saved = getSavedTheme();
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  // Sync DOM whenever theme changes
  useEffect(() => { applyTheme(theme); }, [theme]);

  // Listen to OS-level theme changes (only if user has no explicit preference saved)
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      if (!getSavedTheme()) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };
    media.addEventListener('change', handleChange);
    return () => media.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      setSavedTheme(next);
      return next;
    });
  }, []);

  return (
    <div className="app">
      {/* Background canvas: grid + blobs */}
      <div className="bg-canvas">
        <div className="bg-grid" />
        <div className="bg-blob bg-blob-1" />
        <div className="bg-blob bg-blob-2" />
      </div>

      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <Projects />
        <Skills />
        <About />
        <Journey />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
