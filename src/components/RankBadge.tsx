import { useRank } from '@/hooks/useRank';
import styles from './RankBadge.module.css';

export const RankBadge = () => {
  const { xp, rank, progress, leveled } = useRank();

  return (
    <>
      <div className={styles.badge} title={`${xp} XP earned by exploring`}>
        <span className={styles.rank}>{rank}</span>
        <div className={styles.bar}>
          <div className={styles.fill} style={{ width: `${progress}%` }} />
        </div>
        <span className={styles.xp}>{xp} XP</span>
      </div>
      {leveled !== null && (
        <div className={styles.levelup} role="alert">
          <div className={styles.lvBox}>
            <p className="term-prompt">$ rank --up</p>
            <h3>RANK UP</h3>
            <p>new clearance: <b>{rank}</b></p>
            <p className={styles.lvSub}>the grid fears you a little more</p>
          </div>
        </div>
      )}
    </>
  );
};

export default RankBadge;
