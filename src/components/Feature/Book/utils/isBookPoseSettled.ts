const SETTLE_EPS = 0.00005;
/** Looser threshold for present-pose arrival (damp never hits exact floats). */
const PRESENT_SETTLE_EPS = 0.015;

export const isBookPoseSettled = (current: number, target: number) =>
  Math.abs(current - target) <= SETTLE_EPS;

export const isBookPresentPoseSettled = (current: number, target: number) =>
  Math.abs(current - target) <= PRESENT_SETTLE_EPS;

/** Shortest angular distance in radians (handles Euler wrap). */
export const isBookAngleSettled = (current: number, target: number) => {
  let delta = Math.abs(current - target) % (Math.PI * 2);
  if (delta > Math.PI) {
    delta = Math.PI * 2 - delta;
  }

  return delta <= PRESENT_SETTLE_EPS;
};
