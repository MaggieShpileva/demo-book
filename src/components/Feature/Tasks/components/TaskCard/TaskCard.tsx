import type { FC } from 'react';
import clsx from 'clsx';
import WEBP_bonusCoin from '@assets/images/tasks/bonus-coin.webp';
import styles from './TaskCard.module.scss';

type TaskCardProps = {
  title: string;
  description: string;
  reward: number;
  coverSrc: string;
  timeLeft?: string;
  claimLabel?: string;
  className?: string;
  onClaim?: () => void;
};

export const TaskCard: FC<TaskCardProps> = ({
  title,
  description,
  reward,
  coverSrc,
  timeLeft,
  claimLabel,
  className,
  onClaim,
}) => (
  <article className={clsx(styles.card, className)}>
    <div className={styles.media}>
      <img className={styles.cover} src={coverSrc} alt={`Обложка задания: ${title}`} />
      <span className={styles.reward}>
        <img className={styles.coin} src={WEBP_bonusCoin} alt="Бонусная монета" width={14} height={14} />
        +{reward}
      </span>
    </div>
    <div className={styles.body}>
      <div className={styles.header}>
        <h3 className={styles.title}>{title}</h3>
        {timeLeft != null && <span className={styles.timer}>{timeLeft}</span>}
      </div>
      <p className={styles.description}>{description}</p>
      {claimLabel != null && (
        <button type="button" className={styles.claim} onClick={onClaim}>
          {claimLabel}
        </button>
      )}
    </div>
  </article>
);
