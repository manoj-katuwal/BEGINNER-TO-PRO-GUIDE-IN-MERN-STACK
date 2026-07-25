import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Code, Layers, GitBranch, Activity, Terminal, Heart, MapPin, Briefcase } from 'lucide-react';

/* ── Animated counter hook ── */
function useCountUp(target, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const num = parseInt(target, 10) || 0;
          const step = Math.max(1, Math.floor(num / (duration / 16)));
          let current = 0;
          const tick = () => {
            current += step;
            if (current >= num) { setCount(num); return; }
            setCount(current);
            requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function StatCounter({ icon: Icon, value, label, suffix = '+', color }) {
  const numericPart = value.replace(/[^0-9]/g, '');
  const { count, ref } = useCountUp(numericPart);

  return (
    <motion.div
      ref={ref}
      className="about-stat"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="about-stat-icon" style={{ '--stat-color': color }}>
        <Icon size={20} strokeWidth={1.8} />
      </div>
      <div className="about-stat-value" style={{ color }}>
        {count}{suffix}
      </div>
      <div className="about-stat-label">{label}</div>
    </motion.div>
  );
}

const STATS = [
  { icon: Code,      value: '10+',  label: 'Projects',     color: '#4F46E5' },
  { icon: Layers,    value: '15+',  label: 'Technologies',  color: '#0891B2' },
  { icon: GitBranch, value: '8+',   label: 'GitHub Repos',  color: '#059669' },
  { icon: Activity,  value: '500+', label: 'Commits',       color: '#D97706' },
];

const INTERESTS = [
  { icon: Terminal,   text: 'System Design'     },
  { icon: Heart,      text: 'Open Source'        },
  { icon: Briefcase,  text: 'Freelance Ready'    },
  { icon: MapPin,     text: 'Dharan, Nepal'      },
];

const fadeUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export default function About() {
  return (
    <section id="about">
      <div className="container">
        {/* Section header */}
        <div className="section-header">
          <span className="section-tag">About Me</span>
          <h2 className="section-title">
            Coding With <span className="gradient-text">Purpose</span>
          </h2>
          <p className="section-subtitle">
            Combining clean architecture with aesthetic web design
          </p>
        </div>

        {/* Main about card */}
        <motion.div
          className="about-card"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Top accent bar */}
          <div className="about-card-bar" />

          <div className="about-card-inner">
            {/* Left: avatar + quick facts */}
            <div className="about-profile">
              <div className="about-avatar">
                <div className="about-avatar-ring" />
                <span className="about-avatar-letter">M</span>
              </div>

              <h3 className="about-name">Manoj Katwal</h3>
              <span className="about-role">MERN Stack Developer</span>

              {/* Quick info pills */}
              <div className="about-quick-facts">
                {INTERESTS.map(({ icon: Icon, text }, i) => (
                  <div key={i} className="about-fact">
                    <Icon size={14} />
                    <span>{text}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <a href="#contact" className="btn btn-primary about-cta">
                Let&apos;s Work Together
              </a>
            </div>

            {/* Right: bio + quote */}
            <motion.div
              className="about-content"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
            >
              {/* Quote block */}
              <motion.blockquote className="about-quote" variants={fadeUp}>
                <span className="about-quote-mark">&ldquo;</span>
                I build things for the web that are fast, accessible, and beautiful — because code should serve people, not the other way around.
              </motion.blockquote>

              <motion.p className="about-text" variants={fadeUp}>
                I'm a passionate software engineer specializing in the JavaScript full-stack ecosystem.
                My focus is on building real-world applications using <strong>MongoDB</strong>, <strong>Express</strong>, <strong>React</strong>, and <strong>Node.js</strong> —
                from RESTful API design to interactive, performant client UIs.
              </motion.p>

              <motion.p className="about-text" variants={fadeUp}>
                I prioritize clean, readable code and thoughtful UX. Whether designing
                database schemas, wiring up Express routes, or crafting micro-interactions
                in React, I aim for solutions that are maintainable and delightful to use.
              </motion.p>

              <motion.p className="about-text" variants={fadeUp}>
                Outside of coding, I explore system-level concepts, join local workshops,
                and draft new project ideas that push my boundaries.
              </motion.p>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats row */}
        <div className="about-stats-row">
          {STATS.map((s, i) => (
            <StatCounter key={i} {...s} />
          ))}
        </div>
      </div>
    </section>
  );
}
