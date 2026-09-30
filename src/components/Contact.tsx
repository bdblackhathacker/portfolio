import { useState } from 'react';
import { siteConfig } from '@/data/config';
import { FiSend, FiUser, FiMail, FiMessageSquare, FiGithub, FiLinkedin, FiCopy, FiCheck } from 'react-icons/fi';
import { sfx } from '@/utils/sound';
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
  const [copied, setCopied] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.contact.email);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = siteConfig.contact.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    sfx.success();
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // No backend on a static portfolio — compose a real email instead of faking it.
    const subject = encodeURIComponent(`[Portfolio Op] ${formData.subject}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`,
    );
    setTimeout(() => {
      window.location.href = `mailto:${siteConfig.contact.email}?subject=${subject}&body=${body}`;
      setIsSubmitting(false);
      setSubmitStatus('success');
      sfx.success();
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 600);
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
              <button
                type="button"
                onClick={copyEmail}
                className={styles.infoLink}
                aria-label="Copy email address"
                style={{ marginTop: '0.4rem', fontSize: '0.8rem', opacity: 0.85 }}
              >
                {copied ? <FiCheck size={14} /> : <FiCopy size={14} />}
                <span style={{ marginLeft: '0.35rem' }}>{copied ? 'Copied!' : 'Copy email'}</span>
              </button>
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
              <span className={styles.locationText}>{siteConfig.availability.label} — {siteConfig.availability.detail}</span>
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
                Opening your mail client with the payload addressed — or email me directly above.
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};
export default Contact;
