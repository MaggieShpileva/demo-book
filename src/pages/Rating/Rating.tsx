import type { FC } from 'react';
import { Tasks } from '@components/Feature';
import styles from './Rating.module.scss';

export const Rating: FC = () => (
  <div className={styles.page}>
    <Tasks />
  </div>
);
