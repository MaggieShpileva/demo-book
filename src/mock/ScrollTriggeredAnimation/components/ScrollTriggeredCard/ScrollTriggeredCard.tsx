import type { FC } from 'react';
import { motion } from 'motion/react';
import type { Variants } from 'motion/react';
import clsx from 'clsx';
import styles from './ScrollTriggeredCard.module.scss';

const BOTTLE_VARIANTS: Variants = {
  offscreen: {
    y: 300,
  },
  onscreen: {
    y: 80,
    rotate: -10,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

type ScrollTriggeredCardProps = {
  bottleSrc: string;
  bottleAlt: string;
  className?: string;
};

export const ScrollTriggeredCard: FC<ScrollTriggeredCardProps> = ({
  bottleSrc,
  bottleAlt,
  className,
}) => (
  <motion.article
    className={clsx(styles.root, className)}
    initial="offscreen"
    whileInView="onscreen"
    viewport={{ amount: 0.8 }}
  >
    <div className={styles.window} aria-hidden />
    <motion.div className={styles.object} variants={BOTTLE_VARIANTS}>
      <img className={styles.bottle} src={bottleSrc} alt={bottleAlt} />
    </motion.div>
  </motion.article>
);
