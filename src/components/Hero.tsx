import { HeroCanvas } from './Scene3D';
import { Typewriter } from './Typewriter';
import { siteConfig } from '@/data/config';
import { FiArrowRight, FiArrowDown, FiGithub, FiLinkedin, FiTwitter, FiMail } from 'react-icons/fi';
import styles from './Hero.module.css';

export const Hero = () => {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <HeroCanvas />
      
      <div className={styles.content}>
        <div className={styles.badge} data-aos="fade-up">
          <span className={styles.badgeDot} />
          <span className="font-mono">root@neo-grid:~# ./boot_sequence.sh --year 2799</span>
        </div>

        <h1 id="hero-title" className={styles.title} data-aos="fade-up" data-aos-delay="100">
          <span className={styles.name}>BDBLACKHAT</span><br />HACKER<span className="blink">_</span>
        </h1>

        <h2 className={styles.subtitle} data-aos="fade-up" data-aos-delay="200">
          {siteConfig.developer.title}
          <br />
          <span className={styles.typeLine}>
            &gt; <Typewriter words={['penetration testing', 'quantum CTF ops', 'E2E real-time builds', 'eBPF rootkit hunting', 'AI red-teaming', 'blue-team hardening']} speed={55} pause={2200} />
          </span>
        </h2>

        <p className={styles.description} data-aos="fade-up" data-aos-delay="300">
          {siteConfig.developer.description}
        </p>

        <div className={styles.avail} data-aos="fade-up" data-aos-delay="350">
          <span className={styles.availDot} />
          <span>{siteConfig.availability.label} — {siteConfig.availability.detail}</span>
        </div>

        <div className={styles.ctaGroup} data-aos="fade-up" data-aos-delay="400">
          <a href="#projects" className={styles.ctaPrimary}>
            View Operations
            <FiArrowRight size={18} aria-hidden="true" />
          </a>
          <a href="#contact" className={styles.ctaSecondary}>
            Open Secure Channel
          </a>
        </div>

        <div className={styles.stats} data-aos="fade-up" data-aos-delay="500">
          {siteConfig.about.highlights.map((stat) => (
            <div key={stat.label} className={styles.stat}>
              <div className={styles.statValue}>{stat.value}</div>
              <div className={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div className={styles.socialLinks} data-aos="fade-up" data-aos-delay="600" role="list" aria-label="Social links">
          <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="GitHub" role="listitem">
            <FiGithub size={20} />
          </a>
          <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn" role="listitem">
            <FiLinkedin size={20} />
          </a>
          <a href={siteConfig.social.twitter} target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Twitter" role="listitem">
            <FiTwitter size={20} />
          </a>
          <a href={siteConfig.social.email} className={styles.socialLink} aria-label="Email" role="listitem">
            <FiMail size={20} />
          </a>
        </div>

        <div className={styles.scrollIndicator} data-aos="fade-up" data-aos-delay="800" aria-hidden="true">
          <span className={styles.scrollText}>scroll to decrypt</span>
          <div className={styles.scrollArrow}>
            <FiArrowDown size={20} />
          </div>
        </div>
      </div>
    </section>
  );
};
export default Hero;
