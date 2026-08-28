export const PAGE_WIDTH = 1.2;
export const PAGE_HEIGHT = 1.71;
export const PAGE_DEPTH = 0.005;
/** Front cover sheet (index 0) — slightly thicker than inner pages. */
export const COVER_PAGE_DEPTH = 0.008;
export const PAGE_Z_GAP = 0.008;
/** Z spacing between the thick cover and the sheet beneath it. */
export const COVER_PAGE_Z_GAP = 0.013;
export const SINGLE_PAGE_MAX_WIDTH = 720;
export const PAGE_HTML_WIDTH_PX = 420;
export const PAGE_HTML_HEIGHT_PX = Math.round(
  (PAGE_HEIGHT / PAGE_WIDTH) * PAGE_HTML_WIDTH_PX
);
export const PAGE_HTML_DISTANCE_FACTOR =
  (PAGE_WIDTH / PAGE_HTML_WIDTH_PX) * 400;
export const PAGE_CORNER_SIZE = 0.32;
export const PAGE_EDGE_RATIO = 0.2;
export const PAGE_EDGE_DRAG_PX = 180;
export const PAGE_EDGE_START_PX = 8;
export const PAGE_EDGE_COMMIT = 0.35;
export const PAGE_SEGMENTS = 30;
/** Horizontal subdivisions along page height (fold/curl detail). */
export const PAGE_HEIGHT_SEGMENTS = 8;
export const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS;
export const PAGE_REFERENCE_PX = 420;
export const PAGE_WIDTH_STEP_PX = 5;
export const PAGE_WIDTH_STEP =
  (PAGE_WIDTH_STEP_PX / PAGE_REFERENCE_PX) * PAGE_WIDTH;

export const PAGE_TURN_MS = 400;
/** How far drag curl leans toward the click extreme (0 = follow page, 1 = full click curl). */
export const PAGE_DRAG_CURL_BLEND = 0.55;
/** Softens peak turningTime during drag so the page does not over-twist. */
export const PAGE_DRAG_TURNING_SCALE = 0.75;
/** Outer-edge peel when corner fold is toggled (does not flip the page). */
export const PAGE_CORNER_FOLD_TURN_DEG = -16;
export const PAGE_CORNER_FOLD_BEND_DEG = 0;
export const PAGE_CORNER_FOLD_TWIST_DEG = 0;
export const PAGE_CORNER_FOLD_START = 0.05;

export const EASING_FACTOR = 0.5;
export const EASING_FACTOR_FOLD = 0.3;
/** How quickly sheets ease between closed-flat and open-book bone poses. */
export const EASING_FACTOR_CLOSED = 0.35;
export const INSIDE_CURVE_STRENGTH = 0.18;
export const OUTSIDE_CURVE_STRENGTH = 0.05;
export const TURNING_CURVE_STRENGTH = 0.09;
/** Cover (sheet 0): curl scale from drag start through mid; full strength to settle. */
export const COVER_CURVE_SCALE = 0.1;

export const TEXTURE_BASE = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`;
