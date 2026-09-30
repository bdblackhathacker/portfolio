import { useState, useEffect, useCallback } from 'react';
import { FiMenu, FiX, FiGithub, FiLinkedin, FiTwitter, FiMail, FiCommand, FiLock } from 'react-icons/fi';
import { siteConfig } from '@/data/config';
import { sfx } from '@/utils/sound';
import styles from './Navbar.module.css';

const sectionId = (href: string) => (href === '/' ? 'root' : href.replace('#', ''));

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState('/');

  // scroll state + hide-on-scroll-down + progress
  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 20);
      setHidden(y > 400 && y > lastY && !isOpen);
      lastY = y;
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setProgress(max > 0 ? Math.min(100, (y / max) * 100) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [isOpen]);

  // scroll-spy: highlight the section in view
  useEffect(() => {
    const ids = siteConfig.navigation.map((n) => sectionId(n.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const id = e.target.id || 'root';
            const match = siteConfig.navigation.find((n) => sectionId(n.href) === id);
            if (match) setActive(match.href);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    // re-check after lazy sections mount
    const t = setTimeout(() => {
      ids.forEach((id) => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      });
    }, 2000);
    return () => {
      observer.disconnect();
      clearTimeout(t);
    };
  }, []);

  // lock body scroll when mobile menu open + close on escape
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  const go = useCallback((href: string) => {
    setIsOpen(false);
    sfx.click();
    if (href === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    // HashRouter owns window.location.hash — never set it; scroll manually
    document.getElementById(sectionId(href))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const openPalette = useCallback(() => {
    setIsOpen(false);
    window.dispatchEvent(new CustomEvent('neo:open-palette'));
  }, []);

  return (
    <header
      className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''} ${hidden ? styles.hidden : ''}`}
    >
      <div className={styles.container}>
        <button onClick={() => go('/')} className={styles.logo} aria-label="Back to top">
          <span className={styles.logoText}>BB</span>
          <span className={styles.logoFull}>
            bdblackhathacker<span className="blink">_</span>
          </span>
          <span className={styles.logoYear}>2799</span>
        </button>

        <nav className={styles.nav} role="navigation" aria-label="Main navigation">
          <ul className={styles.navList}>
            {siteConfig.navigation.map((item, i) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    go(item.href);
                  }}
                  onMouseEnter={() => sfx.hover()}
                  className={`${styles.navLink} ${active === item.href ? styles.active : ''}`}
                  aria-current={active === item.href ? 'true' : undefined}
                >
                  <span className={styles.navNum} aria-hidden="true">
                    {String(i).padStart(2, '0')}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <button
            className={styles.kbd}
            onClick={openPalette}
            aria-label="Open command palette (Control K)"
            title="Command palette (Ctrl+K)"
          >
            <FiCommand size={14} />
            <span>K</span>
          </button>

          <div className={styles.socialLinks} aria-label="Social links">
            <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub" onMouseEnter={() => sfx.hover()}>
              <FiGithub size={17} />
            </a>
            <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn" onMouseEnter={() => sfx.hover()}>
              <FiLinkedin size={17} />
            </a>
          </div>

          <a
            href={`mailto:${siteConfig.contact.email}`}
            className={styles.cta}
            onMouseEnter={() => sfx.hover()}
          >
            <FiLock size={14} />
            <span>Decrypt</span>
          </a>

          <button
            className={styles.menuToggle}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>
      </div>

      <div className={styles.progressBar} aria-hidden="true">
        <div className={styles.progressFill} style={{ width: `${progress}%` }} />
      </div>

      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${isOpen ? styles.open : ''}`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <ul className={styles.mobileNavList}>
          {siteConfig.navigation.map((item, i) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.href);
                }}
                className={`${styles.mobileNavLink} ${active === item.href ? styles.active : ''}`}
              >
                <span className={styles.navNum} aria-hidden="true">
                  {String(i).padStart(2, '0')}
                </span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <div className={styles.mobileCtaRow}>
          <a href={`mailto:${siteConfig.contact.email}`} className={styles.cta} onClick={() => setIsOpen(false)}>
            <FiLock size={14} />
            <span>Open Secure Channel</span>
          </a>
          <button className={styles.ctaSecondary} onClick={openPalette}>
            <FiCommand size={14} />
            <span>Command (⌘K)</span>
          </button>
        </div>
        <div className={styles.mobileSocial}>
          <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
            <FiGithub size={20} />
            <span>GitHub</span>
          </a>
          <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
            <FiLinkedin size={20} />
            <span>LinkedIn</span>
          </a>
          <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Twitter">
            <FiTwitter size={20} />
            <span>Twitter</span>
          </a>
          <a href={siteConfig.social.email} className={styles.socialLink} aria-label="Email">
            <FiMail size={20} />
            <span>Email</span>
          </a>
        </div>
      </div>
    </header>
  );
};
