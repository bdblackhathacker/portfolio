import { siteConfig } from '@/data/config';
import { FiGithub, FiLinkedin, FiTwitter, FiMail, FiArrowUp } from 'react-icons/fi';
import styles from './Footer.module.css';

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>BB</span>
            <div>
              <h3 className={styles.name}>{siteConfig.developer.fullName}</h3>
              <p className={styles.title}>{siteConfig.developer.title}</p>
            </div>
          </div>
          <button 
            className={styles.scrollToTop} 
            onClick={scrollToTop} 
            aria-label="Scroll to top"
          >
            <FiArrowUp size={20} />
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.nav}>
            <h4 className={styles.navTitle}>Navigation</h4>
            <ul className={styles.navList}>
              {siteConfig.navigation.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className={styles.navLink}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.social}>
            <h4 className={styles.socialTitle}>Connect</h4>
            <ul className={styles.socialList}>
              <li>
                <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub">
                  <FiGithub size={20} />
                </a>
              </li>
              <li>
                <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                  <FiLinkedin size={20} />
                </a>
              </li>
              <li>
                <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Twitter">
                  <FiTwitter size={20} />
                </a>
              </li>
              <li>
                <a href={siteConfig.social.email} className={styles.socialLink} aria-label="Email">
                  <FiMail size={20} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p className={styles.copyright}>
            {siteConfig.footer.copyright}
          </p>
          <p className={styles.madeWith}>
            {siteConfig.footer.madeWith}
          </p>
        </div>
      </div>
    </footer>
  );
};