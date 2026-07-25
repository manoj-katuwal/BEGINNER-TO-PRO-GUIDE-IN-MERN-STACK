import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const PROJECTS = [
  {
    abbr:     'RS',
    category: 'Web App',
    title:    'Rojgar Setu',
    desc:     'A job search engine portal connecting job seekers with employment gateways across Nepal.',
    tags:     ['JSP', 'Servlet', 'MySQL', 'JDBC'],
    github:   'https://github.com/manojctrl/Rojgar-Setu',
    live:     'https://github.com/manojctrl/Rojgar-Setu',
  },
  {
    abbr:     'GMS',
    category: 'Desktop App',
    title:    'Gym Management System',
    desc:     'A desktop application managing gym memberships, billing, logs, and member attendance.',
    tags:     ['Java Swing', 'OOP', 'Local DB'],
    github:   'https://github.com/manojctrl/Gym-Management-System',
    live:     'https://github.com/manojctrl/Gym-Management-System/releases',
  },
  {
    abbr:     'EMS',
    category: 'Web App',
    title:    'Employee Management System',
    desc:     'Internal employee directory tracker managing attendance, tasks, and corporate logs.',
    tags:     ['React', 'LocalStorage', 'Hooks'],
    github:   'https://github.com/manojctrl/Employee-Management-System',
    live:     'https://employee-management-nepal.netlify.app',
  },
  {
    abbr:     'TAD',
    category: 'Dashboard',
    title:    'Travel Agency Dashboard',
    desc:     'Admin control console managing booking stats, travel inventory, and analytics.',
    tags:     ['React', 'CSS Vars', 'Chart Hooks'],
    github:   'https://github.com/manojctrl/Travel-Agency-Admin-Dashboard',
    live:     'https://travel-admin-dashboard.vercel.app',
  },
  {
    abbr:     'WCI',
    category: 'Backend System',
    title:    'WeCare Inventory',
    desc:     'Supply analytics dashboard managing product nodes, stock limits, and order pipelines.',
    tags:     ['Python', 'SQL', 'Data Logs'],
    github:   'https://github.com/manojctrl/WeCare-Inventory-Management-System',
    live:     'https://github.com/manojctrl/WeCare-Inventory-Management-System',
  },
];

const cardVariants = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <div className="section-header">
          <span className="section-tag">Portfolio</span>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            Real-world applications built from database design to polished UI
          </p>
        </div>

        <motion.div
          className="projects-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {PROJECTS.map((p, i) => (
            <motion.article key={i} className="project-card" variants={cardVariants}>
              {/* Visual header with hover zoom */}
              <div className="project-media">
                <div className="project-media-bg">
                  <div className="project-glow" />
                </div>
                <span className="project-abbr">{p.abbr}</span>
                {/* Hover overlay */}
                <div className="project-overlay">
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-overlay-btn"
                    aria-label={`View ${p.title} live demo`}
                  >
                    View Project ↗
                  </a>
                </div>
              </div>

              {/* Card content */}
              <div className="project-body">
                <span className="project-category">{p.category}</span>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tags">
                  {p.tags.map((tag, ti) => (
                    <span key={ti} className="project-tag">{tag}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    aria-label={`${p.title} GitHub source`}
                  >
                    <GithubIcon size={15} /> Source
                  </a>
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                    aria-label={`${p.title} live demo`}
                  >
                    <ExternalLink size={15} /> Live Demo
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}