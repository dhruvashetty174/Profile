// src/pages/Blogs.tsx
import { useState, useEffect } from 'react';
import './Blogs.css';
import '../styles/shared.css';

const FILTERS = ['All', 'SOC', 'Blue Team', 'Threat Hunting', 'Network Security', 'Threat Intel'];

const BLOGS = [
  {
    id: 101,
    title: 'Detecting Brute Force Attacks Using Splunk',
    excerpt: 'Analyzing Windows authentication logs and building Splunk searches to identify failed login attempts, account lockouts, and brute force activity.',
    fullContent: `Brute force attacks are one of the most common attack vectors targeting user accounts. In this post, we explore how to use Splunk to detect them in real time.

**Setting Up the Search**
Start by querying Windows Security Event ID 4625 (failed logon). A high volume of 4625 events from a single source IP within a short time window is a strong indicator of brute force activity.

\`\`\`
index=windows EventCode=4625 
| stats count by src_ip, user 
| where count > 10
\`\`\`

**Account Lockout Detection**
Event ID 4740 indicates an account has been locked out. Correlate this with 4625 events to confirm brute force:

\`\`\`
index=windows EventCode=4740 
| stats count by TargetUserName, src_ip
\`\`\`

**Building an Alert**
Save your search as an alert that triggers when count exceeds threshold. Set it to run every 5 minutes and notify via email or webhook.

**Mitigation**
- Enable account lockout policies
- Implement MFA
- Block suspicious IPs at the firewall
- Monitor logs continuously with SIEM`,
    category: 'SOC',
    date: '2025-06-10',
    readTime: '7 MIN READ',
    icon: 'security',
    accentColor: 'var(--color-primary)',
  },
  {
    id: 102,
    title: 'Windows Event IDs Every SOC Analyst Should Know',
    excerpt: 'A practical guide to important Windows Event IDs including 4624, 4625, 4688, 4720, and how they are used during security investigations.',
    fullContent: `Windows Event IDs are the backbone of Windows-based threat detection. Here are the most critical ones every SOC analyst must know.

**Authentication Events**
- **4624** — Successful logon. Look for unusual logon types.
- **4625** — Failed logon. High volume indicates brute force.
- **4648** — Logon using explicit credentials (Pass-the-Hash indicator).

**Account Management**
- **4720** — New user account created.
- **4728/4732/4756** — Member added to security group.

**Process & Execution**
- **4688** — New process created. Enable command line logging for full visibility.

**Policy & Privilege**
- **4672** — Special privileges assigned (admin logon).
- **4698** — Scheduled task created (persistence indicator).

**Pro Tip**
Enable advanced audit policies and command line logging via GPO. Without these, Event ID 4688 won't show the full process command line — critical for detecting malicious PowerShell and LOLBins.`,
    category: 'Blue Team',
    date: '2025-06-01',
    readTime: '8 MIN READ',
    icon: 'terminal',
    accentColor: 'var(--color-secondary)',
  },
  {
    id: 103,
    title: 'Threat Hunting with Sysmon Logs',
    excerpt: 'Using Sysmon event logs to detect suspicious process execution, PowerShell abuse, persistence mechanisms, and lateral movement activities.',
    fullContent: `Sysmon (System Monitor) from Microsoft Sysinternals provides detailed telemetry that standard Windows logging misses.

**Installation**
Download Sysmon and deploy with a config:
\`\`\`
sysmon64.exe -accepteula -i sysmonconfig.xml
\`\`\`

**Key Event IDs**
- **Event 1** — Process creation with full command line and hash.
- **Event 3** — Network connections. Great for C2 detection.
- **Event 8** — CreateRemoteThread. Detect process injection.
- **Event 13** — Registry value set. Detect persistence.

**Hunting PowerShell Abuse**
\`\`\`
EventID=1 AND Image=*powershell.exe AND 
CommandLine=(*-enc* OR *-EncodedCommand* OR *bypass*)
\`\`\`

**Integration**
Ship Sysmon logs to your SIEM (Wazuh, Splunk, ELK) for correlation and alerting.`,
    category: 'Threat Hunting',
    date: '2025-05-22',
    readTime: '10 MIN READ',
    icon: 'search',
    accentColor: 'var(--color-primary)',
  },
  {
    id: 104,
    title: 'Investigating Malware Traffic with Wireshark',
    excerpt: 'Capturing and analyzing malicious network traffic, identifying C2 communications, DNS tunneling, and unusual protocol behavior.',
    fullContent: `Wireshark is the go-to tool for packet-level network analysis. Here is how to use it to investigate malware traffic.

**Key Filters**
\`\`\`
http.request
dns
tcp.flags.syn==1
ip.addr == 192.168.1.100
\`\`\`

**Identifying C2 Communication**
Look for beaconing patterns (regular intervals to same IP), unusual User-Agent strings, large DNS TXT records (DNS tunneling), and HTTP POST to unknown domains.

**DNS Tunneling Detection**
Long subdomains and high-frequency DNS queries to same domain are red flags.

**Extracting Files**
Go to File → Export Objects → HTTP to extract files transferred over HTTP.

**IOC Extraction**
Document all suspicious IPs, domains, and URLs. Cross-reference with VirusTotal and Threat Intelligence feeds.`,
    category: 'Network Security',
    date: '2025-05-12',
    readTime: '9 MIN READ',
    icon: 'lan',
    accentColor: 'var(--color-secondary)',
  },
  {
    id: 105,
    title: 'Building a Home SOC Using Wazuh',
    excerpt: 'Deploying Wazuh SIEM, configuring agents, collecting logs, creating custom detection rules, and monitoring security events.',
    fullContent: `Wazuh is a free, open-source SIEM and XDR platform. Here is how to build a functional home SOC with it.

**Architecture**
- Wazuh Server (Ubuntu VM) — central manager
- Wazuh Agents — installed on endpoints
- Wazuh Dashboard — Kibana-based web UI

**Installation**
\`\`\`
curl -sO https://packages.wazuh.com/4.7/wazuh-install.sh
bash wazuh-install.sh -a
\`\`\`

**Custom Detection Rules**
\`\`\`
<rule id="100001" level="10">
  <if_group>authentication_failed</if_group>
  <same_source_ip />
  <description>Brute force attack detected</description>
</rule>
\`\`\`

**Log Collection**
Configure ossec.conf to collect Windows Event Logs, Sysmon logs, and Application logs.

**Dashboard**
Use the Wazuh dashboard to visualize alerts, create dashboards, and set up email notifications.`,
    category: 'SOC',
    date: '2025-04-28',
    readTime: '12 MIN READ',
    icon: 'monitoring',
    accentColor: 'var(--color-primary)',
  },
  {
    id: 106,
    title: 'Understanding MITRE ATT&CK for Beginners',
    excerpt: 'Mapping attacker techniques to MITRE ATT&CK and using the framework during threat hunting and incident investigations.',
    fullContent: `MITRE ATT&CK is a globally-accessible knowledge base of adversary tactics and techniques.

**What is ATT&CK?**
ATT&CK stands for Adversarial Tactics, Techniques, and Common Knowledge. It documents real-world attacker behavior organized into Tactics (the why) and Techniques (the how).

**The 14 Tactics**
- Reconnaissance, Resource Development, Initial Access, Execution
- Persistence, Privilege Escalation, Defense Evasion
- Credential Access, Discovery, Lateral Movement
- Collection, Command & Control, Exfiltration, Impact

**Practical Use**
When investigating an incident, map each attacker action to a technique. This helps you understand the full kill chain.

**Tools**
- **ATT&CK Navigator** — visualize coverage and gaps
- **Sigma rules** — detection rules mapped to ATT&CK
- **Atomic Red Team** — test your detections

**Getting Started**
Visit attack.mitre.org and explore the matrix. Pick one technique per week to study in depth.`,
    category: 'Threat Intel',
    date: '2025-04-15',
    readTime: '6 MIN READ',
    icon: 'hub',
    accentColor: 'var(--color-secondary)',
  },
];

interface BlogsProps {
  onNavigate: (page: string) => void;
}

export default function Blogs({ onNavigate }: BlogsProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [search,       setSearch]       = useState('');
  const [expandedId,   setExpandedId]   = useState<number | null>(null);
  const [customBlogs,  setCustomBlogs]  = useState<any[]>([]);

  // Load custom blogs from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('dhruva_blogs');
    if (stored) setCustomBlogs(JSON.parse(stored));
  }, []);

  // Merge custom blogs (shown first) with hardcoded blogs
  const ALL_BLOGS = [...customBlogs, ...BLOGS];

  const filtered = ALL_BLOGS.filter((b) => {
    const matchCat    = activeFilter === 'All' || b.category === activeFilter;
    const matchSearch =
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main className="blogs">
      <div className="blogs__bg-grid cyber-grid" />

      {/* ── Header ───────────────────────────────── */}
      <header className="blogs__header">
        <div className="blogs__header-inner">
          <div className="status-pill" style={{ marginBottom: 16 }}>
            <span className="status-pill__dot" />
            <span className="code-sm" style={{ color: 'var(--color-primary)', letterSpacing: '0.1em' }}>
              DHRUVA.OS // KNOWLEDGE_BASE
            </span>
          </div>
          <h1 className="headline-xl" style={{ color: 'var(--color-on-surface)' }}>
            Security{' '}
            <span style={{ color: 'var(--color-primary-container)' }} className="neon-glow-primary">
              Writings
            </span>
          </h1>
          <p className="body-lg" style={{ color: 'var(--color-on-surface-variant)', marginTop: 16, maxWidth: 560 }}>
            Tactical knowledge from the trenches — vulnerability research, threat hunting,
            and defensive engineering.
          </p>
        </div>
      </header>

      {/* ── Controls ─────────────────────────────── */}
      <div className="blogs__controls">
        <div className="blogs__search">
          <span className="material-symbols-outlined blogs__search-icon">search</span>
          <input
            className="blogs__search-input"
            type="text"
            placeholder="SEARCH_INTEL_BASE..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="blogs__filter-tabs">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`blogs__filter-tab ${activeFilter === f ? 'blogs__filter-tab--active' : ''}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* ── Blog Grid ────────────────────────────── */}
      <section className="blogs__grid-section">
        <div className="blogs__grid">
          {filtered.map((blog) => (
            <div
              key={blog.id}
              className={`glass-card blog-card blog-card--no-img ${
                expandedId === blog.id ? 'blog-card--expanded' : ''
              }`}
            >
              {/* Accent line */}
              <div
                className="blog-card__accent-line"
                style={{ background: blog.accentColor }}
              />

              {/* Top row */}
              <div className="blog-card__top">
                <div className="blog-card__icon-wrap" style={{ color: blog.accentColor }}>
                  <span className="material-symbols-outlined">{blog.icon}</span>
                </div>
                <span className="tag tag--primary">{blog.category.toUpperCase()}</span>
              </div>

              {/* Content */}
              <div className="blog-card__content">
                <div className="blog-card__date">
                  {new Date(blog.date).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'short', day: 'numeric',
                  })}
                </div>
                <h3 className="blog-card__title">{blog.title}</h3>

                {expandedId !== blog.id ? (
                  <p className="blog-card__excerpt">
                    {blog.excerpt.split('.')[0]}.
                  </p>
                ) : (
                  <div className="blog-card__full-content">
                    {blog.fullContent.split('\n\n').map((para: string, i: number) => {
                      if (para.startsWith('```')) {
                        const code = para.replace(/```[\w]*/g, '').trim();
                        return (
                          <pre key={i} className="blog-card__code-block">
                            <code>{code}</code>
                          </pre>
                        );
                      }
                      if (para.startsWith('**') && para.endsWith('**')) {
                        return (
                          <h4 key={i} className="blog-card__section-title">
                            {para.replace(/\*\*/g, '')}
                          </h4>
                        );
                      }
                      const html = para.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
                      return (
                        <p
                          key={i}
                          className="blog-card__para"
                          dangerouslySetInnerHTML={{ __html: html }}
                        />
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="blog-card__footer">
                <span className="blog-card__read-time">{blog.readTime}</span>
                <button
                  className="blog-card__read-btn"
                  onClick={() =>
                    setExpandedId(expandedId === blog.id ? null : blog.id)
                  }
                >
                  {expandedId === blog.id ? 'Collapse' : 'Read More'}
                  <span className="material-symbols-outlined">
                    {expandedId === blog.id ? 'expand_less' : 'arrow_forward'}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Newsletter ───────────────────────────── */}
      <section className="blogs__newsletter">
        <div className="glass-card blogs__newsletter-card">
          <div className="blogs__newsletter-top-line" />
          <span className="material-symbols-outlined blogs__newsletter-icon">mail</span>
          <h2 className="headline-lg blogs__newsletter-title">
            Subscribe to the Intel Feed
          </h2>
          <p className="body-md" style={{ color: 'var(--color-on-surface-variant)', maxWidth: 400 }}>
            Bi-weekly threat briefings, tool releases, and vulnerability research
            delivered to your inbox.
          </p>
          <div className="blogs__newsletter-form">
            <input
              className="blogs__newsletter-input"
              type="email"
              placeholder="your@email.com"
            />
            <button className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}