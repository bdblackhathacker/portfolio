import { useState } from 'react';
import { siteConfig } from '@/data/config';
import { FiGithub, FiExternalLink, FiBookOpen } from 'react-icons/fi';
import styles from './Projects.module.css';

const categoryColors: Record<string, string> = {
  'Real-Time / E2E': 'green',
  'Security Tooling': 'gray',
  'AI / Defense': 'green',
  'AI / Offense': 'red',
  'Systems / eBPF': 'gray',
};

export const Projects = () => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const featuredProjects = siteConfig.projects.filter((p) => p.featured);
  const otherProjects = siteConfig.projects.filter((p) => !p.featured);

  return (
    <section id="projects" className={styles.section} aria-labelledby="projects-title">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className="term-prompt">$ ls ~/blackhat-ops/ --classified</p>
          <h2 id="projects-title" className={styles.title}>
            Active <span className={styles.accent}>Operations</span>
          </h2>
          <p className={styles.subtitle}>
            Live payloads, each one attacked before it was announced
          </p>
        </div>

        <div className={styles.projectsGrid}>
          {featuredProjects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              categoryColor={categoryColors[project.category] || 'cyan'}
              isHovered={hoveredProject === project.id}
              onHover={() => setHoveredProject(project.id)}
              onLeave={() => setHoveredProject(null)}
            />
          ))}
        </div>

        <div className={styles.otherSection}>
          <h3 className={styles.otherTitle}>Classified Labs</h3>
          <div className={styles.otherGrid}>
            {otherProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                categoryColor={categoryColors[project.category] || 'cyan'}
                isHovered={hoveredProject === project.id}
                onHover={() => setHoveredProject(project.id)}
                onLeave={() => setHoveredProject(null)}
                compact
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    category: string;
    description: string;
    longDescription: string;
    image: string;
    technologies: string[];
    links: {
      live?: string;
      github?: string;
      caseStudy?: string;
      docs?: string;
    };
    featured: boolean;
    year: number;
  };
  categoryColor: string;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
  compact?: boolean;
}

const ProjectCard = ({ project, categoryColor, isHovered, onHover, onLeave, compact = false }: ProjectCardProps) => {
  const colorMap: Record<string, { bg: string; border: string; text: string }> = {
    cyan: { bg: 'rgba(0, 255, 65, 0.08)', border: 'rgba(0, 255, 65, 0.3)', text: '#00ff41' },
    purple: { bg: 'rgba(139, 148, 158, 0.1)', border: 'rgba(139, 148, 158, 0.35)', text: '#8b949e' },
    blue: { bg: 'rgba(0, 255, 65, 0.08)', border: 'rgba(0, 255, 65, 0.3)', text: '#00ff41' },
    orange: { bg: 'rgba(255, 0, 0, 0.08)', border: 'rgba(255, 0, 0, 0.3)', text: '#ff5555' },
    green: { bg: 'rgba(0, 255, 65, 0.1)', border: 'rgba(0, 255, 65, 0.35)', text: '#00ff41' },
    pink: { bg: 'rgba(139, 148, 158, 0.1)', border: 'rgba(139, 148, 158, 0.35)', text: '#8b949e' },
    gray: { bg: 'rgba(139, 148, 158, 0.1)', border: 'rgba(139, 148, 158, 0.35)', text: '#8b949e' },
    red: { bg: 'rgba(255, 0, 0, 0.08)', border: 'rgba(255, 0, 0, 0.3)', text: '#ff5555' },
  };

  const colors = colorMap[categoryColor] || colorMap.cyan;

  return (
    <article 
      className={`${styles.card} ${compact ? styles.cardCompact : ''}`}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      style={{
        '--card-bg': colors.bg,
        '--card-border': colors.border,
        '--card-text': colors.text,
      } as React.CSSProperties}
    >
      <div className={styles.cardImage}>
        <div className={styles.imagePlaceholder}>
          <div className={styles.imageContent}>
            <span className={styles.projectYear}>{project.year}</span>
            <span className={styles.projectCategory}>{project.category}</span>
          </div>
        </div>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.cardHeader}>
          <h3 className={styles.projectTitle}>{project.title}</h3>
          <div 
            className={styles.categoryDot} 
            style={{ backgroundColor: colors.text, boxShadow: `0 0 8px ${colors.text}` }}
            aria-hidden="true"
          />
        </div>

        <p className={styles.projectDescription}>
          {isHovered && !compact ? project.longDescription : project.description}
        </p>

        <div className={styles.techStack}>
          {project.technologies.slice(0, compact ? 3 : 6).map((tech) => (
            <span key={tech} className={styles.techTag}>
              {tech}
            </span>
          ))}
          {project.technologies.length > (compact ? 3 : 6) && (
            <span className={styles.techMore}>
              +{project.technologies.length - (compact ? 3 : 6)}
            </span>
          )}
        </div>

        <div className={styles.cardFooter}>
          <div className={styles.projectLinks}>
            {project.links.live && (
              <a 
                href={project.links.live} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.link} 
                aria-label={`View ${project.title} live`}
                style={{ color: colors.text }}
              >
                <FiExternalLink size={18} />
              </a>
            )}
            {project.links.github && (
              <a 
                href={project.links.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.link} 
                aria-label={`View ${project.title} on GitHub`}
                style={{ color: colors.text }}
              >
                <FiGithub size={18} />
              </a>
            )}
            {project.links.caseStudy && (
              <a 
                href={project.links.caseStudy} 
                className={styles.link} 
                aria-label={`Read case study for ${project.title}`}
                style={{ color: colors.text }}
              >
                <FiBookOpen size={18} />
              </a>
            )}
            {project.links.docs && (
              <a 
                href={project.links.docs} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.link} 
                aria-label={`View ${project.title} documentation`}
                style={{ color: colors.text }}
              >
                <FiBookOpen size={18} />
              </a>
            )}
          </div>

          {project.links.github && (
            <a 
              href={project.links.github} 
              target="_blank" 
              rel="noopener noreferrer" 
              className={styles.viewCode}
              style={{ borderColor: colors.border, color: colors.text }}
            >
              View Code
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
export default Projects;
