// src/pages/Contact.tsx
import { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';
import '../styles/shared.css';

const EMAILJS_SERVICE_ID  = 'service_cvy5aai';
const EMAILJS_TEMPLATE_ID = 'template_hl7eyok';
const EMAILJS_PUBLIC_KEY  = 'UcVHqKpj6x8S0fliC';

interface ContactProps {
  onNavigate: (page: string) => void;
}

export default function Contact({ onNavigate }: ContactProps) {
  const [copied,    setCopied]    = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [sending,   setSending]   = useState(false);
  const [error,     setError]     = useState('');
  const [form, setForm] = useState({
    name: '', email: '', subject: '', message: ''
  });

  const handleCopy = () => {
    navigator.clipboard.writeText('imdhruvashetty74@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.subject || !form.message) {
      setError('// All fields are required.');
      return;
    }

    setSending(true);
    setError('');

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          subject:    form.subject,
          message:    form.message,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setError('// Transmission failed. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <main className="contact">
      <div className="contact__bg-grid cyber-grid" />

      {/* ── Header ───────────────────────────────── */}
      <header className="contact__header">
        <div className="contact__header-inner">
          <div className="status-pill" style={{ marginBottom: 16 }}>
            <span className="status-pill__dot" />
            <span className="code-sm" style={{ color: 'var(--color-primary)', letterSpacing: '0.1em' }}>
              SECURE_CHANNEL // ACTIVE
            </span>
          </div>
          <h1 className="headline-xl" style={{ color: 'var(--color-on-surface)' }}>
            Initiate{' '}
            <span style={{ color: 'var(--color-primary-container)' }} className="neon-glow-primary">
              Contact
            </span>
          </h1>
          <p className="body-lg" style={{ color: 'var(--color-on-surface-variant)', marginTop: 16, maxWidth: 520 }}>
            All transmissions are encrypted end-to-end. Typical response time: 24–48 hours.
          </p>
        </div>
      </header>

      {/* ── Grid ─────────────────────────────────── */}
      <div className="contact__grid">

        {/* Left panel */}
        <div className="contact__left">

          {/* Email */}
          <div className="glass-card contact__email-card">
            <div className="contact__email-label">
              <span className="material-symbols-outlined">mail</span>
              Direct Line
            </div>
            <div className="contact__email-value">imdhruvashetty74@gmail.com</div>
            <button className="contact__email-copy" onClick={handleCopy}>
              <span className="material-symbols-outlined">{copied ? 'check' : 'content_copy'}</span>
              {copied ? 'Copied!' : 'Copy Address'}
            </button>
          </div>

          {/* Socials */}
          <div className="glass-card contact__socials">
            <div className="contact__socials-label">// Social Channels</div>
            <div className="contact__social-grid">
              {[
                { icon: 'hub',  label: 'LinkedIn' },
                { icon: 'code', label: 'GitHub'   },
                { icon: 'chat', label: 'Twitter'  },
                { icon: 'feed', label: 'Blog'     },
              ].map((s) => (
                <a key={s.label} className="contact__social-btn" href="#" target="_blank" rel="noopener noreferrer">
                  <span className="material-symbols-outlined">{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="glass-card contact__status">
            <div className="contact__status-row">
              <span className="contact__status-key">// Status</span>
              <span className="contact__status-val contact__status-val--green">AVAILABLE</span>
            </div>
            <div className="contact__status-row">
              <span className="contact__status-key">// Location</span>
              <span className="contact__status-val">Remote / India</span>
            </div>
            <div className="contact__status-row">
              <span className="contact__status-key">// Timezone</span>
              <span className="contact__status-val">IST (UTC+5:30)</span>
            </div>
            <div className="contact__status-row">
              <span className="contact__status-key">// Response</span>
              <span className="contact__status-val">24–48 hrs</span>
            </div>
          </div>

        </div>

        {/* Contact Form */}
        <div className="glass-card contact__form-card">
          <div className="scanline" />

          {submitted ? (
            <div className="contact__success">
              <span className="material-symbols-outlined contact__success-icon">check_circle</span>
              <div className="contact__success-title">Transmission Received</div>
              <p className="contact__success-msg">
                Your message is encrypted and queued. Expect a response within 24–48 hours.
              </p>
              <button className="btn-outline" onClick={() => setSubmitted(false)}>
                Send Another
              </button>
            </div>
          ) : (
            <>
              <div>
                <div className="contact__form-title">Send a Message</div>
                <div className="contact__form-sub">// All fields marked * are required</div>
              </div>

              <div className="contact__form">
                <div className="contact__form-row">
                  <div className="contact__field">
                    <label className="contact__field-label">Name<span>*</span></label>
                    <input
                      className="contact__input"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="contact__field">
                    <label className="contact__field-label">Email<span>*</span></label>
                    <input
                      className="contact__input"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="contact__field">
                  <label className="contact__field-label">Subject<span>*</span></label>
                  <select
                    className="contact__select"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                  >
                    <option value="">// Select engagement type</option>
                    <option value="Penetration Testing">Penetration Testing</option>
                    <option value="Security Consultation">Security Consultation</option>
                    <option value="Full-Time Opportunity">Full-Time Opportunity</option>
                    <option value="Research Collaboration">Research Collaboration</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="contact__field">
                  <label className="contact__field-label">Message<span>*</span></label>
                  <textarea
                    className="contact__textarea"
                    name="message"
                    placeholder="Describe your project or inquiry in detail..."
                    value={form.message}
                    onChange={handleChange}
                  />
                </div>

                {error && (
                  <div style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-code-sm)',
                    color: 'var(--color-error)',
                    padding: '8px 0',
                  }}>
                    {error}
                  </div>
                )}

                <div className="contact__form-actions">
                  <button
                    className="btn-primary"
                    onClick={handleSubmit}
                    disabled={sending}
                    style={{ opacity: sending ? 0.6 : 1, cursor: sending ? 'not-allowed' : 'pointer' }}
                  >
                    <span className="material-symbols-outlined">
                      {sending ? 'hourglass_empty' : 'send'}
                    </span>
                    {sending ? 'Transmitting...' : 'Send Transmission'}
                  </button>
                  <span className="contact__form-note">// End-to-end encrypted</span>
                </div>

              </div>
            </>
          )}
        </div>

      </div>
    </main>
  );
}