// src/components/Footer.tsx
import './Footer.css';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__left">
          <div className="footer__name">DHRUVA // Security Engineer</div>
          <div className="footer__copy">
            © 2024 DHRUVA // Encrypted Connection Established
          </div>
        </div>
        <div className="footer__links">
  <a
    className="footer__link"
    href="#"
    target="_blank"
    rel="noopener noreferrer"
  >
    Twitter
  </a>

  <a
    className="footer__link"
    href="https://github.com/dhruvashetty174"
    target="_blank"
    rel="noopener noreferrer"
  >
    GitHub
  </a>

  <a
    className="footer__link"
    href="https://www.linkedin.com/in/dhruva-shetty-691ab42ba/"
    target="_blank"
    rel="noopener noreferrer"
  >
    LinkedIn
  </a>

  <span className="footer__link" onClick={() => onNavigate?.('resume')}>
    Certifications
  </span>

  {/* Hidden admin link — very faint, only you know it's there */}
  <span
    className="footer__link"
    onClick={() => onNavigate?.('adminblogs')}
    style={{ opacity: 0.15, fontSize: '10px' }}
    title="Admin"
  >
    ◆
  </span>
</div>
      </div>
    </footer>
  );
}