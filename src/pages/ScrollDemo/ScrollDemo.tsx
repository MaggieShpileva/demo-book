import type { FC } from 'react';
import { ScrollTriggeredAnimation } from '@/mock/ScrollTriggeredAnimation';
import styles from './ScrollDemo.module.scss';

export const ScrollDemo: FC = () => (
  <main className={styles.root}>
    <div className={styles.spacer} aria-hidden="true" />
    <ScrollTriggeredAnimation />
  </main>
);
