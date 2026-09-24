import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Template03Intro.module.scss';

type Template03IntroProps = {
  badgeText: string;
  className?: string;
};

export const Template03Intro: FC<Template03IntroProps> = ({
  badgeText,
  className,
}) =>
  badgeText ? (
    <p className={clsx(styles.root, className)}>{badgeText}</p>
  ) : null;
