import type { FC, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './BookLive.module.scss';
import { motion } from 'framer-motion';

type BookLiveProps = {
  children: ReactNode;
  className?: string;
};

export const BookLive: FC<BookLiveProps> = ({ children, className }) => (
  <motion.div
    className={clsx(styles.root, className)}
    data-book-live
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: { duration: 0.6, delay: 0.5 } }}
    exit={{ opacity: 0, transition: { duration: 0.6 } }}
  >
    {children}
  </motion.div>
);
