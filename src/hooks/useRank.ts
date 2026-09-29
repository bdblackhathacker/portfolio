import { useCallback, useEffect, useState } from 'react';
import { sfx } from '@/utils/sound';

export const RANKS = [
  'SCRIPT_KIDDIE',
  'PACKET_SNIFFER',
  'PAYLOAD_SMITH',
  'ZERO_DAY_HUNTER',
  'GRID_WRAITH',
  'NEO_GHOST_2799',
];

const XP_PER_LEVEL = 120;

const load = () => {
  try {
    return Number(localStorage.getItem('neo-xp') || 0);
  } catch {
    return 0;
  }
};

export const useRank = () => {
  const [xp, setXp] = useState(load);
  const [leveled, setLeveled] = useState<number | null>(null);

  const add = useCallback((n: number) => {
    setXp((prev) => {
      const next = prev + n;
      const prevLvl = Math.floor(prev / XP_PER_LEVEL);
      const nextLvl = Math.floor(next / XP_PER_LEVEL);
      if (nextLvl > prevLvl) {
        setLeveled(nextLvl);
        sfx.levelup();
        setTimeout(() => setLeveled(null), 2600);
      }
      try {
        localStorage.setItem('neo-xp', String(next));
      } catch { /* ignore */ }
      return next;
    });
  }, []);

  // passive XP: scroll depth + clicks + terminal visits
  useEffect(() => {
    let maxScroll = 0;
    const onScroll = () => {
      const h = document.documentElement;
      const pct = h.scrollHeight > h.clientHeight
        ? h.scrollTop / (h.scrollHeight - h.clientHeight)
        : 0;
      if (pct - maxScroll > 0.12) {
        maxScroll = pct;
        add(8);
      }
    };
    const onClick = () => add(1);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('click', onClick);
    const intro = setTimeout(() => add(10), 2500);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('click', onClick);
      clearTimeout(intro);
    };
  }, [add]);

  const level = Math.floor(xp / XP_PER_LEVEL);
  const rank = RANKS[Math.min(level, RANKS.length - 1)];
  const progress = Math.round(((xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100);

  return { xp, level, rank, progress, add, leveled };
};
