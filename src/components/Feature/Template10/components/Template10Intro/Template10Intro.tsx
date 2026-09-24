import type { FC } from 'react';
import clsx from 'clsx';
import { Title } from '@components/UI';
import styles from './Template10Intro.module.scss';

type Template10IntroProps = {
  title: string;
  className?: string;
};

export const Template10Intro: FC<Template10IntroProps> = ({
  title,
  className,
}) => (
  <Title as="h1" size="displayLg" className={clsx(styles.title, className)}>
    {title}
  </Title>
);
