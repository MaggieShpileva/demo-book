import type { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Book } from '@components/Feature/Book';
import { useSinglePageBook } from '@components/Feature/Book/hooks/useSinglePageBook';
import { DesktopPlaceholder } from '@components/Feature/DesktopPlaceholder';
import { Loader } from '@/components/UI';
import { selectLoaderProgress } from '@/store/features/book';
import { useAppSelector } from '@/store/hooks';
import { useHomeLoader } from './hooks/useHomeLoader';
import styles from './Home.module.scss';

export const Home: FC = () => {
  const isMobileBook = useSinglePageBook();
  const loaderProgress = useAppSelector(selectLoaderProgress);
  const { isLoaderComplete, isLoaderVisible } = useHomeLoader(loaderProgress);

  // Desktop book is disabled above SINGLE_PAGE_MAX_WIDTH; mobile logic stays.
  if (!isMobileBook) {
    return <DesktopPlaceholder />;
  }

  return (
    <>
      <AnimatePresence>
        {isLoaderVisible ? (
          <motion.div
            className={styles.loader}
            initial={{ opacity: 0 }}
            animate={{
              opacity: 1,
              transition: { duration: 0.4, ease: 'easeOut' },
            }}
            exit={{
              opacity: 0,
              transition: { duration: 0.6, ease: 'easeOut' },
            }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{
                opacity: isLoaderComplete ? 0 : 1,
                transition: isLoaderComplete
                  ? { duration: 0.4, ease: 'easeOut', delay: 0.4 }
                  : { duration: 0.4, ease: 'easeOut' },
              }}
            >
              <Loader progress={loaderProgress} />
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <motion.div
        className={styles.book}
        animate={{ opacity: isLoaderVisible ? 0 : 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <Book />
      </motion.div>
    </>
  );
};
