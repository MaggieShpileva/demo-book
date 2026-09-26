import type { FC } from 'react';
import { BookHtmlPage } from '@components/Feature/Book/components/BookHtmlPage';
import styles from './Stage2LeftPage.module.scss';

export const Stage2LeftPage: FC = () => (
  <BookHtmlPage side="left">
    <div className={styles.gradient} aria-hidden />
  </BookHtmlPage>
);
