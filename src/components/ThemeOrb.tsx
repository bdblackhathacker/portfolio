import { THEMES, getTheme, setTheme, type ThemeId } from '@/utils/theme';
import { sfx } from '@/utils/sound';
import styles from './ThemeOrb.module.css';

export const ThemeOrb = () => {
  const current = getTheme();
  return (
    <div className={styles.orb} role="group" aria-label="Matrix theme switcher">
      {(Object.keys(THEMES) as ThemeId[]).map((id) => (
        <button
          key={id}
          title={THEMES[id].label}
          aria-label={THEMES[id].label}
          className={`${styles.dot} ${current === id ? styles.active : ''}`}
          style={{ background: THEMES[id].accent, boxShadow: current === id ? `0 0 12px ${THEMES[id].accent}` : 'none' }}
          onClick={() => {
            setTheme(id);
            sfx.success();
          }}
          onMouseEnter={() => sfx.hover()}
        />
      ))}
    </div>
  );
};

export default ThemeOrb;
