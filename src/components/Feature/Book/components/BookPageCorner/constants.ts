import { Vector3 } from 'three';
import { PAGE_FACE_LIFT, PAGE_HEIGHT, PAGE_WIDTH } from '../../constants';

/** Corner size as a fraction of page width. */
export const PAGE_CORNER_SIZE_RATIO = 0.135;

export const PAGE_CORNER_SIZE = PAGE_WIDTH * PAGE_CORNER_SIZE_RATIO;

/** Free outer top-right corner of the page (local page space). */
export const PAGE_CORNER_TIP = new Vector3(PAGE_WIDTH, PAGE_HEIGHT / 2, 0);

export const PAGE_CORNER_A = new Vector3(
  PAGE_WIDTH,
  PAGE_HEIGHT / 2 - PAGE_CORNER_SIZE,
  0
);

export const PAGE_CORNER_B = new Vector3(
  PAGE_WIDTH - PAGE_CORNER_SIZE,
  PAGE_HEIGHT / 2,
  0
);

export const PAGE_CORNER_BASE = new Vector3(
  PAGE_WIDTH - PAGE_CORNER_SIZE,
  PAGE_HEIGHT / 2 - PAGE_CORNER_SIZE,
  0
);

export const PAGE_FOLD_AXIS = new Vector3()
  .subVectors(PAGE_CORNER_B, PAGE_CORNER_A)
  .normalize();

export const PAGE_FOLD_ORIGIN = new Vector3().copy(PAGE_CORNER_A);

export const PAGE_FOLD_HINGE_LENGTH = PAGE_CORNER_SIZE * Math.SQRT2;

export const PAGE_TIP_SIDE_DIR = (() => {
  const along =
    (PAGE_CORNER_TIP.x - PAGE_FOLD_ORIGIN.x) * PAGE_FOLD_AXIS.x +
    (PAGE_CORNER_TIP.y - PAGE_FOLD_ORIGIN.y) * PAGE_FOLD_AXIS.y;
  const onAxis = new Vector3()
    .copy(PAGE_FOLD_ORIGIN)
    .addScaledVector(PAGE_FOLD_AXIS, along);
  return new Vector3().subVectors(PAGE_CORNER_TIP, onAxis).normalize();
})();

export const PAGE_MAX_FOLD_DIST = PAGE_CORNER_TIP.distanceTo(
  new Vector3()
    .copy(PAGE_FOLD_ORIGIN)
    .addScaledVector(
      PAGE_FOLD_AXIS,
      (PAGE_CORNER_TIP.x - PAGE_FOLD_ORIGIN.x) * PAGE_FOLD_AXIS.x +
        (PAGE_CORNER_TIP.y - PAGE_FOLD_ORIGIN.y) * PAGE_FOLD_AXIS.y
    )
);

/** Tip strips from crease → tip (page-mesh cylinder resolution). */
export const PAGE_FLAP_DEPTH_SEGMENTS = 28;

/** Samples along the crease on the page tip patch (keeps the diagonal straight). */
export const PAGE_FLAP_ALONG_SEGMENTS = 20;

/** Wider cylinder strip → larger fold radius (tip sits above the page). */
export const PAGE_CURL_BEND_WIDTH = 0.72;

/** Mild snail — enough tuck without digging into the sheet. */
export const PAGE_CURL_ANGLE = Math.PI + 0.02;

/**
 * Folded tip length vs flat tip depth (1 = full stretch about crease).
 * Lower = shorter triangle when the corner is curled.
 */
export const PAGE_FOLDED_TIP_SCALE = 1.7;

/** Lift of the curled tip above the page (weighted toward the tip vertex). */
export const PAGE_FOLDED_LIFT = 0.11;
/** Damp λ for a smooth but readable roll. */
export const PAGE_CORNER_CURL_SPEED = 2.6;

/** Время до начала авто-подсказки */
export const PAGE_CORNER_IDLE_MS = 5000;

/** Количество циклов скручивания/разскручивания после простоя. */
export const PAGE_CORNER_AUTO_PLAY_COUNT = 2;

/** Time for one curl or uncurl step of the idle hint. */
export const PAGE_CORNER_AUTO_STEP_MS = 1100;

export const PAGE_CORNER_SHADOW_Z = PAGE_FACE_LIFT * 0.6;
export const PAGE_CORNER_SHADOW_OPACITY = 0.78;
export const PAGE_CORNER_SHADOW_SEGMENTS = 14;
export const PAGE_CORNER_VISIBLE_EPS = 0.008;
