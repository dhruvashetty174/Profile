// src/pages/AdminLogin.tsx
import { useState } from 'react';
import './AdminLogin.css';
import '../styles/shared.css';

interface AdminLoginProps {
  onNavigate: (page: string) => void;
}

export default function AdminLogin({ onNavigate }: AdminLoginProps) {
  const [agentId, setAgentId] = useState('');
  const [accessKey, setAccessKey] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate home on submit (placeholder)
    onNavigate('home');
  };

  return (
    <div className="admin-login">
      {/* Backgrounds */}
      <div className="admin-login__bg-grid cyber-grid" />
      <div className="admin-login__bg-glow" />

      {/* Login Card */}
      <div className="admin-login__card">
        {/* Corner brackets */}
        <div className="admin-login__corner admin-login__corner--tl" />
        <div className="admin-login__corner admin-login__corner--br" />

        <div className="admin-login__inner">

          {/* Brand */}
          <div className="admin-login__brand">
            <div className="admin-login__brand-name">DHRUVA.OS</div>
            <div className="admin-login__brand-status">
              <span className="admin-login__brand-dot animate-pulse" />
              <span className="admin-login__brand-sub">Encrypted Session Terminal</span>
            </div>
          </div>

          {/* Form */}
          <form className="admin-login__form" onSubmit={handleSubmit}>

            <div className="admin-login__fields">
              {/* Agent ID */}
              <div className="admin-login__field">
                <label className="admin-login__field-label">Agent ID</label>
                <div className="admin-login__field-row">
                  <span className="material-symbols-outlined admin-login__field-icon">terminal</span>
                  <input
                    className="admin-login__input"
                    type="text"
                    placeholder="SEC-001"
                    value={agentId}
                    onChange={(e) => setAgentId(e.target.value)}
                    autoComplete="off"
                  />
                </div>
              </div>

              {/* Access Key */}
              <div className="admin-login__field">
                <label className="admin-login__field-label">Access Key</label>
                <div className="admin-login__field-row">
                  <span className="material-symbols-outlined admin-login__field-icon">shield</span>
                  <input
                    className="admin-login__input"
                    type="password"
                    placeholder="••••••••••••"
                    value={accessKey}
                    onChange={(e) => setAccessKey(e.target.value)}
                    style={{ textTransform: 'none', letterSpacing: '0.2em' }}
                  />
                </div>
              </div>
            </div>

            {/* Biometric scanner */}
            <div className="admin-login__biometric">
              <div className="admin-login__bio-icon-wrap">
                <div className="admin-login__bio-ring" />
                <div className="admin-login__bio-ping" />
                <span className="material-symbols-outlined admin-login__bio-icon">fingerprint</span>
              </div>
              <span className="admin-login__bio-label">Awaiting Biometric Confirmation</span>
            </div>

            {/* Submit */}
            <button className="admin-login__submit" type="submit">
              Initialize Session
            </button>

            {/* Help links */}
            <div className="admin-login__help">
              <button
                type="button"
                className="admin-login__help-link"
                onClick={() => onNavigate('home')}
              >
                Emergency Bypass
              </button>
              <button
                type="button"
                className="admin-login__help-link"
              >
                Request Access
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}
