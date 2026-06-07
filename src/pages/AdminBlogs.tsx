// src/pages/AdminBlogs.tsx
import { useState, useEffect } from 'react';
import './AdminBlogs.css';
import '../styles/shared.css';

// ── Your secret password ──────────────────────────────────
const ADMIN_PASSWORD = 'dhruva@2025';
// ─────────────────────────────────────────────────────────

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  fullContent: string;
  category: string;
  date: string;
  readTime: string;
  icon: string;
  accentColor: string;
}

interface AdminBlogsProps {
  onNavigate: (page: string) => void;
}

const ICON_OPTIONS = [
  'security', 'terminal', 'search', 'lan', 'monitoring',
  'hub', 'bug_report', 'vpn_lock', 'shield', 'lock',
];

const COLOR_OPTIONS = [
  { label: 'Cyan',  value: 'var(--color-primary)'   },
  { label: 'Green', value: 'var(--color-secondary)'  },
];

export default function AdminBlogs({ onNavigate }: AdminBlogsProps) {
  const [authed,    setAuthed]    = useState(false);
  const [password,  setPassword]  = useState('');
  const [pwError,   setPwError]   = useState('');
  const [blogs,     setBlogs]     = useState<BlogPost[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showForm,  setShowForm]  = useState(false);
  const [saved,     setSaved]     = useState(false);

  const emptyForm: Omit<BlogPost, 'id'> = {
    title:       '',
    excerpt:     '',
    fullContent: '',
    category:    '',
    date:        new Date().toISOString().split('T')[0],
    readTime:    '',
    icon:        'security',
    accentColor: 'var(--color-primary)',
  };

  const [form, setForm] = useState<Omit<BlogPost, 'id'>>(emptyForm);

  // Load blogs from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('dhruva_blogs');
    if (stored) setBlogs(JSON.parse(stored));
  }, []);

  const saveToStorage = (updated: BlogPost[]) => {
    localStorage.setItem('dhruva_blogs', JSON.stringify(updated));
    setBlogs(updated);
  };

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwError('');
    } else {
      setPwError('// ACCESS DENIED: Invalid credentials');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.title || !form.excerpt || !form.fullContent || !form.category) return;

    if (editingId !== null) {
      // Edit existing
      const updated = blogs.map((b) =>
        b.id === editingId ? { ...form, id: editingId } : b
      );
      saveToStorage(updated);
      setEditingId(null);
    } else {
      // Add new
      const newBlog: BlogPost = {
        ...form,
        id: Date.now(),
      };
      saveToStorage([newBlog, ...blogs]);
    }

    setForm(emptyForm);
    setShowForm(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleEdit = (blog: BlogPost) => {
    setForm({
      title:       blog.title,
      excerpt:     blog.excerpt,
      fullContent: blog.fullContent,
      category:    blog.category,
      date:        blog.date,
      readTime:    blog.readTime,
      icon:        blog.icon,
      accentColor: blog.accentColor,
    });
    setEditingId(blog.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: number) => {
    const updated = blogs.filter((b) => b.id !== id);
    saveToStorage(updated);
  };

  const handleCancel = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  // ── Login screen ──────────────────────────────────────
  if (!authed) {
    return (
      <div className="admin-blogs__login">
        <div className="admin-blogs__login-card glass-card">
          <div className="scanline" />
          <div className="admin-blogs__login-icon">
            <span className="material-symbols-outlined">admin_panel_settings</span>
          </div>
          <h2 className="admin-blogs__login-title">Blog Admin Panel</h2>
          <p className="admin-blogs__login-sub">// Enter admin password to continue</p>

          <div className="admin-blogs__login-field">
            <input
              className="admin-blogs__login-input"
              type="password"
              placeholder="Enter password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            />
          </div>

          {pwError && (
            <p className="admin-blogs__login-error">{pwError}</p>
          )}

          <button className="btn-primary" onClick={handleLogin}>
            <span className="material-symbols-outlined">lock_open</span>
            Authenticate
          </button>

          <button
            className="admin-blogs__back-btn"
            onClick={() => onNavigate('blogs')}
          >
            ← Back to Blogs
          </button>
        </div>
      </div>
    );
  }

  // ── Admin dashboard ───────────────────────────────────
  return (
    <main className="admin-blogs">
      <div className="admin-blogs__bg-grid cyber-grid" />

      {/* Header */}
      <header className="admin-blogs__header">
        <div className="admin-blogs__header-inner">
          <div>
            <div className="status-pill" style={{ marginBottom: 12 }}>
              <span className="status-pill__dot" />
              <span className="code-sm" style={{ color: 'var(--color-primary)', letterSpacing: '0.1em' }}>
                ADMIN // BLOG_CONTROL_PANEL
              </span>
            </div>
            <h1 className="headline-lg" style={{ color: 'var(--color-on-surface)' }}>
              Blog Manager
            </h1>
          </div>
          <div className="admin-blogs__header-actions">
            {saved && (
              <span className="admin-blogs__saved-msg">
                <span className="material-symbols-outlined">check_circle</span>
                Saved!
              </span>
            )}
            <button
              className="btn-primary"
              onClick={() => { setShowForm(true); setEditingId(null); setForm(emptyForm); }}
            >
              <span className="material-symbols-outlined">add</span>
              New Blog
            </button>
            <button className="btn-outline" onClick={() => onNavigate('blogs')}>
              <span className="material-symbols-outlined">visibility</span>
              View Blogs
            </button>
            <button
              className="btn-outline"
              onClick={() => setAuthed(false)}
              style={{ borderColor: 'var(--color-error)', color: 'var(--color-error)' }}
            >
              <span className="material-symbols-outlined">logout</span>
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Add / Edit Form */}
      {showForm && (
        <section className="admin-blogs__form-section">
          <div className="glass-card admin-blogs__form-card">
            <div className="scanline" />
            <h2 className="admin-blogs__form-title">
              {editingId !== null ? '// Edit Blog' : '// New Blog Post'}
            </h2>

            <div className="admin-blogs__form-grid">

              {/* Title */}
              <div className="admin-blogs__field admin-blogs__field--full">
                <label className="admin-blogs__label">Title *</label>
                <input
                  className="admin-blogs__input"
                  name="title"
                  placeholder="Blog title..."
                  value={form.title}
                  onChange={handleChange}
                />
              </div>

              {/* Category */}
              <div className="admin-blogs__field">
                <label className="admin-blogs__label">Category *</label>
                <input
                  className="admin-blogs__input"
                  name="category"
                  placeholder="e.g. SOC, Blue Team..."
                  value={form.category}
                  onChange={handleChange}
                />
              </div>

              {/* Date */}
              <div className="admin-blogs__field">
                <label className="admin-blogs__label">Date</label>
                <input
                  className="admin-blogs__input"
                  name="date"
                  type="date"
                  value={form.date}
                  onChange={handleChange}
                />
              </div>

              {/* Read Time */}
              <div className="admin-blogs__field">
                <label className="admin-blogs__label">Read Time</label>
                <input
                  className="admin-blogs__input"
                  name="readTime"
                  placeholder="e.g. 8 MIN READ"
                  value={form.readTime}
                  onChange={handleChange}
                />
              </div>

              {/* Icon */}
              <div className="admin-blogs__field">
                <label className="admin-blogs__label">Icon</label>
                <select
                  className="admin-blogs__select"
                  name="icon"
                  value={form.icon}
                  onChange={handleChange}
                >
                  {ICON_OPTIONS.map((ic) => (
                    <option key={ic} value={ic}>{ic}</option>
                  ))}
                </select>
              </div>

              {/* Accent Color */}
              <div className="admin-blogs__field">
                <label className="admin-blogs__label">Accent Color</label>
                <select
                  className="admin-blogs__select"
                  name="accentColor"
                  value={form.accentColor}
                  onChange={handleChange}
                >
                  {COLOR_OPTIONS.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>

              {/* Excerpt */}
              <div className="admin-blogs__field admin-blogs__field--full">
                <label className="admin-blogs__label">Excerpt * (shown as preview)</label>
                <textarea
                  className="admin-blogs__textarea admin-blogs__textarea--sm"
                  name="excerpt"
                  placeholder="Short description shown on card..."
                  value={form.excerpt}
                  onChange={handleChange}
                />
              </div>

              {/* Full Content */}
              <div className="admin-blogs__field admin-blogs__field--full">
                <label className="admin-blogs__label">Full Content * (shown on Read More)</label>
                <p className="admin-blogs__hint">
                  // Use blank lines between paragraphs. Wrap code in ``` blocks. Use **bold** for emphasis.
                </p>
                <textarea
                  className="admin-blogs__textarea admin-blogs__textarea--lg"
                  name="fullContent"
                  placeholder="Full blog content..."
                  value={form.fullContent}
                  onChange={handleChange}
                />
              </div>

            </div>

            <div className="admin-blogs__form-actions">
              <button className="btn-primary" onClick={handleSubmit}>
                <span className="material-symbols-outlined">save</span>
                {editingId !== null ? 'Update Blog' : 'Publish Blog'}
              </button>
              <button className="btn-outline" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Blog List */}
      <section className="admin-blogs__list-section">
        <div className="admin-blogs__list-header">
          <span className="label-caps" style={{ color: 'var(--color-on-surface-variant)' }}>
            // {blogs.length} Custom Blog{blogs.length !== 1 ? 's' : ''} Stored
          </span>
        </div>

        {blogs.length === 0 ? (
          <div className="admin-blogs__empty">
            <span className="material-symbols-outlined">article</span>
            <p>No custom blogs yet. Click "New Blog" to add one.</p>
          </div>
        ) : (
          <div className="admin-blogs__list">
            {blogs.map((blog) => (
              <div key={blog.id} className="glass-card admin-blogs__list-item">
                <div
                  className="admin-blogs__list-accent"
                  style={{ background: blog.accentColor }}
                />
                <div className="admin-blogs__list-info">
                  <div className="admin-blogs__list-meta">
                    <span className="tag tag--primary">{blog.category}</span>
                    <span className="admin-blogs__list-date">{blog.date}</span>
                    <span className="admin-blogs__list-date">{blog.readTime}</span>
                  </div>
                  <h3 className="admin-blogs__list-title">{blog.title}</h3>
                  <p className="admin-blogs__list-excerpt">{blog.excerpt.split('.')[0]}.</p>
                </div>
                <div className="admin-blogs__list-actions">
                  <button
                    className="admin-blogs__action-btn admin-blogs__action-btn--edit"
                    onClick={() => handleEdit(blog)}
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                  <button
                    className="admin-blogs__action-btn admin-blogs__action-btn--delete"
                    onClick={() => handleDelete(blog.id)}
                  >
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}