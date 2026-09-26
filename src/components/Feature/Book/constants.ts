/** Match `$page-design-width` / height so templates rasterize at artboard size. */
export const PAGE_HTML_WIDTH_PX = 1487;
export const PAGE_HTML_HEIGHT_PX = 2298;

/** Same proportions as the source book, stretched to the current page artboard. */
export const PAGE_WIDTH = 1.28;
export const PAGE_HEIGHT =
  PAGE_WIDTH * (PAGE_HTML_HEIGHT_PX / PAGE_HTML_WIDTH_PX);
/** Contents: bottom-aligned; height ok, width a bit wider. */
export const CONTENTS_SCALE_Y = 1.015;
export const CONTENTS_SCALE_X = 1.015;
export const COVER_SCALE = 1.03;
export const COVER_WIDTH = PAGE_WIDTH * COVER_SCALE;
export const COVER_HEIGHT = PAGE_HEIGHT * COVER_SCALE;
export const COVER_CORNER_RADIUS = 0;
export const PAGE_DEPTH = 0.003;
/** Matches `$cover-inside-start`. */
export const BOOK_SPINE_COLOR = '#7f90a4';
/**
 * Spine shift along the cover normal (perpendicular to the cover face).
 * Positive → outward from the cover; negative → into the book.
 */
export const BOOK_SPINE_OFFSET = -0.065;
/** Spine depth along the stack (between front and back covers). */
export const BOOK_SPINE_DEPTH = 0.02;
export const PAGE_FACE_LIFT = 0.0004;
export const PAGE_HIT_RATIO = 0.15;
export const PAGE_SEGMENTS = 16;
/** Vertical segments for the page body outside the tip square. */
export const PAGE_HEIGHT_SEGMENTS = 18;
export const PAGE_TEXTURE_MAX_DPR = 1.25;
export const SINGLE_PAGE_MAX_WIDTH = 480;
export const BOOK_PRIORITY_FACES = 6;
export const BOOK_FRAME_DELTA_MAX = 1 / 30;
export const EASING_FACTOR = 0.5;
export const EASING_FACTOR_FOLD = 0.3;
export const BOOK_DRAG_EASING = 0.38;
export const BOOK_DRAG_PX = 280;
export const BOOK_COVER_DRAG_PX = 420;
export const PAGE_EDGE_DRAG_PX = BOOK_DRAG_PX;
export const PAGE_COVER_DRAG_PX = BOOK_COVER_DRAG_PX;
export const PAGE_EDGE_START_PX = 8;
export const PAGE_TAP_MAX_PX = 48;
export const PAGE_EDGE_COMMIT = 0.25;
export const PAGE_COVER_DRAG_COMMIT = 0.25;
export const PAGE_TURN_MS = 550;
/** Live points (Html overlay) fade in / out. */
export const BOOK_LIVE_FADE_IN_DURATION_S = 0.6;
export const BOOK_LIVE_FADE_IN_DELAY_S = 0.5;
export const BOOK_LIVE_FADE_OUT_DURATION_S = 0.55;
/** Closed pages sit slightly off 90° so the open book is a bit shut. */
export const BOOK_CLOSED_ANGLE_INSET = 0.1;
export const BOOK_PAGE_FAN_DEG = 0.2;
/** Near-flat sheets: bone curl is only a hint of paper. */
export const INSIDE_CURVE_STRENGTH = 0.006;
export const OUTSIDE_CURVE_STRENGTH = 0.002;
export const TURNING_CURVE_STRENGTH = 0.004;
export const PAGE_FOLD_DEGREES = 0.1;
export const PAGE_TURN_CURL_MS = 400;
export const PAGE_WALK_NEAR_MS = 150;
export const PAGE_WALK_FAR_MS = 50;
/**
 * Pack flip: open-delay per sheet in real ms (animation clock, not setTimeout).
 * `0` = fully together; try `0.5`–`2` for a slight gap.
 */
export const PAGE_PACK_SHEET_LAG_MS = 5;

export const BOOK_CAMERA_POSITION = [-0.069, 0, 3.8] as const;
/** Closed book on first load, while scripted camera yaw is paused. */
export const BOOK_CAMERA_CLOSED_POSITION = [-0.364, 0.144, 3.8] as const;
export const BOOK_CAMERA_FOV = 38;
/** Open spread that already faces the camera square-on (Page2 after contents). */
export const BOOK_CAMERA_FACE_PAGE = 3;

/** Book group position while open (reading pose). */
export const BOOK_POSITION = [-PAGE_WIDTH / 2, 0, 0] as const;
/**
 * Extra X slide when the back cover closes (keeps the closed book framed).
 * Smaller than a full page width so the move stays subtle.
 */
export const BOOK_BACK_CLOSE_SHIFT = PAGE_WIDTH * 0.4;
/** Smooth time for that slide — higher than `EASING_FACTOR` = slower. */
export const BOOK_BACK_CLOSE_SHIFT_EASING = 0.5;

/**
 * Draw order: pages → products → cover.
 * Products sit above page 1 paint, under the front cover.
 */
export const BOOK_PAGE_RENDER_ORDER = 1;
export const BOOK_PRODUCT_RENDER_ORDER = 2;
export const BOOK_COVER_RENDER_ORDER = 3;

export const BOOK_COPY = {
  title: 'Book',
  pageNav: 'Навигация по страницам',
} as const;
