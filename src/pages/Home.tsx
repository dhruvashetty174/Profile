// src/pages/Home.tsx
import { useEffect, useRef } from 'react';
import './Home.css';
import '../styles/shared.css';

// IMAGES — replace with your own imports:
// import heroImg from '../assets/images/hero-portrait.png';
// import logoImg from '../assets/images/dhruva-logo.png';

interface HomeProps {
  onNavigate: (page: string) => void;
}

const STATS = [
  {
    icon: 'security_update_warning',
    iconClass: 'home__stat-icon--primary',
    code: 'ERR_0x001',
    codeClass: 'home__stat-code--primary',
    number: '50+',
    numberClass: 'home__stat-number--primary',
    label: 'Vulnerabilities Found',
    barWidth: '85%',
    barGradient: 'linear-gradient(to right, var(--color-primary), var(--color-secondary))',
  },
  {
    icon: 'verified_user',
    iconClass: 'home__stat-icon--secondary',
    code: 'CERT_VALID',
    codeClass: 'home__stat-code--secondary',
    number: '10+',
    numberClass: 'home__stat-number--secondary',
    label: 'Global Certifications',
    barWidth: '70%',
    barGradient: 'linear-gradient(to right, var(--color-secondary), var(--color-primary))',
  },
  {
    icon: 'history_edu',
    iconClass: 'home__stat-icon--tertiary',
    code: 'LOG_ENTRY_YRS',
    codeClass: 'home__stat-code--tertiary',
    number: '5',
    numberClass: 'home__stat-number--default',
    label: 'Years Experience',
    barWidth: '95%',
    barGradient: 'linear-gradient(to right, var(--color-primary-container), var(--color-secondary))',
  },
];

const SKILLS = [
  {
    icon: 'biotech',
    name: 'Penetration Testing',
    desc: 'Simulating advanced persistent threats to identify systemic weaknesses.',
  },
  {
    icon: 'hub',
    name: 'Network Security',
    desc: 'Designing segmented architectures with high-fidelity traffic analysis.',
  },
  {
    icon: 'bug_report',
    name: 'Malware Analysis',
    desc: 'Reverse engineering malicious binaries to develop robust IOCs.',
  },
  {
    icon: 'cloud_done',
    name: 'Cloud Defense',
    desc: 'Securing multi-cloud environments via infrastructure as code.',
  },
];

export default function Home({ onNavigate }: HomeProps) {
  const glowTlRef = useRef<HTMLDivElement>(null);
  const glowBrRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLSpanElement>(null);

  // Subtle mouse-parallax on glow blobs
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const speed1 = 0.02;
      const speed2 = 0.04;
      const x1 = (window.innerWidth - e.clientX * speed1) / 100;
      const y1 = (window.innerHeight - e.clientY * speed1) / 100;
      const x2 = (window.innerWidth - e.clientX * speed2) / 100;
      const y2 = (window.innerHeight - e.clientY * speed2) / 100;
      if (glowTlRef.current) glowTlRef.current.style.transform = `translate(${x1}px, ${y1}px)`;
      if (glowBrRef.current) glowBrRef.current.style.transform = `translate(${x2}px, ${y2}px)`;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Typing effect for status text
  useEffect(() => {
    const el = statusRef.current;
    if (!el) return;
    const text = 'System Status: Secure';
    el.textContent = '';
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) {
        el.textContent += text[i];
        i++;
      } else {
        clearInterval(timer);
      }
    }, 80);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="home">
      {/* Ambient backgrounds */}
      <div className="home__bg-grid cyber-grid" />
      <div className="home__glow-tl" ref={glowTlRef} />
      <div className="home__glow-br" ref={glowBrRef} />

      {/* ── Hero ─────────────────────────────────── */}
      <section className="home__hero">
        <div className="home__hero-grid">

          {/* Text */}
          <div className="home__hero-text">
            <div className="status-pill">
              <span className="status-pill__dot" />
              <span className="code-sm" style={{ color: 'var(--color-primary)', letterSpacing: '0.1em' }}>
                <span ref={statusRef} />
              </span>
            </div>

            <h1 className="headline-xl home__hero-title">
              Engineering{' '}
              <span className="neon-glow-primary">Fortified</span>{' '}
              Digital Ecosystems.
            </h1>

            <p className="body-lg home__hero-subtitle">
              I am <strong>Dhruva</strong>, a Cyber Security Engineer specializing in threat
              intelligence, vulnerability research, and building resilient defensive architectures.
            </p>

            <div className="home__hero-actions">
              <button className="btn-primary" onClick={() => onNavigate('projects')}>
                View Projects
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <button className="btn-outline" onClick={() => onNavigate('resume')}>
                <span className="material-symbols-outlined">download</span>
                Download Resume
              </button>
            </div>
          </div>

          {/* Image */}
          <div className="home__hero-image-wrap">
            <div className="home__hero-image-glow" />
            <div className="home__hero-image-card glass-card">
              <div className="scanline" />
              {/* REPLACE the src below with your own import, e.g.: src={heroImg} */}
              <img
                className="home__hero-img"
                alt="Dhruva - Cybersecurity Engineer"
                src="/src/assets/dhruva.jpg"
                // src={heroImg}
              />
              <div className="home__hero-badge-tl code-sm">TRACE_ID: 882-99-ALPHA</div>
              <div className="home__hero-badge-br code-sm">
                <span className="home__hero-badge-ping animate-ping" />
                Encrypted Portrait
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Stats ────────────────────────────────── */}
      <section className="home__stats">
        <div className="home__stats-grid">
          {STATS.map((stat) => (
            <div key={stat.label} className="home__stat-card glass-card">
              <div className="home__stat-card-header">
                <span className={`material-symbols-outlined home__stat-icon ${stat.iconClass}`}>
                  {stat.icon}
                </span>
                <span className={`home__stat-code ${stat.codeClass}`}>{stat.code}</span>
              </div>
              <div className="home__stat-body">
                <span className={`home__stat-number ${stat.numberClass}`}>{stat.number}</span>
                <p className="home__stat-label">{stat.label}</p>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-bar__fill"
                  style={{ width: stat.barWidth, background: stat.barGradient }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Expertise ────────────────────────────── */}
      <section className="home__expertise">
        <div className="home__expertise-inner">
          <div className="home__expertise-header">
            <div className="home__expertise-title-group">
              <p className="home__expertise-eyebrow">Core Competencies</p>
              <h2 className="headline-lg" style={{ color: 'var(--color-on-surface)' }}>
                Architecting defense against modern threat vectors with precision.
              </h2>
            </div>
            <div className="home__expertise-comment">
              // SEC_ENG_MANIFESTO<br />
              // CONTINUOUS_MONITORING: TRUE<br />
              // ZERO_TRUST: ENFORCED
            </div>
          </div>

          <div className="home__skills-grid">
            {SKILLS.map((skill) => (
              <div key={skill.name} className="home__skill-card">
                <span className={`material-symbols-outlined home__skill-icon`}>{skill.icon}</span>
                <h4 className="home__skill-name">{skill.name}</h4>
                <p className="home__skill-desc">{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────── */}
      <section className="home__cta">
        <div className="home__cta-inner">
          <div className="home__cta-card glass-card">
            <div className="home__cta-top-line" />
            <span className="material-symbols-outlined home__cta-icon">policy</span>
            <h2 className="headline-xl home__cta-title">Ready to secure your digital future?</h2>
            <p className="body-lg home__cta-subtitle">
              Accepting new security consultation projects and full-time engagements in the
              defensive operations space.
            </p>
            <button className="btn-white" onClick={() => onNavigate('contact')}>
              Initiate Connection
            </button>
            <div className="home__cta-status animate-pulse">ENCRYPTED LINE READY...</div>
          </div>
        </div>
      </section>
    </main>
  );
}
