import { degToRad } from 'three/src/math/MathUtils.js';
import {
  INSIDE_CURVE_STRENGTH,
  OUTSIDE_CURVE_STRENGTH,
  PAGE_FOLD_DEGREES,
  TURNING_CURVE_STRENGTH,
} from '../constants';

export const getBookBonePose = (
  index: number,
  boneCount: number,
  hingeRotation: number,
  targetRotation: number,
  turningTime: number,
  bookClosedAmount: number
) => {
  if (index === 0) {
    return { y: hingeRotation, x: 0 };
  }

  const open = 1 - Math.min(1, Math.max(0, bookClosedAmount));

  if (open <= 0) {
    return { y: 0, x: 0 };
  }

  const insideCurveIntensity = index < 8 ? Math.sin(index * 0.2 + 0.25) : 0;
  const outsideCurveIntensity = index >= 8 ? Math.cos(index * 0.3 + 0.09) : 0;
  const turningIntensity =
    Math.sin(index * Math.PI * (1 / boneCount)) * turningTime;
  const foldIntensity =
    index > 8
      ? Math.sin(index * Math.PI * (1 / boneCount) - 0.5) * turningTime
      : 0;

  return {
    y:
      (INSIDE_CURVE_STRENGTH * insideCurveIntensity * targetRotation -
        OUTSIDE_CURVE_STRENGTH * outsideCurveIntensity * targetRotation +
        TURNING_CURVE_STRENGTH * turningIntensity * targetRotation) *
      open,
    x:
      degToRad(Math.sin(targetRotation) * PAGE_FOLD_DEGREES) *
      foldIntensity *
      open,
  };
};
