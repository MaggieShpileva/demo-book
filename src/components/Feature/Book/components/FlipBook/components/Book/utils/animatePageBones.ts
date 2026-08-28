import { easing } from 'maath';
import { MathUtils } from 'three';
import { degToRad } from 'three/src/math/MathUtils.js';
import type { Group, SkinnedMesh } from 'three';
import {
  EASING_FACTOR,
  EASING_FACTOR_FOLD,
  INSIDE_CURVE_STRENGTH,
  OUTSIDE_CURVE_STRENGTH,
  PAGE_CORNER_FOLD_BEND_DEG,
  PAGE_CORNER_FOLD_START,
  PAGE_CORNER_FOLD_TURN_DEG,
  PAGE_CORNER_FOLD_TWIST_DEG,
  TURNING_CURVE_STRENGTH,
} from '../constants';

type AnimatePageBonesParams = {
  group: Group | null;
  mesh: SkinnedMesh;
  delta: number;
  /** 0 = closed (right), 1 = opened (left) — page follow angle */
  openedAmount: number;
  /**
   * Opened amount used for curl/fold (click uses the binary target).
   * Defaults to `openedAmount`.
   */
  curlOpenedAmount?: number;
  /** 0..1 peels the outer free edge without flipping the page. */
  cornerFold?: number;
  /**
   * 0 = open-book curve pose, 1 = rigid closed stack.
   * Soft blend avoids a whole-book twitch when leaving/entering the cover.
   */
  closedAmount?: number;
  number: number;
  turningTime: number;
  /** Multiplier for bone curve strengths (cover drag softens mid-scrub). */
  curveScale?: number;
  immediate?: boolean;
};

const getCornerPeel = (boneIndex: number, boneCount: number, fold: number) => {
  if (fold <= 0 || boneCount <= 1) {
    return 0;
  }

  const t = boneIndex / (boneCount - 1);
  const outer = Math.max(
    0,
    (t - PAGE_CORNER_FOLD_START) / (1 - PAGE_CORNER_FOLD_START)
  );
  return outer * outer * fold;
};

export const animatePageBones = ({
  group,
  mesh,
  delta,
  openedAmount,
  curlOpenedAmount = openedAmount,
  cornerFold = 0,
  closedAmount = 0,
  number,
  turningTime,
  curveScale = 1,
  immediate = false,
}: AnimatePageBonesParams) => {
  let targetRotation = MathUtils.lerp(Math.PI / 2, -Math.PI / 2, openedAmount);
  // Click keeps curl at the extreme target; drag reuses that so mid-scrub still bends.
  let curlRotation = MathUtils.lerp(
    Math.PI / 2,
    -Math.PI / 2,
    curlOpenedAmount
  );
  const openBookMix = 1 - closedAmount;
  if (openBookMix > 0) {
    const pageFan = degToRad(number * 0.8) * openBookMix;
    targetRotation += pageFan;
    curlRotation += pageFan;
  }

  const insideCurve = INSIDE_CURVE_STRENGTH * curveScale;
  const outsideCurve = OUTSIDE_CURVE_STRENGTH * curveScale;
  const turningCurve = TURNING_CURVE_STRENGTH * curveScale;

  const bones = mesh.skeleton.bones;
  for (let i = 0; i < bones.length; i++) {
    const target = i === 0 ? group : bones[i];
    if (target == null) {
      continue;
    }

    const insideCurveIntensity = i < 7 ? Math.sin(i * 0.2 + 0.25) : 0;
    const outsideCurveIntensity = i >= 7 ? Math.cos(i * 0.3 + 0.09) : 0;
    const turningIntensity =
      Math.sin(i * Math.PI * (1 / bones.length)) * turningTime;

    const openRotationAngle =
      insideCurve * insideCurveIntensity * targetRotation -
      outsideCurve * outsideCurveIntensity * targetRotation +
      turningCurve * turningIntensity * curlRotation;
    const closedRotationAngle = i === 0 ? targetRotation : 0;
    let rotationAngle = MathUtils.lerp(
      openRotationAngle,
      closedRotationAngle,
      closedAmount
    );

    const openFoldRotationAngle = degToRad(
      Math.sin(curlRotation) * 2 * curveScale
    );
    const foldRotationAngle = openFoldRotationAngle * openBookMix;

    const foldIntensity =
      i > 8
        ? Math.sin(i * Math.PI * (1 / bones.length) - 0.5) * turningTime
        : 0;
    let foldAngle = foldRotationAngle * foldIntensity;
    let twistAngle = 0;

    const peel = getCornerPeel(i, bones.length, cornerFold);
    if (peel > 0) {
      rotationAngle += degToRad(PAGE_CORNER_FOLD_TURN_DEG) * peel;
      foldAngle += degToRad(PAGE_CORNER_FOLD_BEND_DEG) * peel;
      twistAngle = degToRad(PAGE_CORNER_FOLD_TWIST_DEG) * peel;
    }

    if (immediate) {
      target.rotation.y = rotationAngle;
      target.rotation.x = foldAngle;
      target.rotation.z = twistAngle;
      continue;
    }

    easing.dampAngle(target.rotation, 'y', rotationAngle, EASING_FACTOR, delta);
    easing.dampAngle(
      target.rotation,
      'x',
      foldAngle,
      EASING_FACTOR_FOLD,
      delta
    );
    easing.dampAngle(
      target.rotation,
      'z',
      twistAngle,
      EASING_FACTOR_FOLD,
      delta
    );
  }
};
