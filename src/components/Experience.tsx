import { siteConfig } from '@/data/config';
import { FiBriefcase, FiCode, FiGlobe, FiAward } from 'react-icons/fi';
import type { IconType } from 'react-icons/lib';
import styles from './Experience.module.css';

const typeIcons: Record<string, IconType> = {
  'full-time': FiBriefcase,
  'internship': FiAward,
  'freelance': FiGlobe,
  'contract': FiCode,
};

export const Experience = () => {
  return (
    <section id="experience" className={styles.section} aria-labelledby="experience-title">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className="term-prompt">$ tail -f /var/log/ops.log</p>
          <h2 id="experience-title" className={styles.title}>
            Operation <span className={styles.accent}>Log</span>
          </h2>
          <p className={styles.subtitle}>
            Campaigns run, systems hardened, payloads shipped
          </p>
        </div>

        <div className={styles.timeline} role="list" aria-label="Work experience">
          {siteConfig.experience.map((job) => (
            <article key={job.id} className={styles.timelineItem} role="listitem">
              <div className={styles.timelineMarker}>
                <div className={styles.markerDot} />
                <div className={styles.markerLine} />
              </div>

              <div className={styles.card}>
                <div className={styles.cardHeader}>
                <div className={styles.typeBadge}>
                  {(() => {
                    const Icon = typeIcons[job.type] || FiBriefcase;
                    return <Icon size={14} className={styles.typeIcon} aria-hidden="true" />;
                  })()}
                  <span>{job.type.replace('-', ' ')}</span>
                </div>
                  <div className={styles.period}>{job.period}</div>
                </div>

                <div className={styles.cardBody}>
                  <h3 className={styles.position}>{job.position}</h3>
                  <div className={styles.companyRow}>
                    <span className={styles.company}>{job.company}</span>
                    <span className={styles.location}>{job.location}</span>
                  </div>
                  <p className={styles.description}>{job.description}</p>

                  <ul className={styles.achievements}>
                    {job.achievements.map((achievement, i) => (
                      <li key={i} className={styles.achievement}>
                        {achievement}
                      </li>
                    ))}
                  </ul>

                  <div className={styles.techStack} aria-label="Technologies used">
                    {job.technologies.map((tech) => (
                      <span key={tech} className={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Experience;
