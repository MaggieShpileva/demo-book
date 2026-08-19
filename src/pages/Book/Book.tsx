import type { FC } from 'react';
import { Book as BookFeature } from '@components/Feature';
import styles from './Book.module.scss';

export const Book: FC = () => (
  <div className={styles.page}>
    <BookFeature />
  </div>
);
