import type { FC } from 'react';
import clsx from 'clsx';
import { Title } from '@components/UI';
import styles from './Template07Intro.module.scss';

type Template07IntroProps = {
  title: string;
  badgeText: string;
  className?: string;
};

export const Template07Intro: FC<Template07IntroProps> = ({
  title,
  badgeText,
  className,
}) => (
  <div className={clsx(styles.root, className)}>
    {badgeText ? <p className={styles.badge}>{badgeText}</p> : null}
    <Title as="h1" size="display" className={styles.title}>
      {title}
    </Title>
  </div>
);
