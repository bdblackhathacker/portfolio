export type ThemeId = 'neon' | 'cyan' | 'amber' | 'blood';

export const THEMES: Record<ThemeId, { label: string; accent: string; glow: string }> = {
  neon: { label: 'NEON GREEN', accent: '#00ff41', glow: 'rgba(0,255,65,.35)' },
  cyan: { label: 'CYAN ICE', accent: '#00e5ff', glow: 'rgba(0,229,255,.35)' },
  amber: { label: 'AMBER OPS', accent: '#ffb000', glow: 'rgba(255,176,0,.35)' },
  blood: { label: 'BLOOD RED', accent: '#ff3355', glow: 'rgba(255,51,85,.35)' },
};

export const getTheme = (): ThemeId => {
  try {
    const t = localStorage.getItem('neo-theme') as ThemeId | null;
    if (t && THEMES[t]) return t;
  } catch { /* ignore */ }
  return 'neon';
};

export const setTheme = (t: ThemeId) => {
  document.documentElement.dataset.theme = t;
  try {
    localStorage.setItem('neo-theme', t);
  } catch { /* ignore */ }
};

export const initTheme = () => setTheme(getTheme());

export const cycleTheme = (): ThemeId => {
  const order: ThemeId[] = ['neon', 'cyan', 'amber', 'blood'];
  const next = order[(order.indexOf(getTheme()) + 1) % order.length];
  setTheme(next);
  return next;
};
