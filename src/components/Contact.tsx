import { useState } from 'react';
import { siteConfig } from '@/data/config';
import { FiSend, FiUser, FiMail, FiMessageSquare, FiGithub, FiLinkedin } from 'react-icons/fi';
import styles from './Contact.module.css';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className={styles.container}>
        <div className={styles.header}>
          <p className="term-prompt">$ ./decrypt_contact.sh --secure</p>
          <h2 id="contact-title" className={styles.title}>
            Open Secure <span className={styles.accent}>Channel</span>
          </h2>
          <p className={styles.subtitle}>
            {siteConfig.contact.description}
          </p>
        </div>

        <div className={styles.content}>
          <div className={styles.info}>
            <div className={styles.infoItem}>
              <FiMail size={24} className={styles.infoIcon} />
              <h3>Email</h3>
              <a href={`mailto:${siteConfig.contact.email}`} className={styles.infoLink}>
                {siteConfig.contact.email}
              </a>
            </div>

            <div className={styles.infoItem}>
              <FiGithub size={24} className={styles.infoIcon} />
              <h3>GitHub</h3>
              <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                github.com/bdblackhathacker
              </a>
            </div>

            <div className={styles.infoItem}>
              <FiLinkedin size={24} className={styles.infoIcon} />
              <h3>LinkedIn</h3>
              <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer" className={styles.infoLink}>
                bdblackhathacker
              </a>
            </div>

            <div className={styles.location}>
              <span className={styles.locationDot} />
              <span className={styles.locationText}>Signal online — remote ops worldwide, response &lt; 24h</span>
            </div>
          </div>

          <form 
            onSubmit={handleSubmit} 
            className={styles.form}
            aria-label="Contact form"
          >
            <div className={styles.formGrid}>
              <div className={styles.formField}>
                <label htmlFor="name" className={styles.fieldLabel}>
                  <FiUser size={16} />
                  <span>Name</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className={styles.fieldInput}
                  aria-required="true"
                />
              </div>

              <div className={styles.formField}>
                <label htmlFor="email" className={styles.fieldLabel}>
                  <FiMail size={16} />
                  <span>Email</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                  className={styles.fieldInput}
                  aria-required="true"
                />
              </div>
            </div>

            <div className={styles.formField}>
              <label htmlFor="subject" className={styles.fieldLabel}>
                <FiMessageSquare size={16} />
                <span>Subject</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="What's this about?"
                required
                className={styles.fieldInput}
                aria-required="true"
              />
            </div>

            <div className={styles.formField}>
              <label htmlFor="message" className={styles.fieldLabel}>
                <FiMessageSquare size={16} />
                <span>Message</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project..."
                rows={5}
                required
                className={styles.fieldTextarea}
                aria-required="true"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className={`${styles.submitBtn} ${isSubmitting ? styles.submitting : ''}`}
              aria-busy={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className={styles.spinner} aria-label="Encrypting" aria-hidden="true" />
                  Encrypting...
                </>
              ) : (
                <>
                  Transmit Payload
                  <FiSend size={18} />
                </>
              )}
            </button>

            {submitStatus === 'success' && (
              <div className={styles.successMessage} role="alert">
                Message encrypted! Channel opens within 24 hours.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
export default Contact;
