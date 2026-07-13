import type { FC } from 'react';
import clsx from 'clsx';
import { Typography } from '@components/UI';
import { StreakDay } from '../StreakDay';
import type { PrizeStatus } from '../../mock';
import styles from './StreakPrize.module.scss';

type StreakPrizeProps = {
  day: number;
  status: PrizeStatus;
  label: string;
  amount: string;
  image: string;
  className?: string;
};

export const StreakPrize: FC<StreakPrizeProps> = ({
  day,
  status,
  label,
  amount,
  image,
  className,
}) => {
  const isClaimed = status === 'claimed';
  const isLocked = status === 'locked';
  const dayStatus = isLocked ? 'locked' : 'open';

  return (
    <div
      className={clsx(
        styles.prize,
        isClaimed && styles.prizeClaimed,
        isLocked && styles.prizeLocked,
        className
      )}
      aria-label={`День ${day}: ${amount}`}
    >
      <StreakDay day={day} status={dayStatus} className={styles.daySlot} />

      <div className={styles.content}>
        <Typography as="p" variant="bold" className={styles.label}>
          {label.split('\n').map((line, index, lines) => (
            <span key={line}>
              {line}
              {index < lines.length - 1 ? <br /> : null}
            </span>
          ))}
        </Typography>
        <Typography as="p" variant="bold" className={styles.amount}>
          {amount}
        </Typography>
      </div>

      <div className={clsx(styles.visual, isLocked && styles.visualMuted)} aria-hidden>
        <img className={styles.image} src={image} alt="" />
      </div>
    </div>
  );
};
