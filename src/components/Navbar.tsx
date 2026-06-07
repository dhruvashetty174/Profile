// src/components/Navbar.tsx
import { useState } from 'react';
import './Navbar.css';

const NAV_LINKS = [
  { label: 'Home',     page: 'home'     },
  { label: 'About',    page: 'home'     },
  { label: 'Skills',   page: 'skills'   },  // ← was 'home', now 'skills'
  { label: 'Projects', page: 'projects' },
  { label: 'Blogs',    page: 'blogs'    },
  { label: 'Contact',  page: 'contact'  },
];

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar__inner">

        {/* Logo */}
        <div className="navbar__logo" onClick={() => onNavigate('home')}>
          DHRUVA.OS
        </div>

        {/* Desktop Links */}
        <ul className="navbar__links">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <span
                className={`navbar__link ${currentPage === link.page ? 'navbar__link--active' : ''}`}
                onClick={() => onNavigate(link.page)}
              >
                {link.label}
              </span>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="navbar__actions">
          <button className="navbar__icon-btn" aria-label="Terminal">
            <span className="material-symbols-outlined">terminal</span>
          </button>
          <button className="navbar__icon-btn" aria-label="Shield">
            <span className="material-symbols-outlined">shield</span>
          </button>
          <button className="navbar__resume-btn" onClick={() => onNavigate('resume')}>
            Resume
          </button>
          <button
            className="navbar__hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className="navbar__hamburger-line" />
            <span className="navbar__hamburger-line" />
            <span className="navbar__hamburger-line" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`navbar__mobile-menu ${mobileOpen ? 'navbar__mobile-menu--open' : ''}`}>
        {NAV_LINKS.map((link) => (
          <span
            key={link.label}
            className={`navbar__mobile-link ${currentPage === link.page ? 'navbar__mobile-link--active' : ''}`}
            onClick={() => {
              onNavigate(link.page);
              setMobileOpen(false);
            }}
          >
            {link.label}
          </span>
        ))}
        <span
          className="navbar__mobile-link"
          onClick={() => { onNavigate('resume'); setMobileOpen(false); }}
        >
          Resume
        </span>
      </div>
    </nav>
  );
}