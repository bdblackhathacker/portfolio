import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiGithub, FiLinkedin, FiTwitter, FiMail, FiDisc } from 'react-icons/fi';
import { siteConfig } from '@/data/config';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  return (
    <header className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''} ${isOpen ? styles.open : ''}`}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo} aria-label="Go to homepage">
          <span className={styles.logoText}>BB</span>
          <span className={styles.logoFull}>bdblackhathacker<span className="blink">_</span></span>
        </Link>

        <nav className={styles.nav} role="navigation" aria-label="Main navigation">
          <ul className={styles.navList}>
            {siteConfig.navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href === '/' ? '#root' : item.href}
                  className={`${styles.navLink} ${location.pathname === item.href || (item.href !== '/' && location.pathname.startsWith(item.href)) ? styles.active : ''}`}
                >
                  <span className="font-mono" aria-hidden="true">&gt;_ </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.actions}>
          <div className={styles.socialLinks} aria-label="Social links">
            <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
              <FiGithub size={18} />
            </a>
            <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
              <FiLinkedin size={18} />
            </a>
            <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Twitter">
              <FiTwitter size={18} />
            </a>
          </div>

          <button
            className={styles.menuToggle}
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      <div id="mobile-menu" className={styles.mobileMenu} role="navigation" aria-label="Mobile navigation">
        <ul className={styles.mobileNavList}>
            {siteConfig.navigation.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href === '/' ? '#root' : item.href}
                  className={`${styles.mobileNavLink} ${location.pathname === item.href ? styles.active : ''}`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
        </ul>
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
          <a href={siteConfig.social.discord} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Discord">
              <FiDisc size={20} />
            <span>Discord</span>
          </a>
        </div>
      </div>
    </header>
  );
};