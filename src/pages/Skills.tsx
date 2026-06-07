// src/pages/Skills.tsx
import './Skills.css';
import '../styles/shared.css';

// CERT BADGE IMAGES — replace with your own imports:
// import oscpImg     from '../assets/images/cert-oscp.png';
// import cisspImg    from '../assets/images/cert-cissp.png';
// import secplusImg  from '../assets/images/cert-secplus.png';

interface SkillsProps {
  onNavigate: (page: string) => void;
}

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const OFFENSIVE_SKILLS = [
  { name: 'Metasploit Framework',  pct: 95 },
  { name: 'Burp Suite Professional', pct: 90 },
  { name: 'Nmap & Network Recon', pct: 88 },
  { name: 'Kali Linux Ecosystem', pct: 98 },
];

const DEFENSIVE_SKILLS = [
  { name: 'Wireshark Traffic Analysis', pct: 92 },
  { name: 'SIEM / ELK Stack',           pct: 85 },
  { name: 'SOC Operations',             pct: 80 },
  { name: 'Threat Hunting',             pct: 75 },
];

const OS_TILES = [
  { name: 'Windows Server', sub: 'Hardened Config'    },
  { name: 'Ubuntu / Linux', sub: 'Root-level Control' },
  { name: 'Arch Linux',     sub: 'Custom Kernel'      },
  { name: 'AWS / Azure Cloud', sub: 'IAM & VPC Security' },
];

const PROG_SKILLS = [
  { name: 'Python (Exploit Dev)',  filled: 4 },
  { name: 'Bash / PowerShell',     filled: 3 },
  { name: 'Go (Security Tooling)', filled: 2 },
  { name: 'Reverse Engineering',   filled: 2 },
];

const CERTS = [
  {
    alt: 'OSCP Badge',
    label: 'OSCP',
    labelClass: 'skills__cert-label--primary',
    glowClass: 'skills__cert-glow--primary',
    // img: oscpImg,
  },
  {
    alt: 'CISSP Badge',
    label: 'CISSP',
    labelClass: 'skills__cert-label--secondary',
    glowClass: 'skills__cert-glow--secondary',
    // img: cisspImg,
  },
  {
    alt: 'Security+ Badge',
    label: 'Security+',
    labelClass: 'skills__cert-label--primary',
    glowClass: 'skills__cert-glow--primary',
    // img: secplusImg,
  },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                      */
/* ------------------------------------------------------------------ */

function ScanLine({ delay = 0 }: { delay?: number }) {
  return (
    <div
      className="scanline"
      style={{ animationDelay: `${delay}s` }}
    />
  );
}

function BarSkillList({
  skills,
  pctClass,
}: {
  skills: { name: string; pct: number }[];
  pctClass: string;
}) {
  return (
    <div className="skills__bar-list">
      {skills.map((s) => (
        <div key={s.name} className="skills__bar-item">
          <div className="skills__bar-header">
            <span className="skills__bar-name">{s.name}</span>
            <span className={`skills__bar-pct ${pctClass}`}>{s.pct}%</span>
          </div>
          <div className="skills__bar-track">
            <div className="skills__bar-fill" style={{ width: `${s.pct}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}

function BlockBars({ filled, total = 5 }: { filled: number; total?: number }) {
  return (
    <div className="skills__prog-blocks">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`skills__prog-block ${
            i < filled ? 'skills__prog-block--filled' : 'skills__prog-block--empty'
          }`}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function Skills({ onNavigate }: SkillsProps) {
  return (
    <div className="skills">
      {/* Ambient dot grid */}
      <div className="skills__grid-overlay" />

      {/* ── Hero ─────────────────────────────────── */}
      <section className="skills__hero">
        <div className="skills__hero-glow" />
        <div className="skills__hero-inner">

          {/* Status pill */}
          <div className="skills__status-pill">
            <span className="skills__status-dot" />
            <span className="skills__status-text">
              System Status: Defensive/Offensive Calibrated
            </span>
          </div>

          <h1 className="skills__title">Technical Arsenal</h1>

          <p className="skills__subtitle">
            An advanced repertoire of offensive penetration testing capabilities balanced
            with deep-tier defensive security operations and infrastructure hardening.
          </p>

        </div>
      </section>

      {/* ── Certification Badges ─────────────────── */}
      <section className="skills__certs">
        <div className="glass-card skills__certs-card">
          {CERTS.map((cert, i) => (
            <div key={cert.label} style={{ display: 'contents' }}>
              {i > 0 && <div className="skills__cert-divider" />}
              <div className="skills__cert-badge">
                <div className="skills__cert-img-wrap">
                  <div className={`skills__cert-glow ${cert.glowClass}`} />
                  {/* REPLACE src with your own import, e.g.: src={cert.img} */}
                  <img
                    className="skills__cert-img"
                    alt={cert.alt}
                    src="/* YOUR_CERT_IMAGE_HERE */"
                    // src={cert.img}
                  />
                </div>
                <span className={`skills__cert-label ${cert.labelClass}`}>
                  {cert.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Main 2×2 Skills Grid ─────────────────── */}
      <main className="skills__main-grid">

        {/* ① Offensive Security */}
        <div className="glass-card skills__panel">
          <ScanLine delay={0} />
          <div className="skills__panel-header">
            <span
              className="material-symbols-outlined skills__panel-icon skills__panel-icon--primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              security_update_warning
            </span>
            <h3 className="skills__panel-title skills__panel-title--primary">
              Offensive Security
            </h3>
          </div>
          <BarSkillList skills={OFFENSIVE_SKILLS} pctClass="skills__bar-pct--primary" />
        </div>

        {/* ② Defensive Security */}
        <div className="glass-card skills__panel">
          <ScanLine delay={1} />
          <div className="skills__panel-header">
            <span
              className="material-symbols-outlined skills__panel-icon skills__panel-icon--secondary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              enhanced_encryption
            </span>
            <h3 className="skills__panel-title skills__panel-title--secondary">
              Defensive Security
            </h3>
          </div>
          <BarSkillList skills={DEFENSIVE_SKILLS} pctClass="skills__bar-pct--secondary" />
        </div>

        {/* ③ Infrastructure & OS */}
        <div className="glass-card skills__panel">
          <ScanLine delay={2} />
          <div className="skills__panel-header">
            <span
              className="material-symbols-outlined skills__panel-icon skills__panel-icon--primary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              dns
            </span>
            <h3 className="skills__panel-title skills__panel-title--primary">
              Infrastructure &amp; OS
            </h3>
          </div>
          <div className="skills__os-grid">
            {OS_TILES.map((t) => (
              <div key={t.name} className="skills__os-tile">
                <span className="skills__os-name">{t.name}</span>
                <span className="skills__os-sub">{t.sub}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ④ Programming & Automation */}
        <div className="glass-card skills__panel">
          <ScanLine delay={3} />
          <div className="skills__panel-header">
            <span
              className="material-symbols-outlined skills__panel-icon skills__panel-icon--secondary"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              terminal
            </span>
            <h3 className="skills__panel-title skills__panel-title--secondary">
              Programming
            </h3>
          </div>
          <div className="skills__prog-list">
            {PROG_SKILLS.map((p) => (
              <div key={p.name} className="skills__prog-item">
                <span className="skills__prog-name">{p.name}</span>
                <BlockBars filled={p.filled} />
              </div>
            ))}
          </div>
        </div>

      </main>

      {/* ── Footer (page-specific tagline) ───────── */}
      <footer className="skills__footer">
        <div className="skills__footer-inner">
          <div>
            <div className="skills__footer-copy">
              © 2024 DHRUVA // Encrypted Connection Established
            </div>
            <p className="skills__footer-tagline">
              Securing the digital frontier through relentless persistence and
              architectural fortification.
            </p>
          </div>
          <div className="skills__footer-links">
            <a className="skills__footer-link" href="#" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a className="skills__footer-link" href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="skills__footer-link" href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span
              className="skills__footer-link"
              onClick={() => onNavigate('resume')}
            >
              Certifications
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
