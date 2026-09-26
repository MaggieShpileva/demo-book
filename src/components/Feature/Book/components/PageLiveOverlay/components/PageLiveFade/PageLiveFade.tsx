import type { FC, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BOOK_LIVE_FADE_IN_DELAY_S,
  BOOK_LIVE_FADE_IN_DURATION_S,
  BOOK_LIVE_FADE_OUT_DURATION_S,
} from '@components/Feature/Book/constants';
import styles from '../../PageLiveOverlay.module.scss';

type PageLiveFadeProps = {
  visible: boolean;
  onExitComplete: () => void;
  children: ReactNode;
};

export const PageLiveFade: FC<PageLiveFadeProps> = ({
  visible,
  onExitComplete,
  children,
}) => (
  <AnimatePresence onExitComplete={onExitComplete}>
    {visible ? (
      <motion.div
        key="page-live"
        className={styles.root}
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: {
            duration: BOOK_LIVE_FADE_IN_DURATION_S,
            delay: BOOK_LIVE_FADE_IN_DELAY_S,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
        exit={{
          opacity: 0,
          transition: {
            duration: BOOK_LIVE_FADE_OUT_DURATION_S,
            ease: [0.4, 0, 0.2, 1],
          },
        }}
      >
        {children}
      </motion.div>
    ) : null}
  </AnimatePresence>
);
