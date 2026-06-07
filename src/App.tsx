// src/App.tsx
import { useState } from 'react';
import './styles/globals.css';
import './styles/shared.css';

import Navbar      from './components/Navbar';
import Footer      from './components/Footer';
import Home        from './pages/Home';
import Skills      from './pages/Skills';
import Projects    from './pages/Projects';
import Resume      from './pages/Resume';
import Blogs       from './pages/Blogs';
import Contact     from './pages/Contact';
import AdminLogin  from './pages/AdminLogin';
import AdminBlogs  from './pages/AdminBlogs';

type Page =
  | 'home'
  | 'skills'
  | 'projects'
  | 'resume'
  | 'blogs'
  | 'contact'
  | 'admin'
  | 'adminblogs';

// Pages that render their own footer
const PAGES_WITH_OWN_FOOTER: Page[] = ['skills', 'admin', 'adminblogs'];

// Pages with no navbar
const PAGES_WITHOUT_NAVBAR: Page[] = ['admin', 'adminblogs'];

export default function App() {
  const [page, setPage] = useState<Page>('home');

  const navigate = (p: string) => {
    setPage(p as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showNavbar = !PAGES_WITHOUT_NAVBAR.includes(page);
  const showFooter = !PAGES_WITH_OWN_FOOTER.includes(page);

  return (
    <>
      {showNavbar && (
        <Navbar currentPage={page} onNavigate={navigate} />
      )}

      {page === 'home'       && <Home       onNavigate={navigate} />}
      {page === 'skills'     && <Skills     onNavigate={navigate} />}
      {page === 'projects'   && <Projects   onNavigate={navigate} />}
      {page === 'resume'     && <Resume     onNavigate={navigate} />}
      {page === 'blogs'      && <Blogs      onNavigate={navigate} />}
      {page === 'contact'    && <Contact    onNavigate={navigate} />}
      {page === 'admin'      && <AdminLogin onNavigate={navigate} />}
      {page === 'adminblogs' && <AdminBlogs onNavigate={navigate} />}

      {showFooter && <Footer onNavigate={navigate} />}
    </>
  );
}