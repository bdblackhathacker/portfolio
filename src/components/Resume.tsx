import { siteConfig } from '@/data/config';
import { FiPrinter } from 'react-icons/fi';
import { sfx } from '@/utils/sound';
import styles from './Resume.module.css';

export const Resume = () => {
  const print = () => {
    sfx.success();
    window.print();
  };

  return (
    <section id="resume" className={styles.section} aria-labelledby="resume-title">
      <div className={styles.container}>
        <p className="term-prompt">$ lpr ~/cv.pdf --for-recruiters</p>
        <h2 id="resume-title" className={styles.title}>
          One-Page <span className={styles.accent}>CV</span>
        </h2>
        <p className={styles.sub}>
          Print-optimized — hit Print and it comes out clean on any printer, or save as PDF.
        </p>
        <button className={styles.printBtn} onClick={print}>
          <FiPrinter size={16} /> Print / Save PDF
        </button>

        <div id="resume-paper" className={styles.paper}>
          <header className={styles.head}>
            <h3>{siteConfig.developer.fullName}</h3>
            <p className={styles.role}>{siteConfig.developer.title}</p>
            <p className={styles.contactLine}>
              {siteConfig.contact.email} · {siteConfig.social.github} · {siteConfig.social.linkedin}
            </p>
          </header>

          <div className={styles.block}>
            <h4>Profile</h4>
            <p>{siteConfig.developer.description}</p>
          </div>

          <div className={styles.block}>
            <h4>Experience</h4>
            {siteConfig.experience.map((j) => (
              <div key={j.id} className={styles.job}>
                <div className={styles.jobTop}>
                  <strong>{j.position}</strong>
                  <span>{j.period}</span>
                </div>
                <p className={styles.jobMeta}>{j.company} · {j.location}</p>
                <ul>
                  {j.achievements.slice(0, 3).map((a) => (
                    <li key={a}>{a}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={styles.block}>
            <h4>Flagship operations</h4>
            <p>
              {siteConfig.projects
                .filter((p) => p.featured)
                .map((p) => `${p.title} — ${p.description}`)
                .join(' · ')}
            </p>
          </div>

          <div className={styles.block}>
            <h4>Arsenal</h4>
            <p>
              {[
                ...siteConfig.skills.languages,
                ...siteConfig.skills.backend,
                ...siteConfig.skills.cloud,
              ]
                .map((s) => s.name)
                .join(' · ')}
            </p>
            <p>Offense: {siteConfig.skills.frontend.map((s) => s.name).join(' · ')}</p>
          </div>

          <div className={styles.block}>
            <h4>Services</h4>
            <p>
              {siteConfig.services.map((s) => `${s.title} (${s.timeline})`).join(' · ')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
