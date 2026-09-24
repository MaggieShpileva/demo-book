import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Template09Footer.module.scss';

type Template09FooterProps = {
  className?: string;
};

export const Template09Footer: FC<Template09FooterProps> = ({ className }) => (
  <footer className={clsx(styles.root, className)}>
    <p className={styles.slideNumber}>01</p>
  </footer>
);
