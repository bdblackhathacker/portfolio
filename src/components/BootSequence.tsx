import { useEffect, useState } from 'react';
import styles from './BootSequence.module.css';

const BOOT_LINES = [
  'NEO-GRID OS v27.99.0 — quantum kernel',
  'neural link .............. OK',
  'holo-render engine ....... OK',
  'tor-quantum relay ........ OK',
  'ai sentry swarm .......... OK',
  'decrypting operator profile [bdblackhathacker]',
  'time-sync: YEAR 2799 // sector 7G',
  'ACCESS GRANTED — welcome, traveler',
];

export const BootSequence = ({ onDone }: { onDone: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    let lineIdx = 0;
    let pct = 0;
    const lineTimer = setInterval(() => {
      if (lineIdx < BOOT_LINES.length) {
        setLines((prev) => [...prev, BOOT_LINES[lineIdx]]);
        lineIdx += 1;
      }
    }, 260);

    const pctTimer = setInterval(() => {
      pct += Math.random() * 14 + 4;
      if (pct >= 100) {
        pct = 100;
        clearInterval(pctTimer);
        clearInterval(lineTimer);
        setLines((prev) =>
          prev.includes(BOOT_LINES[BOOT_LINES.length - 1])
            ? prev
            : [...prev, BOOT_LINES[BOOT_LINES.length - 1]],
        );
        setTimeout(() => {
          setLeaving(true);
          setTimeout(onDone, 450);
        }, 500);
      }
      setProgress(Math.floor(pct));
    }, 180);

    const skip = () => {
      clearInterval(lineTimer);
      clearInterval(pctTimer);
      onDone();
    };
    const onKey = () => skip();
    window.addEventListener('keydown', onKey);

    // auto-skip safety after 6s
    const safety = setTimeout(skip, 6000);

    return () => {
      clearInterval(lineTimer);
      clearInterval(pctTimer);
      clearTimeout(safety);
      window.removeEventListener('keydown', onKey);
    };
  }, [onDone]);

  return (
    <div className={`${styles.overlay} ${leaving ? styles.leaving : ''}`} role="status" aria-label="System boot sequence">
      <div className={styles.box}>
        <p className="term-prompt">$ ./boot_sequence.sh --year 2799 --quantum</p>
        <h1 className={styles.year}>
          27<span className={styles.accent}>99</span>
        </h1>
        <p className={styles.sub}>NEO-GRID // QUANTUM UPLINK ESTABLISHING</p>

        <div className={styles.log} aria-live="polite">
          {lines.map((l, i) => (
            <div key={i} className={styles.line}>
              <span className={styles.chev}>&gt;</span> {l}
            </div>
          ))}
          <span className="blink">_</span>
        </div>

        <div className={styles.bar}>
          <div className={styles.fill} style={{ width: `${progress}%` }} />
        </div>
        <div className={styles.meta}>
          <span>SYNC {progress}%</span>
          <span>press any key to skip</span>
        </div>
      </div>
    </div>
  );
};

export default BootSequence;
