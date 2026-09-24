import { useEffect, useLayoutEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';
import { useBookDragContext } from '../components/BookDragState';
import {
  isBookLoadPaused,
  subscribeBookLoadPause,
} from '../utils/bookLoadPause';

export const useBookInvalidate = (page: number, delayedPage: number) => {
  const invalidate = useThree((state) => state.invalidate);
  const { isDragging } = useBookDragContext();
  const [paused, setPaused] = useState(isBookLoadPaused);

  useEffect(() => {
    return subscribeBookLoadPause(() => {
      setPaused(isBookLoadPaused());
    });
  }, []);

  useLayoutEffect(() => {
    invalidate();
  }, [delayedPage, invalidate, isDragging, page, paused]);

  useLayoutEffect(() => {
    const active = paused || isDragging || page !== delayedPage;
    if (!active) {
      return;
    }

    let frame = 0;
    const tick = () => {
      invalidate();
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [delayedPage, invalidate, isDragging, page, paused]);
};
