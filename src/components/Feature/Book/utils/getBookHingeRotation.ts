import { MathUtils } from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';
import { BOOK_CLOSED_ANGLE_INSET, BOOK_PAGE_FAN_DEG } from '../constants';
import type { BookDragMode } from './bookDrag';
import { clampBookOpenedAmount } from './clampBookOpenedAmount';

const getBookPageFan = (number: number, bookClosedAmount: number) =>
  degToRad(number * BOOK_PAGE_FAN_DEG) *
  (1 - clampBookOpenedAmount(bookClosedAmount));

const getBookHingeRests = (number: number, bookClosedAmount: number) => {
  const fan = getBookPageFan(number, bookClosedAmount);
  return {
    closedRest: Math.PI / 2 - BOOK_CLOSED_ANGLE_INSET + fan,
    openedRest: -Math.PI / 2 + fan,
  };
};

/** 0 = right stack, 1 = left stack — always travels through upright (0°). */
export const getBookHingeRotation = (
  openedAmount: number,
  number: number,
  bookClosedAmount: number
) => {
  const amount = clampBookOpenedAmount(openedAmount);
  const { closedRest, openedRest } = getBookHingeRests(
    number,
    bookClosedAmount
  );
  return MathUtils.lerp(closedRest, openedRest, amount);
};

/** Keep the sheet from rotating past the active rest in the wrong direction. */
export const clampHingeToActiveRest = (
  hingeRotation: number,
  mode: BookDragMode | null,
  number: number,
  bookClosedAmount: number
) => {
  if (mode == null) {
    return hingeRotation;
  }

  const { closedRest, openedRest } = getBookHingeRests(
    number,
    bookClosedAmount
  );

  if (mode === 'next') {
    return Math.min(closedRest, hingeRotation);
  }

  return Math.max(openedRest, hingeRotation);
};
