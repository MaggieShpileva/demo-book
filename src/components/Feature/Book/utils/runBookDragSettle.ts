import { PAGE_TURN_MS } from '@components/Feature/Book/constants';

export const runBookDragSettle = (
  from: number,
  to: number,
  onUpdate: (amount: number) => void,
  onDone: () => void
) => {
  const distance = Math.abs(to - from);
  if (distance < 0.001) {
    onDone();
    return () => undefined;
  }

  const durationMs = Math.max(120, PAGE_TURN_MS * distance);
  const startedAt = performance.now();
  let frame = 0;

  const tick = (now: number) => {
    const linear = Math.min(1, (now - startedAt) / durationMs);
    const eased = 1 - (1 - linear) * (1 - linear);
    onUpdate(from + (to - from) * eased);
    if (linear < 1) {
      frame = requestAnimationFrame(tick);
      return;
    }
    onDone();
  };

  frame = requestAnimationFrame(tick);
  return () => {
    cancelAnimationFrame(frame);
  };
};
