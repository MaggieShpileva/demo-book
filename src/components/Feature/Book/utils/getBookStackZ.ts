import { PAGE_DEPTH } from '../constants';

export const getBookStackZ = (number: number, delayedPage: number) =>
  -number * PAGE_DEPTH + delayedPage * PAGE_DEPTH;
