/** Match `$page-design-width` / height so templates rasterize at artboard size. */
export const PAGE_HTML_WIDTH_PX = 1487;
export const PAGE_HTML_HEIGHT_PX = 2298;

/** Same proportions as the source book, stretched to the current page artboard. */
export const PAGE_WIDTH = 1.28;
export const PAGE_HEIGHT =
  PAGE_WIDTH * (PAGE_HTML_HEIGHT_PX / PAGE_HTML_WIDTH_PX);
export const COVER_SCALE = 1.03;
export const COVER_WIDTH = PAGE_WIDTH * COVER_SCALE;
export const COVER_HEIGHT = PAGE_HEIGHT * COVER_SCALE;
export const COVER_CORNER_RADIUS = 0;
export const PAGE_DEPTH = 0.003;
/** Board that joins the two covers at the hinge. */
export const BOOK_SPINE_WIDTH = 0.01;
export const BOOK_SPINE_COLOR = '#ffffff';
export const PAGE_FACE_LIFT = 0.0004;
export const PAGE_HIT_RATIO = 0.15;
export const PAGE_SEGMENTS = 16;
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

export const BOOK_CAMERA_POSITION = [0, 0.1, 3.8] as const;
/** Closed book on first load, while scripted camera yaw is paused. */
export const BOOK_CAMERA_CLOSED_POSITION = [-0.418, 0.053, 3.778] as const;
export const BOOK_CAMERA_FOV = 38;
/** Open spread that already faces the camera square-on. */
export const BOOK_CAMERA_FACE_PAGE = 2;

export const BOOK_COPY = {
  title: 'Book',
  pageNav: 'Навигация по страницам',
} as const;
