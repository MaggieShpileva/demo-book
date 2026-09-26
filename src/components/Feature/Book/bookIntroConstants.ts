/**
 * Intro sequence: closed → present → products → exit → reading enter.
 * Open reading pose (`BOOK_POSITION`) stays in `constants.ts`.
 */

/** Closed book on first load. */
export const BOOK_CLOSED_POSITION = [0, -0.1, -2] as const;

/**
 * Closed-book rotation in degrees (tweak / constants source of truth).
 * Always convert with `deg * Math.PI / 180` before Three.js.
 */
export const BOOK_ROTATION = [-22, -143, -22] as const;
/** Book group rotation while closed (first load / cover), radians. */
export const BOOK_CLOSED_ROTATION = [
  (BOOK_ROTATION[0] * Math.PI) / 180,
  (BOOK_ROTATION[1] * Math.PI) / 180,
  (BOOK_ROTATION[2] * Math.PI) / 180,
] as const;

/** Book group position after first click (presented, slightly ajar). */
export const BOOK_PRESENT_POSITION = [0.32, -1.5, -3] as const;
/**
 * Presented-book rotation in degrees (tweak / constants source of truth).
 * Always convert with `deg * Math.PI / 180` before Three.js.
 */
export const BOOK_PRESENT_ROTATION = [0, 152, -90] as const;
/** Cover open amount while presented (0 = shut, 1 = flat open). */
export const BOOK_PRESENT_OPEN_AMOUNT = 0.13;

/** Book group position on step 3 (after products levitate). */
export const BOOK_EXIT_POSITION = [0.65, -4, -4] as const;
/** Book group rotation on step 3, degrees. */
export const BOOK_EXIT_ROTATION = [0, 180, -90] as const;
/**
 * Delay after products start levitating before the book moves to exit pose.
 */
export const BOOK_EXIT_DELAY_MS = 2000;
/** Duration of the book move into exit pose. */
export const BOOK_EXIT_DURATION_MS = 600;

/** Delay after the book settles in present pose before products start rising. */
export const BOOK_PRODUCTS_APPEAR_DELAY_MS = 0;
/** Radians per second for product levitation sine wave. */
export const BOOK_PRODUCT_LEVITATE_SPEED = 1.3;
/** Fade-out + return-to-start duration after exit completes. */
export const BOOK_PRODUCTS_FADE_MS = 900;

/**
 * Y offset below `BOOK_POSITION` where the open book starts before rising in.
 */
export const BOOK_READING_ENTER_OFFSET_Y = -2.8;
/** Duration of the open-book rise into the reading pose. */
export const BOOK_READING_ENTER_DURATION_MS = 750;
/** Delay after reading enter before header book nav fades in. */
export const BOOK_NAV_REVEAL_DELAY_MS = 120;
