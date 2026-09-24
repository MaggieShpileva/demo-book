import type { FC } from 'react';
import clsx from 'clsx';
import styles from './FlipCardFace.module.scss';

type FlipCardFaceProps = {
  src: string;
  alt: string;
  isBack?: boolean;
};

export const FlipCardFace: FC<FlipCardFaceProps> = ({
  src,
  alt,
  isBack = false,
}) => (
  <span className={clsx(styles.face, isBack && styles.faceBack)}>
    <img className={styles.image} src={src} alt={alt} decoding="async" />
  </span>
);
