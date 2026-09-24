const SETTLE_EPS = 0.00005;

export const isBookPoseSettled = (current: number, target: number) =>
  Math.abs(current - target) <= SETTLE_EPS;
