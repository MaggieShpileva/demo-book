import type { CSSProperties, FC } from 'react';
import clsx from 'clsx';
import styles from './Loader.module.scss';

type LoaderProps = {
  progress?: number;
  className?: string;
};

const clampProgress = (progress: number) =>
  Math.min(100, Math.max(0, progress));

export const Loader: FC<LoaderProps> = ({ progress = 0, className }) => {
  const value = clampProgress(progress);

  return (
    <div
      className={clsx(styles.root, className)}
      style={{ '--loader-progress': `${value}%` } as CSSProperties}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(value)}
      aria-label="30 легенд"
    >
      <p className={styles.thirty}>30</p>
      <p className={styles.word}>легенд</p>
    </div>
  );
};
