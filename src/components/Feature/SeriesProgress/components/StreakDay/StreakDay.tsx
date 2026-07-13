import type { FC } from 'react';
import clsx from 'clsx';
import { Typography } from '@components/UI';
import SVG_ArrowMint from '@assets/icons/arrow-mint.svg?react';
import SVG_StatusStar from '@assets/icons/status-star.svg?react';
import type { DayStatus } from '../../mock';
import styles from './StreakDay.module.scss';

type StreakDayProps = {
  day: number;
  status: DayStatus;
  className?: string;
};

export const StreakDay: FC<StreakDayProps> = ({ day, status, className }) => {
  const isOpen = status === 'open';

  return (
    <div
      className={clsx(styles.day, isOpen ? styles.dayOpen : styles.dayLocked, className)}
      aria-label={`День ${day}`}
    >
      <div className={clsx(styles.badge, isOpen ? styles.badgeOpen : styles.badgeLocked)}>
        <Typography as="span" variant="bold" className={styles.badgeText}>
          {day}
        </Typography>
      </div>

      <div className={clsx(styles.status, isOpen ? styles.statusOpen : styles.statusLocked)}>
        {isOpen ? (
          <SVG_ArrowMint className={styles.statusIcon} aria-hidden />
        ) : (
          <SVG_StatusStar className={styles.starIcon} aria-hidden />
        )}
      </div>
    </div>
  );
};
