export const CLOSED_POSE_TWEAK_AXES = [
  { group: 'position', index: 0, label: 'pos X', min: -2, max: 2, step: 0.01 },
  { group: 'position', index: 1, label: 'pos Y', min: -2, max: 2, step: 0.01 },
  { group: 'position', index: 2, label: 'pos Z', min: -12, max: 4, step: 0.01 },
  {
    group: 'rotationDeg',
    index: 0,
    label: 'rot X°',
    min: -180,
    max: 180,
    step: 1,
  },
  {
    group: 'rotationDeg',
    index: 1,
    label: 'rot Y°',
    min: -180,
    max: 180,
    step: 1,
  },
  {
    group: 'rotationDeg',
    index: 2,
    label: 'rot Z°',
    min: -180,
    max: 180,
    step: 1,
  },
] as const;
