import { useEffect, useState } from 'react';
import styles from './SystemHUD.module.css';

const rand = (min: number, max: number) =>
  (Math.random() * (max - min) + min).toFixed(min === 0 ? 0 : 1);

export const SystemHUD = () => {
  const [time, setTime] = useState('');
  const [stats, setStats] = useState({ cpu: '12.4', net: '842', ping: '7', sync: 0 });
  const [online, setOnline] = useState(true);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      // Flavor: show 2799 as the grid-year, real clock as ship-time
      setTime(
        now.toLocaleTimeString('en-GB', { hour12: false }) + ' SHIP-TIME',
      );
      setStats((s) => ({
        cpu: rand(8, 68),
        net: rand(0, 2400),
        ping: rand(0, 18),
        sync: s.sync,
      }));
    };
    tick();
    const t = setInterval(tick, 2000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      const pct = max > 0 ? Math.round((h.scrollTop / max) * 100) : 0;
      setStats((s) => ({ ...s, sync: pct }));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const go = () => setOnline(navigator.onLine);
    window.addEventListener('online', go);
    window.addEventListener('offline', go);
    return () => {
      window.removeEventListener('online', go);
      window.removeEventListener('offline', go);
    };
  }, []);

  return (
    <div className={styles.hud} role="status" aria-label="2799 system status">
      <span className={styles.item}>
        <span className={`${styles.dot} ${online ? styles.on : styles.off}`} />
        {online ? 'GRID ONLINE' : 'OFFLINE'}
      </span>
      <span className={styles.item}>YEAR <b>2799</b></span>
      <span className={`${styles.item} ${styles.hideMobile}`}>{time}</span>
      <span className={`${styles.item} ${styles.hideMobile}`}>CPU {stats.cpu}%</span>
      <span className={`${styles.item} ${styles.hideMobile}`}>NET {stats.net} Tb/s</span>
      <span className={styles.item}>PING {stats.ping}ms</span>
      <span className={styles.item}>SYNC {stats.sync}%</span>
      <div className={styles.syncBar}>
        <div className={styles.syncFill} style={{ width: `${stats.sync}%` }} />
      </div>
    </div>
  );
};

export default SystemHUD;
