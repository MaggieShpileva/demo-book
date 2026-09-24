import type { FC } from 'react';
import clsx from 'clsx';
import { BOOK_COPY } from './constants';
import { Loader } from '@/components/UI';
import { setBookPage, selectBookPage } from '@/store/features/book';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import styles from './Book.module.scss';
import { BookCanvas } from './components/BookCanvas';
import { BookDragProvider } from './components/BookDragState';
import { BookPageProvider } from './components/BookPageState';
import { useBookDelayedPage } from './hooks/useBookDelayedPage';
import { useBookTextures } from './hooks/useBookTextures';

type BookProps = {
  className?: string;
};

export const Book: FC<BookProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectBookPage);
  const setPage = (next: number) => dispatch(setBookPage(next));
  const delayedPage = useBookDelayedPage(page);
  const { progress, ready } = useBookTextures();

  return (
    <BookPageProvider setPage={setPage}>
      <BookDragProvider page={page} setPage={setPage}>
        <section
          className={clsx(styles.root, className)}
          aria-label={BOOK_COPY.title}
        >
          {ready ? <BookCanvas page={page} delayedPage={delayedPage} /> : null}
          {ready ? null : (
            <Loader className={styles.loader} progress={progress} />
          )}
        </section>
      </BookDragProvider>
    </BookPageProvider>
  );
};
