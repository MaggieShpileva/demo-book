import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Template07Footer.module.scss';

type Template07FooterProps = {
  className?: string;
};

export const Template07Footer: FC<Template07FooterProps> = ({ className }) => (
  <footer className={clsx(styles.root, className)}>
    <p className={styles.slideNumber}>01</p>
  </footer>
);
