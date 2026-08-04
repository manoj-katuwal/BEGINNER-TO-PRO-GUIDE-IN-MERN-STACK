export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p className="footer-copy">
          &copy; {year} Manoj Katwal. Built with React &amp; ❤️
        </p>

        <nav className="footer-links" aria-label="Footer navigation">
          <a href="#projects" className="footer-link">Projects</a>
          <a href="#skills"   className="footer-link">Skills</a>
          <a href="#about"    className="footer-link">About</a>
          <a href="#contact"  className="footer-link">Contact</a>
        </nav>
      </div>
    </footer>
  );
}
