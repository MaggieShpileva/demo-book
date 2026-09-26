import { useEffect, useLayoutEffect, useRef, useState, type FC } from 'react';
import clsx from 'clsx';
import {
  BOOK_NAV_REVEAL_DELAY_MS,
  BOOK_READING_ENTER_DURATION_MS,
} from './bookIntroConstants';
import { BOOK_COPY } from './constants';
import { Loader } from '@/components/UI';
import {
  setBookIntroComplete,
  setBookPage,
  selectBookPage,
} from '@/store/features/book';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import styles from './Book.module.scss';
import { BookCanvas } from './components/BookCanvas';
import { BookCornerCurlProvider } from './components/BookCornerCurlState';
import { BookDragProvider } from './components/BookDragState';
import { BookPageProvider } from './components/BookPageState';
import { BookStageProvider, useBookStage } from './components/BookStage';
import { useBookClosedPoseTweak } from './hooks/useBookClosedPoseTweak';
import { useBookDelayedPage } from './hooks/useBookDelayedPage';
import { useBookTextures } from './hooks/useBookTextures';

type BookProps = {
  className?: string;
};

export const Book: FC<BookProps> = ({ className }) => (
  <BookStageProvider>
    <BookInner className={className} />
  </BookStageProvider>
);

type BookInnerProps = {
  className?: string;
};

const BookInner: FC<BookInnerProps> = ({ className }) => {
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectBookPage);
  const setPage = (next: number) => dispatch(setBookPage(next));
  const { stage } = useBookStage();
  const isReading = stage === 'reading';
  const didOpenReading = useRef(false);
  const [openReadingInstant, setOpenReadingInstant] = useState(false);
  const delayedPage = useBookDelayedPage(page, openReadingInstant);
  const { progress, ready } = useBookTextures();
  const { closedPoseOverride, presentPoseOverride } = useBookClosedPoseTweak();

  useLayoutEffect(() => {
    if (!isReading) {
      didOpenReading.current = false;
      setOpenReadingInstant(false);
      return;
    }

    if (didOpenReading.current) {
      return;
    }

    didOpenReading.current = true;
    setOpenReadingInstant(true);
    dispatch(setBookPage(1));
  }, [dispatch, isReading]);

  useEffect(() => {
    if (!openReadingInstant || page !== 1 || delayedPage !== 1) {
      return;
    }

    setOpenReadingInstant(false);
  }, [delayedPage, openReadingInstant, page]);

  useEffect(() => {
    if (!isReading || page < 1 || delayedPage < 1) {
      return;
    }

    const timeout = window.setTimeout(() => {
      dispatch(setBookIntroComplete(true));
    }, BOOK_READING_ENTER_DURATION_MS + BOOK_NAV_REVEAL_DELAY_MS);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [delayedPage, dispatch, isReading, page]);

  return (
    <BookPageProvider setPage={setPage}>
      <BookDragProvider page={page} setPage={setPage}>
        <BookCornerCurlProvider page={page}>
          <section
            className={clsx(styles.root, className)}
            aria-label={BOOK_COPY.title}
          >
            {ready ? (
              <BookCanvas
                page={page}
                delayedPage={delayedPage}
                closedPose={closedPoseOverride}
                presentPose={presentPoseOverride}
              />
            ) : null}
            {ready ? null : (
              <Loader className={styles.loader} progress={progress} />
            )}
          </section>
        </BookCornerCurlProvider>
      </BookDragProvider>
    </BookPageProvider>
  );
};
