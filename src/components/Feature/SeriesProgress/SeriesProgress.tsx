import { useCallback, useEffect, useRef, useState, type FC } from 'react';
import clsx from 'clsx';
import { Title, Typography } from '@components/UI';
import { StreakDay } from './components/StreakDay';
import { StreakPrize } from './components/StreakPrize';
import {
  MOCK_STREAK_ITEMS,
  SERIES_PROGRESS_COPY,
  SERIES_PROGRESS_META,
} from './mock';
import styles from './SeriesProgress.module.scss';

const SCROLL_EDGE_THRESHOLD = 2;

export const SeriesProgress: FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  const [showFadeLeft, setShowFadeLeft] = useState(false);
  const [showFadeRight, setShowFadeRight] = useState(true);

  const updateFades = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const { scrollLeft, scrollWidth, clientWidth } = track;
    const maxScroll = scrollWidth - clientWidth;

    setShowFadeLeft(scrollLeft > SCROLL_EDGE_THRESHOLD);
    setShowFadeRight(scrollLeft < maxScroll - SCROLL_EDGE_THRESHOLD);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const focus = focusRef.current;
    if (!track) return;

    if (focus) {
      const trackRect = track.getBoundingClientRect();
      const focusRect = focus.getBoundingClientRect();
      const offset =
        focus.offsetLeft - (trackRect.width - focusRect.width) / 2;

      track.scrollLeft = Math.max(0, offset);
    }

    updateFades();

    track.addEventListener('scroll', updateFades, { passive: true });

    const resizeObserver = new ResizeObserver(updateFades);
    resizeObserver.observe(track);

    return () => {
      track.removeEventListener('scroll', updateFades);
      resizeObserver.disconnect();
    };
  }, [updateFades]);

  return (
    <section className={styles.section} aria-labelledby="series-progress-heading">
      <div className={styles.header}>
        <Title
          tag="h2"
          variant="bold"
          id="series-progress-heading"
          className={styles.heading}
        >
          {SERIES_PROGRESS_COPY.heading}
        </Title>
        <Typography variant="medium" className={styles.description}>
          {SERIES_PROGRESS_COPY.description}
        </Typography>
      </div>

      <div className={styles.card}>
        <div className={styles.meta}>
          <Typography as="span" variant="medium" className={styles.metaText}>
            {SERIES_PROGRESS_COPY.skipsLabel}: {SERIES_PROGRESS_META.skipsAvailable}
          </Typography>
          <Typography as="span" variant="medium" className={styles.metaText}>
            {SERIES_PROGRESS_META.current}/{SERIES_PROGRESS_META.total}
          </Typography>
        </div>

        <div className={styles.trackWrap}>
          <div
            className={clsx(styles.fadeLeft, showFadeLeft && styles.fadeVisible)}
            aria-hidden
          />
          <div
            className={clsx(styles.fadeRight, showFadeRight && styles.fadeVisible)}
            aria-hidden
          />

          <div ref={trackRef} className={styles.track}>
            {MOCK_STREAK_ITEMS.map((item) => {
              const isFocus = item.id === SERIES_PROGRESS_META.focusId;

              if (item.type === 'day') {
                return (
                  <div
                    key={item.id}
                    ref={isFocus ? focusRef : undefined}
                    className={styles.item}
                  >
                    <StreakDay day={item.day} status={item.status} />
                  </div>
                );
              }

              return (
                <div
                  key={item.id}
                  ref={isFocus ? focusRef : undefined}
                  className={styles.item}
                >
                  <StreakPrize
                    day={item.day}
                    status={item.status}
                    label={item.label}
                    amount={item.amount}
                    image={item.image}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
