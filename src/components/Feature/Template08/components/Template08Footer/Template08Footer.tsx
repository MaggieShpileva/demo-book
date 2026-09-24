import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Template08Footer.module.scss';

type Template08FooterProps = {
  className?: string;
};

export const Template08Footer: FC<Template08FooterProps> = ({ className }) => (
  <footer className={clsx(styles.root, className)}>
    <p className={styles.slideNumber}>01</p>
  </footer>
);
