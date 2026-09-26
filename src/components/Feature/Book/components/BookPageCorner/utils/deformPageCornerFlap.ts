import { MathUtils, Vector3 } from 'three';
import {
  PAGE_CURL_ANGLE,
  PAGE_CURL_BEND_WIDTH,
  PAGE_FOLDED_LIFT,
  PAGE_FOLDED_TIP_SCALE,
  PAGE_FOLD_AXIS,
  PAGE_FOLD_ORIGIN,
  PAGE_MAX_FOLD_DIST,
  PAGE_TIP_SIDE_DIR,
} from '../constants';
import type { PageCornerTipCache } from './pageCornerTipCache';

const axisPoint = new Vector3();
const radial = new Vector3();
const residual = new Vector3();
const curled = new Vector3();
const mixed = new Vector3();

/** Curl lifts toward +Z / camera. */
const PAGE_CURL_NORMAL = new Vector3()
  .crossVectors(PAGE_TIP_SIDE_DIR, PAGE_FOLD_AXIS)
  .normalize();

/**
 * Deform only tip vertices (cache). Rest of the sheet is left untouched.
 */
export const deformPageCornerFlap = (
  rest: ArrayLike<number>,
  progress: number,
  out: Float32Array,
  tip: PageCornerTipCache
) => {
  const amount = MathUtils.clamp(progress, 0, 1);
  const bendWidth = Math.max(1e-4, PAGE_MAX_FOLD_DIST * PAGE_CURL_BEND_WIDTH);
  const wrapAngle = amount * PAGE_CURL_ANGLE;
  const arcLength = bendWidth * Math.min(1, wrapAngle / Math.PI);
  const radius =
    wrapAngle > 1e-5 ? Math.max(arcLength / wrapAngle, 1e-5) : bendWidth;
  const tipScale = MathUtils.lerp(
    1,
    PAGE_FOLDED_TIP_SCALE,
    MathUtils.smoothstep(0.35, 1, amount)
  );

  for (let t = 0; t < tip.vertexIndices.length; t += 1) {
    const vertex = tip.vertexIndices[t];
    const i = vertex * 3;
    const x = rest[i];
    const y = rest[i + 1];
    const z = rest[i + 2];

    if (amount < 1e-5) {
      out[i] = x;
      out[i + 1] = y;
      out[i + 2] = z;
      continue;
    }

    const along =
      (x - PAGE_FOLD_ORIGIN.x) * PAGE_FOLD_AXIS.x +
      (y - PAGE_FOLD_ORIGIN.y) * PAGE_FOLD_AXIS.y +
      (z - PAGE_FOLD_ORIGIN.z) * PAGE_FOLD_AXIS.z;

    axisPoint.copy(PAGE_FOLD_ORIGIN).addScaledVector(PAGE_FOLD_AXIS, along);
    radial.set(x - axisPoint.x, y - axisPoint.y, z - axisPoint.z);

    const signedDist =
      radial.x * PAGE_TIP_SIDE_DIR.x +
      radial.y * PAGE_TIP_SIDE_DIR.y +
      radial.z * PAGE_TIP_SIDE_DIR.z;

    if (signedDist <= 1e-5) {
      out[i] = x;
      out[i + 1] = y;
      out[i + 2] = z;
      continue;
    }

    const onCylinder = signedDist < arcLength;
    const theta = onCylinder ? signedDist / radius : wrapAngle;
    const cos = Math.cos(theta);
    const sin = Math.sin(theta);

    residual.set(
      radial.x - PAGE_TIP_SIDE_DIR.x * signedDist,
      radial.y - PAGE_TIP_SIDE_DIR.y * signedDist,
      radial.z - PAGE_TIP_SIDE_DIR.z * signedDist
    );

    curled.set(
      PAGE_TIP_SIDE_DIR.x * radius * (cos - 1) +
        PAGE_CURL_NORMAL.x * radius * sin,
      PAGE_TIP_SIDE_DIR.y * radius * (cos - 1) +
        PAGE_CURL_NORMAL.y * radius * sin,
      PAGE_TIP_SIDE_DIR.z * radius * (cos - 1) +
        PAGE_CURL_NORMAL.z * radius * sin
    );

    if (!onCylinder) {
      const remaining = signedDist - arcLength;
      curled.x +=
        remaining *
        (-PAGE_TIP_SIDE_DIR.x * sin + PAGE_CURL_NORMAL.x * cos);
      curled.y +=
        remaining *
        (-PAGE_TIP_SIDE_DIR.y * sin + PAGE_CURL_NORMAL.y * cos);
      curled.z +=
        remaining *
        (-PAGE_TIP_SIDE_DIR.z * sin + PAGE_CURL_NORMAL.z * cos);
    }

    residual.applyAxisAngle(PAGE_FOLD_AXIS, -theta);
    curled.add(residual);

    mixed.lerpVectors(radial, curled, amount).multiplyScalar(tipScale);

    const loft = Math.sin(Math.min(theta, Math.PI * 0.5));
    const tipWeight = Math.pow(
      MathUtils.clamp(signedDist / PAGE_MAX_FOLD_DIST, 0, 1),
      1.6
    );
    const tipLift = amount * PAGE_FOLDED_LIFT * tipWeight * loft;

    out[i] = axisPoint.x + mixed.x;
    out[i + 1] = axisPoint.y + mixed.y;
    out[i + 2] = axisPoint.z + mixed.z + tipLift;
  }
};
