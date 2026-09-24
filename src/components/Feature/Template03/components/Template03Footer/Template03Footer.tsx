import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Template03Footer.module.scss';

type Template03FooterProps = {
  className?: string;
};

export const Template03Footer: FC<Template03FooterProps> = ({ className }) => (
  <p className={clsx(styles.slideNumber, className)}>01</p>
);
