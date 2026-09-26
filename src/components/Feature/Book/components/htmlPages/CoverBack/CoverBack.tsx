import type { FC } from 'react';
import { BookHtmlPage } from '@components/Feature/Book/components/BookHtmlPage';
import styles from './CoverBack.module.scss';

export const CoverBack: FC = () => (
  <BookHtmlPage side="left">
    <div className={styles.gradient} aria-hidden />
  </BookHtmlPage>
);
