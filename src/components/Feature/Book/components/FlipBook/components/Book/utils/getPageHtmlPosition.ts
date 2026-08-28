import { PAGE_DEPTH, PAGE_WIDTH } from '../constants';

export const getPageHtmlPosition = (
  side: 'front' | 'back'
): [number, number, number] => [
  PAGE_WIDTH / 2,
  0,
  side === 'back' ? -PAGE_DEPTH / 2 - 0.001 : PAGE_DEPTH / 2 + 0.001,
];
