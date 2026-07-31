import { motion } from 'framer-motion';
import { Monitor, Server, Database, Wrench, CheckCircle2 } from 'lucide-react';

const CATEGORIES = [
  {
    title: 'Frontend',
    icon: Monitor,
    color: '#4F46E5',
    darkColor: '#818CF8',
    desc: 'Building fast, responsive UIs',
    pills: ['React.js', 'JavaScript (ES6+)', 'HTML5', 'CSS3', 'Bootstrap', 'Responsive Design'],
  },
  {
    title: 'Backend',
    icon: Server,
    color: '#0891B2',
    darkColor: '#22D3EE',
    desc: 'Scalable APIs & server logic',
    pills: ['Node.js', 'Express.js', 'REST APIs', 'JWT Auth', 'Servlets & JSP'],
  },
  {
    title: 'Database',
    icon: Database,
    color: '#059669',
    darkColor: '#34D399',
    desc: 'Data modeling & persistence',
    pills: ['MongoDB', 'Mongoose', 'MySQL', 'PostgreSQL'],
  },
  {
    title: 'Tools & DevOps',
    icon: Wrench,
    color: '#D97706',
    darkColor: '#FBBF24',
    desc: 'Dev workflow & deployment',
    pills: ['Git', 'GitHub', 'VS Code', 'Postman', 'Docker', 'npm'],
  },
];

// Overall tech stack highlight row
const HIGHLIGHTS = [
  { label: 'MongoDB',    short: 'M' },
  { label: 'Express.js', short: 'E' },
  { label: 'React.js',   short: 'R' },
  { label: 'Node.js',    short: 'N' },
];

const cardVariants = {
  hidden:  { opacity: 0, y: 36 },
  visible: (i) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <span className="section-tag">Expertise</span>
          <h2 className="section-title">
            Skills &amp; <span className="gradient-text">Technologies</span>
          </h2>
          <p className="section-subtitle">
            My full-stack toolbox — from pixel-perfect UIs to production-grade APIs
          </p>
        </div>

        {/* MERN highlight strip */}
        <motion.div
          className="mern-strip"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="mern-strip-label">Core Stack —</span>
          <div className="mern-badges">
            {HIGHLIGHTS.map(({ label, short }) => (
              <div key={label} className="mern-badge">
                <span className="mern-badge-letter">{short}</span>
                <span className="mern-badge-name">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Skill Cards */}
        <div className="skills-grid-new">
          {CATEGORIES.map(({ title, icon: Icon, color, darkColor, desc, pills }, i) => (
            <motion.div
              key={i}
              className="skill-card-new"
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-40px' }}
            >
              {/* Card top accent bar */}
              <div
                className="skill-card-bar"
                style={{ '--card-color': color, '--card-color-dark': darkColor }}
              />

              <div className="skill-card-inner">
                {/* Icon + Title */}
                <div className="skill-card-head">
                  <div
                    className="skill-card-icon"
                    style={{ '--card-color': color, '--card-color-dark': darkColor }}
                  >
                    <Icon size={22} strokeWidth={1.8} />
                  </div>
                  <div>
                    <h3 className="skill-card-title">{title}</h3>
                    <p className="skill-card-desc">{desc}</p>
                  </div>
                </div>

                {/* Pill list */}
                <div className="skill-pill-list">
                  {pills.map((p, j) => (
                    <motion.div
                      key={j}
                      className="skill-pill-row"
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: j * 0.06 + 0.2 }}
                    >
                      <CheckCircle2 size={14} className="skill-pill-check"
                        style={{ '--card-color': color, '--card-color-dark': darkColor }} />
                      <span className="skill-pill-label">{p}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}