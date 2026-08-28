import type { FC } from 'react';
import { BOOK_COPY } from '../../mock';
import styles from './BookLoader.module.scss';

export const BookLoader: FC = () => (
  <div
    className={styles.root}
    role="status"
    aria-live="polite"
    aria-busy="true"
    aria-label={BOOK_COPY.loading}
  >
    <span className={styles.spinner} aria-hidden />
  </div>
);
