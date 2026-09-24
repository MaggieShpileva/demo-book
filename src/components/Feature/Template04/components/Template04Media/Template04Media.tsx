import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Template04Media.module.scss';

type Template04MediaProps = {
  images: string[];
  imageAlt: string;
  badgeText?: string;
  className?: string;
};

const FRAME_CLASS_NAMES = [
  styles.frameTop,
  styles.frameMiddle,
  styles.frameBottom,
] as const;

export const Template04Media: FC<Template04MediaProps> = ({
  images,
  imageAlt,
  badgeText,
  className,
}) => (
  <div className={clsx(styles.root, className)}>
    {FRAME_CLASS_NAMES.map((frameClass, index) => {
      const imageSrc = images[index];

      return (
        <div key={frameClass} className={clsx(styles.frame, frameClass)}>
          {imageSrc ? (
            <img
              className={styles.image}
              src={imageSrc}
              alt={`${imageAlt}, вид ${index + 1}`}
            />
          ) : null}
          {index === 0 && badgeText ? (
            <p className={styles.badge}>{badgeText}</p>
          ) : null}
        </div>
      );
    })}
  </div>
);
