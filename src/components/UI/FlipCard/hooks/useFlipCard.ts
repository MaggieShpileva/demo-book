import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

export const useFlipCard = (backSrc: string) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const isAnimatingRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const image = new Image();
    image.src = backSrc;
    image.decode().catch(() => undefined);
  }, [backSrc]);

  const handleFlip = () => {
    if (isAnimatingRef.current) {
      return;
    }

    setIsFlipped((current) => !current);
  };

  const handleAnimationStart = () => {
    isAnimatingRef.current = true;
  };

  const handleAnimationComplete = () => {
    isAnimatingRef.current = false;
  };

  return {
    isFlipped,
    handleFlip,
    handleAnimationStart,
    handleAnimationComplete,
    shouldReduceMotion,
  };
};
