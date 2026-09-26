import { useEffect, type Dispatch, type SetStateAction } from 'react';
import {
  PAGE_CORNER_AUTO_PLAY_COUNT,
  PAGE_CORNER_AUTO_STEP_MS,
  PAGE_CORNER_IDLE_MS,
} from '../../BookPageCorner/constants';

type UsePageCornerIdleAutoplayParams = {
  activeSheet: number | null;
  page: number;
  /** Bumps on flip / header nav / contents — restarts the idle wait. */
  idleNonce: number;
  isDragging: boolean;
  enabled: boolean;
  setCurledSheet: Dispatch<SetStateAction<number | null>>;
};

/**
 * After PAGE_CORNER_IDLE_MS without page turn, nav, or drag, play the dog-ear
 * curl PAGE_CORNER_AUTO_PLAY_COUNT times, then wait for idle again.
 */
export const usePageCornerIdleAutoplay = ({
  activeSheet,
  page,
  idleNonce,
  isDragging,
  enabled,
  setCurledSheet,
}: UsePageCornerIdleAutoplayParams) => {
  useEffect(() => {
    if (!enabled || activeSheet === null || isDragging) {
      setCurledSheet(null);
      return;
    }

    let cancelled = false;
    let idleTimer = 0;
    let stepTimer = 0;

    const clearTimers = () => {
      window.clearTimeout(idleTimer);
      window.clearTimeout(stepTimer);
    };

    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        stepTimer = window.setTimeout(resolve, ms);
      });

    const playCycles = async () => {
      for (let index = 0; index < PAGE_CORNER_AUTO_PLAY_COUNT; index += 1) {
        if (cancelled) {
          return;
        }
        setCurledSheet(activeSheet);
        await wait(PAGE_CORNER_AUTO_STEP_MS);
        if (cancelled) {
          return;
        }
        setCurledSheet(null);
        await wait(PAGE_CORNER_AUTO_STEP_MS);
      }

      if (!cancelled) {
        scheduleIdle();
      }
    };

    const scheduleIdle = () => {
      clearTimers();
      idleTimer = window.setTimeout(() => {
        void playCycles();
      }, PAGE_CORNER_IDLE_MS);
    };

    scheduleIdle();

    return () => {
      cancelled = true;
      clearTimers();
      setCurledSheet(null);
    };
  }, [activeSheet, enabled, idleNonce, isDragging, page, setCurledSheet]);
};
