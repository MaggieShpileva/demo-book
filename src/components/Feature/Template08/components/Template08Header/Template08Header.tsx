import type { FC } from 'react';
import clsx from 'clsx';
import { Title } from '@components/UI';
import styles from './Template08Header.module.scss';

type Template08HeaderProps = {
  brand: string;
  name: string;
  pageNumber?: string;
  className?: string;
};

export const Template08Header: FC<Template08HeaderProps> = ({
  brand,
  name,
  pageNumber = '0001',
  className,
}) => (
  <header className={clsx(styles.root, className)}>
    <Title as="h1" size="xlarge" className={styles.title}>
      {`${brand} ${name}`}
    </Title>
    <p className={styles.pageNumber}>{pageNumber}</p>
  </header>
);
