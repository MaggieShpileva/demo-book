import { PAGE_PACK_SHEET_LAG_MS, PAGE_TURN_CURL_MS } from '../constants';

export type BookPackFlip = {
  from: number;
  to: number;
  startedAt: number;
};

let activePackFlip: BookPackFlip | null = null;

export const startBookPackFlip = (from: number, to: number) => {
  if (from === to) {
    activePackFlip = null;
    return;
  }

  activePackFlip = { from, to, startedAt: performance.now() };
};

export const getBookPackFlip = () => activePackFlip;

export const clearBookPackFlip = () => {
  activePackFlip = null;
};

/** Sheets between from/to that take part in this pack flip. */
export const isPackFlippingSheet = (sheet: number, flip: BookPackFlip) => {
  const lo = Math.min(flip.from, flip.to);
  const hi = Math.max(flip.from, flip.to);
  return sheet >= lo && sheet < hi;
};

/**
 * Open target for a sheet during pack flip.
 * Forward: delay closed→open. Backward: delay open→closed.
 * Lag is measured in real ms (not setTimeout), so values like 0.5–2 work.
 */
export const getPackAmountTarget = (
  sheet: number,
  opened: boolean,
  closedRestAmount: number,
  flip: BookPackFlip | null,
  lagMs = PAGE_PACK_SHEET_LAG_MS
) => {
  const rest = opened ? 1 : closedRestAmount;
  if (flip == null || lagMs <= 0 || !isPackFlippingSheet(sheet, flip)) {
    return rest;
  }

  const order =
    flip.to > flip.from ? sheet - flip.from : flip.from - 1 - sheet;
  const elapsed = performance.now() - flip.startedAt;
  const waiting = elapsed < order * lagMs;

  if (opened) {
    return waiting ? 0 : 1;
  }

  return waiting ? 1 : closedRestAmount;
};

export const clearBookPackFlipIfDone = (
  flip: BookPackFlip | null,
  lagMs = PAGE_PACK_SHEET_LAG_MS
) => {
  if (flip == null) {
    return;
  }

  const count = Math.abs(flip.to - flip.from);
  const doneAt =
    flip.startedAt + count * Math.max(0, lagMs) + PAGE_TURN_CURL_MS + 200;
  if (performance.now() >= doneAt) {
    activePackFlip = null;
  }
};
