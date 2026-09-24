import type { FC } from 'react';
import clsx from 'clsx';
import { Title } from '@components/UI';
import styles from './Template09Title.module.scss';

type Template09TitleProps = {
  title: string;
  className?: string;
};

export const Template09Title: FC<Template09TitleProps> = ({
  title,
  className,
}) => (
  <div className={clsx(styles.root, className)}>
    <Title as="h1" size="display2xl" className={styles.title}>
      {title}
    </Title>
  </div>
);
