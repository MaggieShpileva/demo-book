import type { FC } from 'react';
import clsx from 'clsx';
import { Button, Typography } from '@components/UI';
import SVG_Clock from '@assets/icons/clock.svg?react';
import SVG_ArrowUpRight from '@assets/icons/arrow-up-right.svg?react';
import SVG_CardPattern from '@assets/images/predictions/card-pattern.svg';
import type { MatchCardData } from '../../mock';
import styles from './MatchCard.module.scss';

type MatchCardProps = {
  data: MatchCardData;
  className?: string;
  onCtaClick?: (id: string) => void;
};

const formatOdds = (odds: number) => odds.toFixed(2);

export const MatchCard: FC<MatchCardProps> = ({
  data,
  className,
  onCtaClick,
}) => {
  const { hoursLeft, minutesLeft, status, sport, title, home, away, ctaLabel } =
    data;

  return (
    <article className={clsx(styles.card, className)}>
      <img
        className={styles.pattern}
        src={SVG_CardPattern}
        alt=""
        aria-hidden
      />

      <div className={styles.info}>
        <div className={styles.statusLine}>
          <div className={styles.timer}>
            <SVG_Clock className={styles.timerIcon} aria-hidden />
            <Typography as="span" variant="bold" className={styles.timerText}>
              <span className={styles.timerValue}>{hoursLeft}</span>
              <span className={styles.timerUnit}>ч</span>
              {' '}
              <span className={styles.timerValue}>{minutesLeft}</span>
              <span className={styles.timerUnit}>м</span>
            </Typography>
          </div>

          <div className={styles.statusBadge}>
            <Typography as="span" variant="bold" className={styles.statusText}>
              {status}
            </Typography>
            <span className={styles.statusDot} aria-hidden />
            <Typography as="span" variant="bold" className={styles.statusText}>
              {sport}
            </Typography>
          </div>
        </div>

        <Typography as="p" variant="medium" className={styles.title}>
          {title}
        </Typography>
      </div>

      <div className={styles.teams}>
        <div className={styles.avatars}>
          <div className={styles.avatar}>
            <img src={home.image} alt={home.name} className={styles.avatarImage} />
          </div>
          <div className={styles.avatar}>
            <img src={away.image} alt={away.name} className={styles.avatarImage} />
          </div>
        </div>

        <div className={styles.meta}>
          <div className={styles.odds}>
            <div className={styles.oddsSide}>
              <span className={styles.oddsValue}>{formatOdds(home.odds)}</span>
            </div>
            <div className={clsx(styles.oddsSide, styles.oddsSideRight)}>
              <span className={styles.oddsValue}>{formatOdds(away.odds)}</span>
            </div>
          </div>

          <div className={styles.names}>
            <Typography as="p" variant="medium" className={styles.name}>
              {home.name}
            </Typography>
            <Typography
              as="p"
              variant="medium"
              className={clsx(styles.name, styles.nameRight)}
            >
              {away.name}
            </Typography>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <Button
          type="button"
          className={styles.cta}
          onClick={() => onCtaClick?.(data.id)}
        >
          <SVG_ArrowUpRight className={styles.ctaIcon} aria-hidden />
          <span>{ctaLabel}</span>
        </Button>
      </div>
    </article>
  );
};
