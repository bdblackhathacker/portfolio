import { siteConfig } from '@/data/config';
import { FiAward } from 'react-icons/fi';
import styles from './Skills.module.css';

export const Skills = () => {
  const { skills } = siteConfig;
  const skillCategories = [
    { key: 'languages', label: 'Languages', icon: '💻' },
    { key: 'frontend', label: 'Offense', icon: '☠️' },
    { key: 'backend', label: 'Build', icon: '⚙️' },
    { key: 'cloud', label: 'Defense / Infra', icon: '🛡️' },
    { key: 'tools', label: 'Field Kit', icon: '🧰' },
  ];

  return (
    <section id="skills" className={styles.section} aria-labelledby="skills-title">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className="term-prompt">$ arsenal --list-weapons</p>
          <h2 id="skills-title" className={styles.title}>
            Hacker <span className={styles.accent}>Arsenal</span>
          </h2>
          <p className={styles.subtitle}>
            Weapons graded by field proficiency
          </p>
        </div>

        <div className={styles.skillsGrid}>
          {skillCategories.map(({ key, label, icon }) => {
            const skillList = skills[key as keyof typeof skills];
            return (
              <div key={key} className={styles.skillCategory}>
                <div className={styles.categoryHeader}>
                  <span className={styles.categoryIcon} aria-hidden="true">{icon}</span>
                  <h3 className={styles.categoryTitle}>{label}</h3>
                  <span className={styles.categoryCount}>{skillList.length} tools</span>
                </div>

                <div className={styles.skillsList}>
                  {skillList.map((skill) => (
                    <SkillBar 
                      key={skill.name} 
                      name={skill.name} 
                      level={skill.level} 
                      index={skillList.indexOf(skill)}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.experienceBar}>
          <h3 className={styles.expTitle}>
            <FiAward className={styles.expIcon} />
            Gray-hat operator — active on the grid
          </h3>
          <div className={styles.expGrid}>
            <div className={styles.expItem}>
              <span className={styles.expValue}>1337</span>
              <span className={styles.expLabel}>Targets Pwned</span>
            </div>
            <div className={styles.expItem}>
              <span className={styles.expValue}>Top 1%</span>
              <span className={styles.expLabel}>CTF Ranking</span>
            </div>
            <div className={styles.expItem}>
              <span className={styles.expValue}>40+</span>
              <span className={styles.expLabel}>Payloads Shipped</span>
            </div>
            <div className={styles.expItem}>
              <span className={styles.expValue}>0day</span>
              <span className={styles.expLabel}>Mindset</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

interface SkillBarProps {
  name: string;
  level: number;
  index: number;
}

const SkillBar = ({ name, level, index }: SkillBarProps) => {
  return (
    <div 
      className={styles.skillItem}
      style={{ 
        animationDelay: `${index * 50}ms`,
        '--progress-delay': `${index * 50}ms`,
      } as React.CSSProperties}
    >
      <div className={styles.skillHeader}>
        <span className={styles.skillName}>{name}</span>
        <span className={styles.skillLevel}>{level}%</span>
      </div>
      <div className={styles.skillBar}>
        <div 
          className={styles.skillProgress}
          style={{ 
            width: '0',
            animationDelay: `calc(${index * 50}ms + 200ms)`,
            '--progress': `${level}%`,
          } as React.CSSProperties}
        />
      </div>
    </div>
  );
};
export default Skills;
