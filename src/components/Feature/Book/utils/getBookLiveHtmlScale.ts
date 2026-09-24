import { PAGE_HTML_HEIGHT_PX, PAGE_HTML_WIDTH_PX } from '../constants';

/** drei Html `transform` default: 400 / distanceFactor(10) CSS px per world unit. */
const DREI_HTML_PX_PER_WORLD = 40;

export const getBookLiveHtmlScale = (
  pageWidth: number,
  pageHeight: number
): [number, number, number] => [
  (pageWidth * DREI_HTML_PX_PER_WORLD) / PAGE_HTML_WIDTH_PX,
  (pageHeight * DREI_HTML_PX_PER_WORLD) / PAGE_HTML_HEIGHT_PX,
  1,
];
