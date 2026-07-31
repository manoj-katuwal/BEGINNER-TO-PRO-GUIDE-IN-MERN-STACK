import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Award, Code2, Rocket } from 'lucide-react';

const MILESTONES = [
  {
    year: '2026',
    icon: Cpu,
    badge: 'Now',
    badgeColor: '#4F46E5',
    title: 'Advanced MERN Stack & UI Engineering',
    subtitle: 'Full-Stack Telemetry Phase',
    desc: 'Building state-of-the-art interactive interfaces and high-performance REST API architectures with React 19, Node.js, and MongoDB. Specializing in component design systems, auth flows, and performance optimization.',
    tags: ['React 19', 'Node.js', 'MongoDB', 'Express.js', 'Framer Motion'],
    metrics: [
      { label: 'Projects', value: '10+' },
      { label: 'Stack',    value: 'MERN'  },
    ],
  },
  {
    year: '2025',
    icon: Award,
    badge: 'Deployed',
    badgeColor: '#0891B2',
    title: 'Full-Stack Projects & Deployment',
    subtitle: 'Production Launch Phase',
    desc: 'Engineered and launched Rojgar Setu — a full-stack job discovery portal connecting seekers and employers across Nepal. Built desktop management tools handling memberships, transactions, and data logs.',
    tags: ['JSP / Servlets', 'Java Swing', 'JDBC', 'MySQL'],
    metrics: [
      { label: 'Launched', value: '3 Apps' },
      { label: 'Backend',  value: 'Java'   },
    ],
  },
  {
    year: '2024',
    icon: Code2,
    badge: 'Built',
    badgeColor: '#059669',
    title: 'JavaScript Logic & Data Architecture',
    subtitle: 'Core Foundations',
    desc: 'Mastered JavaScript async programming, REST API design patterns, schema normalization, and built client tracking applications like Employee Management Dashboard using React Hooks.',
    tags: ['JavaScript ES6+', 'Data Structures', 'SQL', 'React Hooks'],
    metrics: [
      { label: 'Language', value: 'JS/TS'  },
      { label: 'DB',       value: 'SQL'    },
    ],
  },
  {
    year: '2023',
    icon: Rocket,
    badge: 'Start',
    badgeColor: '#D97706',
    title: 'First Compilation & Discovery',
    subtitle: 'The Beginning',
    desc: 'Started the software engineering journey in Dharan, Nepal. Learned HTML, CSS, JavaScript fundamentals, and built first web layouts. Fell in love with building things on the web.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'Shell Scripts'],
    metrics: [
      { label: 'Location', value: 'Dharan' },
      { label: 'Year',     value: '2023'   },
    ],
  },
];

export default function Journey() {
  const [active, setActive] = useState(0);
  const m = MILESTONES[active];
  const Icon = m.icon;

  return (
    <section id="journey">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Timeline</span>
          <h2 className="section-title">
            My Professional <span className="gradient-text">Journey</span>
          </h2>
          <p className="section-subtitle">
            Key milestones in my evolution as a software engineer
          </p>
        </div>

        {/* ── Tab selector ── */}
        <div className="journey-tabs">
          {MILESTONES.map((ms, i) => {
            const TabIcon = ms.icon;
            const isActive = i === active;
            return (
              <button
                key={i}
                className={`journey-tab ${isActive ? 'journey-tab-active' : ''}`}
                onClick={() => setActive(i)}
                aria-pressed={isActive}
                aria-label={`View milestone: ${ms.year}`}
              >
                {isActive && (
                  <motion.div
                    className="journey-tab-bg"
                    layoutId="journey-tab-bg"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
                <span className="journey-tab-icon">
                  <TabIcon size={16} />
                </span>
                <span className="journey-tab-year">{ms.year}</span>
                <span className="journey-tab-badge"
                  style={{ background: ms.badgeColor + '22', color: ms.badgeColor }}>
                  {ms.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Detail panel ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="journey-panel"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          >
            {/* Header row */}
            <div className="journey-panel-head">
              <div
                className="journey-panel-icon"
                style={{ '--j-color': m.badgeColor }}
              >
                <Icon size={26} strokeWidth={1.8} />
              </div>

              <div className="journey-panel-title-block">
                <div className="journey-panel-meta">
                  <span className="journey-panel-year">{m.year}</span>
                  <span className="journey-panel-badge"
                    style={{ background: m.badgeColor + '20', color: m.badgeColor }}>
                    {m.badge}
                  </span>
                </div>
                <h3 className="journey-panel-title">{m.title}</h3>
                <p className="journey-panel-subtitle">{m.subtitle}</p>
              </div>

              {/* Metrics */}
              <div className="journey-metrics">
                {m.metrics.map(({ label, value }, i) => (
                  <div key={i} className="journey-metric">
                    <span className="journey-metric-value"
                      style={{ color: m.badgeColor }}>{value}</span>
                    <span className="journey-metric-label">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Description */}
            <p className="journey-panel-desc">{m.desc}</p>

            {/* Tags */}
            <div className="journey-panel-tags">
              {m.tags.map((tag, i) => (
                <span key={i} className="journey-panel-tag"
                  style={{ borderColor: m.badgeColor + '44', color: m.badgeColor }}>
                  {tag}
                </span>
              ))}
            </div>

            {/* Progress dots */}
            <div className="journey-progress">
              {MILESTONES.map((_, i) => (
                <button
                  key={i}
                  className={`journey-progress-dot ${i === active ? 'journey-progress-dot-active' : ''}`}
                  onClick={() => setActive(i)}
                  aria-label={`Go to milestone ${i + 1}`}
                  style={i === active ? { background: m.badgeColor } : {}}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
