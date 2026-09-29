import { useEffect, useRef, useState } from 'react';
import styles from './ThreatMap.module.css';

interface Arc {
  x1: number; y1: number; x2: number; y2: number;
  t: number; speed: number; hue: string;
}

const CITIES: [number, number][] = [
  [0.12, 0.35], [0.22, 0.6], [0.3, 0.3], [0.44, 0.55],
  [0.55, 0.3], [0.66, 0.62], [0.76, 0.38], [0.88, 0.55],
];

export const ThreatMap = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stats, setStats] = useState({ blocked: 128400, honey: 37, zero: 3 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let arcs: Arc[] = [];
    const spawn = (w: number, h: number) => {
      const a = CITIES[Math.floor(Math.random() * CITIES.length)];
      const b = CITIES[Math.floor(Math.random() * CITIES.length)];
      if (a === b) return;
      const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary').trim() || '#00ff41';
      arcs.push({
        x1: a[0] * w, y1: a[1] * h, x2: b[0] * w, y2: b[1] * h,
        t: 0, speed: 0.008 + Math.random() * 0.014, hue: accent,
      });
      if (arcs.length > 14) arcs = arcs.slice(-14);
    };

    const resize = () => {
      const r = canvas.getBoundingClientRect();
      canvas.width = r.width * devicePixelRatio;
      canvas.height = r.height * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);
    const spawner = setInterval(() => {
      const r = canvas.getBoundingClientRect();
      spawn(r.width, r.height);
    }, 700);

    const draw = () => {
      const r = canvas.getBoundingClientRect();
      const w = r.width, h = r.height;
      ctx.clearRect(0, 0, w, h);

      // grid dots
      ctx.fillStyle = 'rgba(0,255,65,0.18)';
      for (let x = 0; x < w; x += 26) {
        for (let y = 0; y < h; y += 26) {
          ctx.fillRect(x, y, 1.5, 1.5);
        }
      }

      // city nodes
      const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent-primary').trim() || '#00ff41';
      CITIES.forEach(([cx, cy], i) => {
        const x = cx * w, y = cy * h;
        const pulse = (Date.now() / 900 + i) % 2;
        ctx.beginPath();
        ctx.arc(x, y, 3 + pulse * 2, 0, Math.PI * 2);
        ctx.fillStyle = accent;
        ctx.globalAlpha = 0.9 - pulse * 0.3;
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(x, y, 8 + pulse * 6, 0, Math.PI * 2);
        ctx.strokeStyle = accent;
        ctx.globalAlpha = 0.35 - pulse * 0.12;
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      // attack arcs
      arcs.forEach((a) => {
        a.t += a.speed;
        if (a.t > 1) a.t = 1;
        const mx = (a.x1 + a.x2) / 2;
        const my = Math.min(a.y1, a.y2) - Math.hypot(a.x2 - a.x1, a.y2 - a.y1) * 0.25;
        const px = (1 - a.t) * (1 - a.t) * a.x1 + 2 * (1 - a.t) * a.t * mx + a.t * a.t * a.x2;
        const py = (1 - a.t) * (1 - a.t) * a.y1 + 2 * (1 - a.t) * a.t * my + a.t * a.t * a.y2;
        ctx.beginPath();
        ctx.moveTo(a.x1, a.y1);
        ctx.quadraticCurveTo(mx, my, a.x2, a.y2);
        ctx.strokeStyle = a.hue;
        ctx.globalAlpha = 0.35;
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = a.t >= 1 ? '#ff3355' : a.hue;
        ctx.shadowColor = a.hue;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      });
      arcs = arcs.filter((a) => a.t < 1);

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const statTimer = setInterval(() => {
      setStats((s) => ({
        blocked: s.blocked + Math.floor(Math.random() * 17),
        honey: s.honey + (Math.random() > 0.9 ? 1 : 0),
        zero: s.zero,
      }));
    }, 1500);

    return () => {
      cancelAnimationFrame(raf);
      clearInterval(spawner);
      clearInterval(statTimer);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <section className={styles.section} aria-labelledby="threat-title">
      <div className={styles.container}>
        <p className="term-prompt">$ live_threats --grid 2799 --tail</p>
        <h2 id="threat-title" className={styles.title}>
          Live <span className={styles.accent}>Threat Grid</span>
        </h2>
        <p className={styles.sub}>Honeypots breathing. Attacks arcing. All blocked in real time.</p>
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.v}>{stats.blocked.toLocaleString()}</span>
            <span className={styles.l}>attacks vaporized</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.v}>{stats.honey}</span>
            <span className={styles.l}>honeypots live</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.v}>{stats.zero}day</span>
            <span className={styles.l}>mindset</span>
          </div>
        </div>
        <div className={styles.mapWrap}>
          <canvas ref={canvasRef} className={styles.map} aria-label="Animated global threat map" />
          <div className={styles.scan} />
        </div>
      </div>
    </section>
  );
};

export default ThreatMap;
