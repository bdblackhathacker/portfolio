import { siteConfig } from '@/data/config';
import { FiCheckCircle, FiTarget, FiHeart, FiBookOpen } from 'react-icons/fi';
import styles from './About.module.css';

export const About = () => {
  return (
    <section id="about" className={styles.section} aria-labelledby="about-title">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className="term-prompt">$ whoami --decrypt</p>
          <h2 id="about-title" className={styles.title}>
            About <span className={styles.accent}>the Operator</span>
          </h2>
          <p className={styles.subtitle}>
            The human behind the handle
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.textContent}>
            {siteConfig.about.description.map((paragraph, index) => (
              <p key={index} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}

            <div className={styles.values}>
              <h3 className={styles.valuesTitle}>What I Value</h3>
              <ul className={styles.valuesList}>
                <li className={styles.valueItem}>
                  <FiTarget className={styles.valueIcon} />
                  <div>
                    <strong>Break to Protect</strong>
                    <span>Every exploit found is a patch shipped — offense in service of defense</span>
                  </div>
                </li>
                <li className={styles.valueItem}>
                  <FiCheckCircle className={styles.valueIcon} />
                  <div>
                    <strong>Real-Time or Nothing</strong>
                    <span>Live systems, live payloads, live monitoring — static is dead</span>
                  </div>
                </li>
                <li className={styles.valueItem}>
                  <FiHeart className={styles.valueIcon} />
                  <div>
                    <strong>Leave No Trace</strong>
                    <span>Clean OPSEC, minimal footprint, zero leaked secrets</span>
                  </div>
                </li>
                <li className={styles.valueItem}>
                  <FiBookOpen className={styles.valueIcon} />
                  <div>
                    <strong>Learn in Public</strong>
                    <span>Kernel exploits, eBPF, AI red-teaming — documented as I go</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className={styles.highlights}>
            {siteConfig.about.highlights.map((stat) => (
              <div key={stat.label} className={styles.highlightCard}>
                <div className={styles.highlightValue}>{stat.value}</div>
                <div className={styles.highlightLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
