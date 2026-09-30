import { useState } from 'react';
import { siteConfig } from '@/data/config';
import { FiChevronDown } from 'react-icons/fi';
import { sfx } from '@/utils/sound';
import styles from './FAQ.module.css';

export const FAQ = () => {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-title">
      <div className={styles.container}>
        <p className="term-prompt">$ ./answer_clients.sh --honest</p>
        <h2 id="faq-title" className={styles.title}>
          Client <span className={styles.accent}>FAQ</span>
        </h2>
        <p className={styles.sub}>The questions every company asks before hiring me.</p>

        <div className={styles.list}>
          {siteConfig.faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <div key={f.q} className={`${styles.item} ${isOpen ? styles.open : ''}`}>
                <button
                  className={styles.q}
                  onClick={() => {
                    setOpen(isOpen ? null : i);
                    sfx.click();
                  }}
                  aria-expanded={isOpen}
                >
                  <span>{f.q}</span>
                  <FiChevronDown size={18} className={styles.chev} />
                </button>
                {isOpen && <p className={styles.a}>{f.a}</p>}
              </div>
            );
          })}
        </div>

        <p className={styles.more}>
          Something else? <a href="#contact">Ask directly — response &lt; 24h.</a>
        </p>
      </div>
    </section>
  );
};

export default FAQ;
