import type { FC } from 'react';
import { BookHtmlPage } from '@components/Feature/Book/components/BookHtmlPage';
import styles from './Stage1LeftPage.module.scss';

export const Stage1LeftPage: FC = () => (
  <BookHtmlPage side="left">
    <div className={styles.texture} aria-hidden />
  </BookHtmlPage>
);
