import { MathUtils } from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';
import {
  BOOK_CLOSED_ANGLE_INSET,
  BOOK_PAGE_FAN_DEG,
} from '../constants';
import { clampBookOpenedAmount } from './clampBookOpenedAmount';

const getBookPageFan = (number: number, bookClosed: boolean) =>
  bookClosed ? 0 : degToRad(number * BOOK_PAGE_FAN_DEG);

const getBookHingeRests = (number: number, bookClosed: boolean) => {
  const fan = getBookPageFan(number, bookClosed);
  return {
    closedRest: Math.PI / 2 - BOOK_CLOSED_ANGLE_INSET + fan,
    openedRest: -Math.PI / 2 + fan,
  };
};

/** 0 = right stack, 1 = left stack — always travels through upright (0°). */
export const getBookHingeRotation = (
  openedAmount: number,
  number: number,
  bookClosed: boolean
) => {
  const amount = clampBookOpenedAmount(openedAmount);
  const { closedRest, openedRest } = getBookHingeRests(number, bookClosed);
  return MathUtils.lerp(closedRest, openedRest, amount);
};
