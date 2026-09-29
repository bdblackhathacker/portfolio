import { useEffect, useMemo, useRef, useState } from 'react';
import { siteConfig } from '@/data/config';
import { cycleTheme } from '@/utils/theme';
import { sfx, isSoundOn, setSoundOn } from '@/utils/sound';
import styles from './CommandPalette.module.css';

interface Action {
  id: string;
  group: string;
  label: string;
  hint: string;
  run: () => void;
}

export const CommandPalette = ({ onHack }: { onHack?: () => void }) => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
        sfx.click();
      }
      if (e.key === 'Escape') setOpen(false);
    };
    const onExternal = () => {
      setOpen(true);
      sfx.click();
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('neo:open-palette', onExternal);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('neo:open-palette', onExternal);
    };
  }, []);

  useEffect(() => {
    if (open) {
      setQ('');
      setTimeout(() => inputRef.current?.focus(), 30);
    }
  }, [open ]);

  const go = (href: string) => {
    setOpen(false);
    sfx.success();
    const el = document.querySelector(href === '/' ? '#root' : href);
    el?.scrollIntoView({ behavior: 'smooth' });
    if (href === '/') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const actions: Action[] = useMemo(
    () => [
      ...siteConfig.navigation.map((n) => ({
        id: `go-${n.href}`,
        group: 'NAVIGATE',
        label: `Go to ${n.label}`,
        hint: n.href,
        run: () => go(n.href === '/' ? '/' : n.href),
      })),
      {
        id: 'theme',
        group: 'SYSTEM',
        label: 'Cycle matrix theme (neon → cyan → amber → blood)',
        hint: 'theme',
        run: () => {
          cycleTheme();
          sfx.success();
          setOpen(false);
        },
      },
      {
        id: 'sound',
        group: 'SYSTEM',
        label: isSoundOn() ? 'Mute synth sound FX' : 'Enable synth sound FX',
        hint: 'audio',
        run: () => {
          setSoundOn(!isSoundOn());
          sfx.click();
          setOpen(false);
        },
      },
      {
        id: 'hack',
        group: 'FUN',
        label: 'Run breach simulation',
        hint: 'hack',
        run: () => {
          setOpen(false);
          onHack?.();
          document.querySelector('#terminal')?.scrollIntoView({ behavior: 'smooth' });
        },
      },
      {
        id: 'email',
        group: 'CONTACT',
        label: `Email ${siteConfig.contact.email}`,
        hint: 'mailto',
        run: () => {
          setOpen(false);
          window.location.href = `mailto:${siteConfig.contact.email}`;
        },
      },
      {
        id: 'github',
        group: 'CONTACT',
        label: 'Open GitHub profile',
        hint: 'code',
        run: () => {
          setOpen(false);
          window.open(siteConfig.social.github, '_blank');
        },
      },
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [open],
  );

  const filtered = actions.filter(
    (a) =>
      !q ||
      a.label.toLowerCase().includes(q.toLowerCase()) ||
      a.hint.toLowerCase().includes(q.toLowerCase()),
  );

  if (!open) {
    return (
      <button className={styles.trigger} onClick={() => setOpen(true)} aria-label="Open command palette">
        <span>⌘K</span> command
      </button>
    );
  }

  return (
    <div className={styles.overlay} onClick={() => setOpen(false)}>
      <div className={styles.box} onClick={(e) => e.stopPropagation()} role="dialog" aria-label="Command palette">
        <input
          ref={inputRef}
          className={styles.input}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Type a command — try: theme, hack, contact..."
        />
        <div className={styles.list}>
          {filtered.map((a) => (
            <button
              key={a.id}
              className={styles.item}
              onClick={() => a.run()}
              onMouseEnter={() => sfx.hover()}
            >
              <span className={styles.group}>{a.group}</span>
              <span className={styles.label}>{a.label}</span>
              <span className={styles.hint}>{a.hint}</span>
            </button>
          ))}
          {filtered.length === 0 && <div className={styles.empty}>no ops match “{q}”</div>}
        </div>
        <div className={styles.foot}>
          <span>↑↓ navigate</span>
          <span>↵ run</span>
          <span>esc close</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
