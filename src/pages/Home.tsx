import type { FC } from 'react';
import { Predictions, SeriesProgress } from '@components/Feature';
import styles from './Home.module.scss';

export const Home: FC = () => {
  return (
    <div className={styles.page}>
      <SeriesProgress />
      <Predictions />
    </div>
  );
};
