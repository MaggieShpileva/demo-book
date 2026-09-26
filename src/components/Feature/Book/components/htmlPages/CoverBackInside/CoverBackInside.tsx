import type { FC } from 'react';
import { BookHtmlPage } from '@components/Feature/Book/components/BookHtmlPage';
import styles from './CoverBackInside.module.scss';

export const CoverBackInside: FC = () => (
  <BookHtmlPage side="right">
    <div className={styles.gradient} aria-hidden />
  </BookHtmlPage>
);
