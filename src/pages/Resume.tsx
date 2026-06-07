// src/pages/Resume.tsx
import './Resume.css';
import '../styles/shared.css';

const SKILLS = [
  { name: 'Vulnerability Assessment & VAPT', pct: 85 },
  { name: 'Python / Bash / JavaScript',      pct: 80 },
  { name: 'Web Application Security',        pct: 78 },
  { name: 'Network Scanning & Analysis',     pct: 82 },
];

const CERTS = [
  { icon: 'verified_user', name: 'VAPT Course',     org: 'Sharyians School', badge: 'VAPT'    },
  { icon: 'cloud',         name: 'Cloud Computing', org: 'Wipfli',           badge: 'CLOUD'   },
  { icon: 'handyman',      name: 'Flutter Workshop', org: 'Workshop',        badge: 'FLUTTER' },
];

const PROJECTS = [
  {
    title: 'Network Scanning & Threat Detection',
    date: 'May 2026',
    stack: 'Nmap · Splunk · Python · Linux',
    active: true,
    bullets: [
      'Performed TCP SYN, service/version, and OS detection scans to identify exposed ports and vulnerabilities.',
      'Analyzed network traffic and suspicious communication patterns using Wireshark.',
      'Automated scan result analysis and reporting using Python scripts.',
      'Documented identified risks and recommended mitigation measures.',
    ],
  },
  {
    title: 'Secure File Upload & Public Download System',
    date: 'Dec 2025',
    stack: 'React.js · Express.js · MongoDB',
    active: false,
    bullets: [
      'Built a secure file-sharing platform with controlled public access, authentication, and authorization.',
      'Performed security assessments on REST APIs to identify and mitigate unauthorized access risks.',
      'Implemented secure file upload validation, access-control checks, and backend security measures.',
      'Applied secure coding practices to protect sensitive file metadata and user interactions.',
    ],
  },
  {
    title: 'Web Application Security Assessment Lab',
    date: 'Jan 2026',
    stack: 'Burp Suite · Kali Linux · Python',
    active: false,
    bullets: [
      'Performed vulnerability assessment and basic penetration testing on web applications in a lab environment.',
      'Identified common vulnerabilities including insecure authentication and input validation flaws.',
      'Used Burp Suite for request interception, traffic analysis, and API security testing.',
      'Documented findings with vulnerability descriptions, risk impact, and remediation recommendations.',
    ],
  },
  {
    title: 'VAPT Home Lab Setup & Security Testing',
    date: 'May 2025',
    stack: 'Kali Linux · Python · Nmap · Wireshark · VirtualBox',
    active: false,
    bullets: [
      'Built a virtual penetration testing lab to practice vulnerability assessment and network security testing.',
      'Conducted reconnaissance, port scanning, and traffic analysis using Nmap and Wireshark.',
      'Developed Python scripts for scan automation, log analysis, and basic security testing tasks.',
    ],
  },
];

const TOOLS = [
  'Nmap', 'Wireshark', 'Burp Suite', 'Metasploit',
  'Kali Linux', 'Splunk', 'OWASP TOP 10',
  'React.js', 'Node.js', 'MongoDB',
];

interface ResumeProps {
  onNavigate: (page: string) => void;
}

export default function Resume({ onNavigate }: ResumeProps) {
  return (
    <main className="resume">
      <div className="resume__bg-glow-tl" />
      <div className="resume__bg-glow-br" />

      {/* ── Header ───────────────────────────────── */}
      <header className="resume__header">
        <div className="resume__header-inner">
          <div className="status-pill" style={{ marginBottom: 16 }}>
            <span className="status-pill__dot" />
            <span
              className="code-sm"
              style={{ color: 'var(--color-primary)', letterSpacing: '0.1em' }}
            >
              DHRUVA.OS // CURRICULUM_VITAE
            </span>
          </div>

          <h1 className="headline-xl resume__name">
            Dhruva <span>Shetty</span>
          </h1>

          <p className="resume__tagline">
            // MCA_STUDENT // SPECIALIZATION: VAPT_&_CYBERSECURITY // NMAMIT_NITTE
          </p>

          <div className="resume__header-actions">
            <a
              className="btn-primary"
              href="/src/assets/resume.pdf"
              download="Dhruva_Resume.pdf"
              style={{
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span className="material-symbols-outlined">download</span>
              Download PDF
            </a>

            <button
              className="btn-outline"
              onClick={() => onNavigate('contact')}
            >
              <span className="material-symbols-outlined">mail</span>
              Contact Me
            </button>
          </div>
        </div>
      </header>

      {/* ── Bento Grid ───────────────────────────── */}
      <div className="resume__grid">

        {/* ── Left column ── */}
        <div className="resume__left">

          {/* Projects */}
          <div className="glass-card resume__section-card">
            <div className="scanline" />
            <div className="resume__section-heading">
              <span className="material-symbols-outlined resume__section-icon">terminal</span>
              <h2 className="resume__section-title">Projects</h2>
            </div>

            <div className="resume__timeline">
              {PROJECTS.map((project) => (
                <div key={project.title} className="resume__role">
                  <div
                    className={`resume__role-dot ${
                      project.active
                        ? 'resume__role-dot--active'
                        : 'resume__role-dot--past'
                    }`}
                  />
                  <div className="resume__role-header">
                    <span className="resume__role-title">{project.title}</span>
                    <span
                      className={`resume__role-date ${
                        project.active
                          ? 'resume__role-date--active'
                          : 'resume__role-date--past'
                      }`}
                    >
                      {project.date}
                    </span>
                  </div>
                  <div
                    className={`resume__role-company ${
                      project.active
                        ? 'resume__role-company--active'
                        : 'resume__role-company--past'
                    }`}
                  >
                    {project.stack}
                  </div>
                  <ul className="resume__role-bullets">
                    {project.bullets.map((b) => (
                      <li key={b} className="resume__role-bullet">
                        <span className="resume__role-bullet-marker">_</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="glass-card resume__section-card">
            <div className="resume__section-heading">
              <span className="material-symbols-outlined resume__section-icon">school</span>
              <h2 className="resume__section-title">Education</h2>
            </div>
            <div className="resume__education-grid">
              <div>
                <div className="resume__edu-title">Masters of Computer Application</div>
                <div className="resume__edu-school">NMAMIT Nitte // 2024–Present</div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--color-secondary)',
                  marginTop: 4,
                }}>
                  CGPA: 8.57
                </div>
              </div>
              <div>
                <div className="resume__edu-title">Bachelor of Computer Application</div>
                <div className="resume__edu-school">NMAMIT Nitte // 2021–2024</div>
                <div style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  color: 'var(--color-on-surface-variant)',
                  marginTop: 4,
                }}>
                  CGPA: 7.97
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── Right column ── */}
        <div className="resume__right">

          {/* Profile Summary */}
          <div className="glass-card resume__section-card">
            <div className="resume__section-heading">
              <span className="material-symbols-outlined resume__section-icon">person</span>
              <h2 className="resume__section-title">Profile</h2>
            </div>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-body-md)',
              color: 'var(--color-on-surface-variant)',
              lineHeight: 1.7,
            }}>
              MCA student (2026) with strong foundations in cybersecurity, networking,
              and vulnerability assessment. Hands-on experience with Nmap, Wireshark,
              Burp Suite, Kali Linux, and Splunk. Passionate about VAPT, ethical hacking,
              and improving system security through proactive testing and defensive
              security practices.
            </p>
          </div>

          {/* Tech Stack */}
          <div className="glass-card resume__section-card">
            <div className="resume__section-heading">
              <span className="material-symbols-outlined resume__section-icon">code</span>
              <h2 className="resume__section-title">Tech Stack</h2>
            </div>
            <div className="resume__skill-list">
              {SKILLS.map((skill) => (
                <div key={skill.name}>
                  <div className="resume__skill-header">
                    <span className="resume__skill-name">{skill.name}</span>
                    <span className="resume__skill-pct">{skill.pct}%</span>
                  </div>
                  <div className="resume__skill-bar">
                    <div
                      className="resume__skill-fill"
                      style={{ width: `${skill.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Tool tags */}
            <div style={{
              marginTop: 24,
              display: 'flex',
              flexWrap: 'wrap',
              gap: 8,
            }}>
              {TOOLS.map((tool) => (
                <span key={tool} className="tag tag--outline">{tool}</span>
              ))}
            </div>
          </div>

          {/* Certifications */}
          <div className="glass-card resume__section-card">
            <div className="resume__section-heading">
              <span className="material-symbols-outlined resume__section-icon">
                workspace_premium
              </span>
              <h2 className="resume__section-title">Certifications</h2>
            </div>
            <div className="resume__cert-list">
              {CERTS.map((cert) => (
                <div key={cert.badge} className="resume__cert">
                  <span className="material-symbols-outlined resume__cert-icon">
                    {cert.icon}
                  </span>
                  <div className="resume__cert-info">
                    <div className="resume__cert-name">{cert.name}</div>
                    <div className="resume__cert-org">{cert.org}</div>
                  </div>
                  <span className="resume__cert-badge">{cert.badge}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── CTA Banner ───────────────────────────── */}
      <div className="resume__cta">
        <div className="glass-card resume__cta-card">
          <div className="resume__cta-top-line" />
          <div>
            <div className="resume__cta-title">
              Open to Internships &amp; Opportunities
            </div>
            <div className="resume__cta-sub">
              Available for security internships, VAPT roles, and cybersecurity collaborations.
            </div>
          </div>
          <button
            className="btn-primary"
            onClick={() => onNavigate('contact')}
          >
            Initiate Contact
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </div>
      </div>

    </main>
  );
}