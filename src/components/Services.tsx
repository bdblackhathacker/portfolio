import { siteConfig } from '@/data/config';
import { FiShield, FiCode, FiSearch, FiZap, FiCheck, FiArrowRight, FiFileText } from 'react-icons/fi';
import { sfx } from '@/utils/sound';
import styles from './Services.module.css';

const icons: Record<string, typeof FiShield> = {
  shield: FiShield,
  code: FiCode,
  search: FiSearch,
  zap: FiZap,
};

export const Services = () => {
  return (
    <section id="services" className={styles.section} aria-labelledby="services-title">
      <div className={styles.container}>
        <p className="term-prompt">$ cat ~/services.md --for-clients</p>
        <h2 id="services-title" className={styles.title}>
          Hire the <span className={styles.accent}>Operator</span>
        </h2>
        <p className={styles.sub}>
          Fixed-scope security work for companies and founders. No hourly bleed, no jargon walls.
        </p>

        <div className={styles.avail}>
          <span className={styles.availDot} />
          <div>
            <strong>{siteConfig.availability.label}</strong>
            <span>{siteConfig.availability.detail}</span>
          </div>
        </div>

        <div className={styles.grid}>
          {siteConfig.services.map((s) => {
            const Icon = icons[s.icon] || FiShield;
            return (
              <article key={s.title} className={styles.card} onMouseEnter={() => sfx.hover()}>
                <div className={styles.cardTop}>
                  <span className={styles.icon}>
                    <Icon size={22} />
                  </span>
                  <span className={styles.timeline}>{s.timeline}</span>
                </div>
                <h3 className={styles.cardTitle}>{s.title}</h3>
                <p className={styles.cardDesc}>{s.description}</p>
                <ul className={styles.points}>
                  {s.points.map((p) => (
                    <li key={p}>
                      <FiCheck size={14} className={styles.check} />
                      {p}
                    </li>
                  ))}
                </ul>
                <a href="#contact" className={styles.cardCta}>
                  Scope this <FiArrowRight size={15} />
                </a>
              </article>
            );
          })}
        </div>

        <h3 className={styles.processTitle}>How an operation runs</h3>
        <ol className={styles.process}>
          {siteConfig.process.map((p) => (
            <li key={p.step} className={styles.step}>
              <span className={styles.stepNum}>{p.step}</span>
              <strong>{p.title}</strong>
              <p>{p.text}</p>
            </li>
          ))}
        </ol>

        <div className={styles.trust}>
          {siteConfig.trust.map((t) => (
            <div key={t.title} className={styles.trustItem}>
              <strong>{t.title}</strong>
              <p>{t.text}</p>
            </div>
          ))}
        </div>

        <div className={styles.ctaRow}>
          <a href="#contact" className={styles.ctaPrimary}>
            Start with a free scope call <FiArrowRight size={17} />
          </a>
          <a href="#resume" className={styles.ctaSecondary}>
            <FiFileText size={16} /> View CV
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
