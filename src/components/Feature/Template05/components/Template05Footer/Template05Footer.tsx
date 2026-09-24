import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Template05Footer.module.scss';

type Template05FooterProps = {
  className?: string;
};

export const Template05Footer: FC<Template05FooterProps> = ({ className }) => (
  <footer className={clsx(styles.root, className)}>
    <p className={styles.slideNumber}>01</p>
  </footer>
);
