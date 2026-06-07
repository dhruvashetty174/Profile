// src/pages/Projects.tsx
import { useState } from 'react';
import './Projects.css';
import '../styles/shared.css';

// IMAGES — replace with your own imports:
// import featuredImg from '../assets/images/project-featured.png';

const FILTERS = ['All', 'Red Team', 'Blue Team', 'Research', 'Tools'];

const PROJECTS = [
  {
    id: '001',
    icon: 'network_check',
    title: 'Network Scanning & Threat Detection using Nmap and Splunk',
    desc: 'Performed network reconnaissance, threat detection, traffic analysis, and automated vulnerability reporting using Nmap, Splunk, Wireshark, and Python.',
    category: 'Blue Team',
    avatarIcons: ['monitoring', 'bug_report'],
  },
  {
    id: '002',
    icon: 'folder_managed',
    title: 'Secure File Upload & Public Download System',
    desc: 'Developed a secure file-sharing platform with authentication, authorization, API security testing, and secure file validation mechanisms.',
    category: 'Tools',
    avatarIcons: ['lock', 'cloud_upload'],
  },
  {
    id: '003',
    icon: 'web_asset',
    title: 'Web Application Security Assessment Lab',
    desc: 'Performed vulnerability assessment and penetration testing on web applications using Burp Suite and Kali Linux in a controlled environment.',
    category: 'Red Team',
    avatarIcons: ['security', 'terminal'],
  },
  {
    id: '004',
    icon: 'developer_board',
    title: 'VAPT Home Lab Setup & Security Testing',
    desc: 'Built a virtual penetration testing lab using Kali Linux, VirtualBox, Nmap, and Wireshark for vulnerability assessment and security testing.',
    category: 'Research',
    avatarIcons: ['dns', 'lan'],
  },
];

interface ProjectsProps {
  onNavigate: (page: string) => void;
}

export default function Projects({ onNavigate }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <main className="projects">
      <div className="projects__bg-grid cyber-grid" />

      {/* ── Page Header ──────────────────────────── */}
      <header className="projects__header">
        <div className="projects__header-inner">
          <div className="projects__header-left">
            <div className="projects__eyebrow">
              <span className="projects__eyebrow-dot" />
              <span className="code-sm">MISSION_LOG // ACTIVE_DEPLOYMENTS</span>
            </div>
            <h1 className="headline-xl" style={{ color: 'var(--color-on-surface)' }}>
              Security{' '}
              <span style={{ color: 'var(--color-primary-container)' }} className="neon-glow-primary">
                Projects
              </span>
            </h1>
          </div>
          <div className="projects__header-meta">
            <span>// TOTAL_PROJECTS: {PROJECTS.length}</span>
            <span>// STATUS: CLASSIFIED</span>
            <span>// CLEARANCE: ALPHA</span>
          </div>
        </div>
      </header>

      {/* ── Filters ──────────────────────────────── */}
      <div className="projects__filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`projects__filter-btn ${activeFilter === f ? 'projects__filter-btn--active' : ''}`}
            onClick={() => setActiveFilter(f)}
          >
            {f}
          </button>
        ))}
      </div>

      {/* ── Featured Project ─────────────────────── */}
      <section className="projects__featured">
        <div className="projects__featured-eyebrow">
          <span className="material-symbols-outlined" style={{ color: 'var(--color-primary)', fontVariationSettings: "'FILL' 1" }}>
            star
          </span>
          <span className="label-caps" style={{ color: 'var(--color-primary)' }}>Featured Deployment</span>
        </div>

        <div className="glass-card projects__featured-card">
          {/* Image */}
          <div className="projects__featured-image-wrap">
            {/* REPLACE src with your own import, e.g.: src={featuredImg} */}
            <img
              className="projects__featured-img"
              alt="Enterprise Vulnerability Assessment Dashboard"
              src="/* YOUR_IMAGE_HERE */"
              // src={featuredImg}
            />
            <div className="projects__featured-overlay" />
            <div className="projects__featured-badge">
              <span className="tag tag--primary">CRITICAL_ASSET</span>
            </div>
          </div>

          {/* Content */}
          <div className="projects__featured-content">
            <div className="projects__featured-status">
              <span className="projects__featured-status-dot animate-pulse" />
              ACTIVE_MISSION
            </div>
            <h3 className="headline-lg projects__featured-title">
              Enterprise Vulnerability Assessment
            </h3>
            <p className="body-md projects__featured-desc">
              A comprehensive security audit framework designed for Fortune 500 infrastructure.
              Integrated automated red-teaming scripts, real-time lateral movement detection, and
              a proprietary scoring algorithm to identify critical zero-day vectors before exploitation.
            </p>
            <div className="projects__tech-tags">
              {['Nessus API', 'Python-C2', 'Docker-Swarm'].map((tech) => (
                <span key={tech} className="projects__tech-tag">{tech}</span>
              ))}
            </div>
            <button className="btn-outline" style={{ alignSelf: 'flex-start' }}>
              Initialize Analysis
              <span className="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>
      </section>

      {/* ── Projects Grid ────────────────────────── */}
      <section className="projects__grid-section">
        <div className="projects__grid">
          {filtered.map((project) => (
            <div key={project.id} className="glass-card project-card">
              <div className="project-card__left-accent" />
              <div className="project-card__header">
                <span className="material-symbols-outlined project-card__icon">{project.icon}</span>
                <span className="project-card__num">{project.id}</span>
              </div>
              <h4 className="project-card__title">{project.title}</h4>
              <p className="project-card__desc">{project.desc}</p>
              <div className="project-card__footer">
                <div className="project-card__avatars">
                  {project.avatarIcons.map((icon) => (
                    <div key={icon} className="project-card__avatar">
                      <span className="material-symbols-outlined">{icon}</span>
                    </div>
                  ))}
                </div>
                <button className="project-card__cta">
                  View_Details
                  <span className="material-symbols-outlined">open_in_new</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
