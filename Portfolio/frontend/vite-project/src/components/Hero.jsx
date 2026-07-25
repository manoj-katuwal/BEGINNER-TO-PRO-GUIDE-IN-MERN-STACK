import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download } from 'lucide-react';

const ROLES = [
  'MERN Stack Developer',
  'React Frontend Engineer',
  'Node.js Backend Dev',
  'Full Stack Builder',
];

function useTypewriter(words, speed = 80, pauseMs = 2000) {
  const [text, setText] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIdx];
    let timeout;

    if (!deleting && charIdx <= currentWord.length) {
      timeout = setTimeout(() => {
        setText(currentWord.slice(0, charIdx));
        setCharIdx((c) => c + 1);
      }, speed);
    } else if (!deleting && charIdx > currentWord.length) {
      timeout = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => {
        setText(currentWord.slice(0, charIdx - 1));
        setCharIdx((c) => c - 1);
      }, speed / 2);
    } else {
      setDeleting(false);
      setWordIdx((w) => (w + 1) % words.length);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pauseMs]);

  return text;
}

export default function Hero() {
  const roleName = useTypewriter(ROLES);

  return (
    <section id="hero" className="hero">
      <div className="container hero-grid">
        {/* ── Left copy ── */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, ease: 'easeOut' }}
        >
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Available for hire
          </div>

          <h1 className="hero-title">
            Hi, I&apos;m{' '}
            <span className="gradient-text">Manoj Katwal</span>
            <br />
            <span className="hero-typewriter-wrap">
              <span className="hero-typewriter">{roleName}</span>
              <span className="hero-cursor" aria-hidden="true" />
            </span>
          </h1>

          <p className="hero-desc">
            I design responsive frontends with React and build scalable APIs using
            Node.js, Express, and MongoDB — crafting full-stack web experiences
            from database to UI.
          </p>

          <div className="hero-actions">
            <a href="#projects" className="btn btn-primary">
              View My Work <ArrowRight size={18} />
            </a>
            <a href="/cv/Manoj_Katuwal_CV.pdf" download className="btn btn-secondary">
              Download CV <Download size={18} />
            </a>
          </div>
        </motion.div>

        {/* ── Right: Terminal mockup ── */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.75, delay: 0.2, ease: 'easeOut' }}
        >
          <div className="hero-terminal">
            {/* Window chrome */}
            <div className="terminal-topbar">
              <span className="terminal-dot terminal-dot-r" />
              <span className="terminal-dot terminal-dot-y" />
              <span className="terminal-dot terminal-dot-g" />
              <span className="terminal-title">portfolio.js</span>
            </div>

            {/* Code body */}
            <div className="terminal-body" aria-label="Code snippet">
              <div>
                <span className="t-comment">// Manoj's stack</span>
              </div>
              <div>
                <span className="t-keyword">const </span>
                <span className="t-var">developer</span>
                <span className="t-arr"> = {'{'}</span>
              </div>
              <div>
                &nbsp;&nbsp;<span className="t-key">name</span>
                <span className="t-arr">: </span>
                <span className="t-string">'Manoj Katwal'</span>,
              </div>
              <div>
                &nbsp;&nbsp;<span className="t-key">role</span>
                <span className="t-arr">: </span>
                <span className="t-string">'MERN Stack Developer'</span>,
              </div>
              <div>
                &nbsp;&nbsp;<span className="t-key">stack</span>
                <span className="t-arr">: [</span>
                <span className="t-string">'MongoDB'</span>,{' '}
                <span className="t-string">'Express'</span>,{' '}
                <span className="t-string">'React'</span>,{' '}
                <span className="t-string">'Node'</span>
                <span className="t-arr">]</span>,
              </div>
              <div>
                &nbsp;&nbsp;<span className="t-key">location</span>
                <span className="t-arr">: </span>
                <span className="t-string">'Dharan, Nepal'</span>,
              </div>
              <div>
                &nbsp;&nbsp;<span className="t-key">available</span>
                <span className="t-arr">: </span>
                <span className="t-bool">true</span>,
              </div>
              <div>
                &nbsp;&nbsp;<span className="t-fn">hire</span>
                <span className="t-arr">: () =&gt; </span>
                <span className="t-string">'katwalmanoj67@gmail.com'</span>,
              </div>
              <div><span className="t-arr">{'}'}</span>;</div>
              <br />
              <div>
                <span className="t-var">console</span>
                <span className="t-arr">.</span>
                <span className="t-fn">log</span>
                <span className="t-arr">(developer.</span>
                <span className="t-key">hire</span>
                <span className="t-arr">()); </span>
                <span className="t-comment">// Ready!</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
