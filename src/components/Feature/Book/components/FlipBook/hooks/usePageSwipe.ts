import { useRef } from 'react';
import type { PointerEvent } from 'react';
import { handleSheetPointerUp } from '../utils/handleSheetPointerUp';

type UsePageSwipeParams = {
  enabled: boolean;
  onPrev: () => void;
  onNext: () => void;
};

export const usePageSwipe = ({
  enabled,
  onPrev,
  onNext,
}: UsePageSwipeParams) => {
  const startXRef = useRef<number | null>(null);

  const onPointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!enabled) {
      return;
    }
    startXRef.current = event.clientX;
  };

  const onPointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (!enabled || startXRef.current == null) {
      return;
    }

    const startX = startXRef.current;
    startXRef.current = null;
    handleSheetPointerUp({
      startX,
      clientX: event.clientX,
      rect: event.currentTarget.getBoundingClientRect(),
      onPrev,
      onNext,
    });
  };

  return { onPointerDown, onPointerUp };
};
