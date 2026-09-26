import {
  BOOK_SPINE_DEPTH,
  BOOK_SPINE_OFFSET,
  COVER_HEIGHT,
  PAGE_DEPTH,
} from '../constants';

/** Cover-to-cover span along the closed stack. */
export const getBookSpineSpan = (sheetCount: number) =>
  Math.max(0, sheetCount - 1) * PAGE_DEPTH;

/**
 * Closed-only spine: board at the hinge, face perpendicular to the covers.
 * X = distance between covers (along the cover normal).
 * Z = `BOOK_SPINE_DEPTH` along the stack.
 */
export const getBookSpinePose = (sheetCount: number, delayedPage: number) => {
  const span = getBookSpineSpan(sheetCount);

  return {
    /** Along cover normal — book thickness (Three.js box X). */
    sizeX: span,
    sizeY: COVER_HEIGHT,
    /** Along the stack — spine depth (Three.js box Z). */
    sizeZ: BOOK_SPINE_DEPTH,
    /**
     * +X = along the cover normal (`BOOK_SPINE_OFFSET`).
     * Z centered on the stack (`BOOK_SPINE_DEPTH`).
     */
    position: [
      span / 2 + BOOK_SPINE_OFFSET,
      0,
      delayedPage * PAGE_DEPTH - BOOK_SPINE_DEPTH / 2,
    ] as const,
  };
};
