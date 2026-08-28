import type { FC } from 'react';
import styles from '../../components/BookHtmlPage/BookHtmlPage.module.scss';

export const BlankPage: FC = () => (
  <article className={styles.root} aria-hidden />
);
