import type { FC } from 'react';
import clsx from 'clsx';
import { motion } from 'framer-motion';
import { FlipCardFace } from './components/FlipCardFace';
import { useFlipCard } from './hooks/useFlipCard';
import styles from './FlipCard.module.scss';

const FLIP_TRANSITION = {
  duration: 0.65,
  ease: [0.5, 1, 0.5, 1] as const,
};

const FLIP_REDUCED_TRANSITION = { duration: 0 };

const INNER_STYLE = {
  transformPerspective: 1000,
  transformStyle: 'preserve-3d' as const,
};

const toInnerTransform = (_: unknown, generated: string) =>
  `perspective(1000px) ${generated}`;

type FlipCardProps = {
  frontSrc: string;
  backSrc: string;
  frontAlt: string;
  backAlt: string;
  className?: string;
};

export const FlipCard: FC<FlipCardProps> = ({
  frontSrc,
  backSrc,
  frontAlt,
  backAlt,
  className,
}) => {
  const {
    isFlipped,
    handleFlip,
    handleAnimationStart,
    handleAnimationComplete,
    shouldReduceMotion,
  } = useFlipCard(backSrc);

  return (
    <button
      type="button"
      className={clsx(className, styles.root)}
      onClick={handleFlip}
      aria-pressed={isFlipped}
      aria-label="Flip card"
    >
      <motion.span
        className={styles.inner}
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={
          shouldReduceMotion ? FLIP_REDUCED_TRANSITION : FLIP_TRANSITION
        }
        style={INNER_STYLE}
        transformTemplate={toInnerTransform}
        onAnimationStart={handleAnimationStart}
        onAnimationComplete={handleAnimationComplete}
      >
        <FlipCardFace src={frontSrc} alt={frontAlt} />
        <FlipCardFace src={backSrc} alt={backAlt} isBack />
      </motion.span>
    </button>
  );
};
