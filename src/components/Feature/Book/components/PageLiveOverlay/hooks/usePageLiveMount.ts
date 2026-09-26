import { useEffect, useRef, useState } from 'react';
import {
  BOOK_LIVE_FADE_IN_DELAY_S,
  BOOK_LIVE_FADE_IN_DURATION_S,
  BOOK_LIVE_FADE_OUT_DURATION_S,
} from '@components/Feature/Book/constants';

const FADE_IN_MS =
  (BOOK_LIVE_FADE_IN_DELAY_S + BOOK_LIVE_FADE_IN_DURATION_S) * 1000;
const FADE_OUT_MS = BOOK_LIVE_FADE_OUT_DURATION_S * 1000;

export const usePageLiveMount = (
  visible: boolean,
  invalidate: () => void
) => {
  const [mounted, setMounted] = useState(visible);
  const visibleRef = useRef(visible);
  visibleRef.current = visible;

  useEffect(() => {
    if (visible) {
      setMounted(true);
    }
  }, [visible]);

  useEffect(() => {
    if (!mounted) {
      return;
    }

    invalidate();
    const endsAt =
      performance.now() + (visible ? FADE_IN_MS : FADE_OUT_MS) + 80;
    const id = window.setInterval(() => {
      invalidate();
      if (performance.now() >= endsAt) {
        window.clearInterval(id);
      }
    }, 32);

    return () => window.clearInterval(id);
  }, [invalidate, mounted, visible]);

  const onExitComplete = () => {
    if (!visibleRef.current) {
      setMounted(false);
    }
  };

  return { mounted, onExitComplete };
};
