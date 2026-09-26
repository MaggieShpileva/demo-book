import type { FC } from 'react';
import type { BookClosedPose } from '../../BookClosedPoseTweak';
import { TweakAxis } from '../TweakAxis';

type ClosedPoseAxesProps = {
  value: BookClosedPose;
  onPosition: (axis: 0 | 1 | 2, next: number) => void;
  onRotation: (axis: 0 | 1 | 2, next: number) => void;
};

const POSITION_AXES = [
  { axis: 0 as const, label: 'pos X', min: -2, max: 2, step: 0.01 },
  { axis: 1 as const, label: 'pos Y', min: -2, max: 2, step: 0.01 },
  { axis: 2 as const, label: 'pos Z', min: -12, max: 4, step: 0.01 },
];

const ROTATION_AXES = [
  { axis: 0 as const, label: 'rot X°', min: -180, max: 180, step: 1 },
  { axis: 1 as const, label: 'rot Y°', min: -180, max: 180, step: 1 },
  { axis: 2 as const, label: 'rot Z°', min: -180, max: 180, step: 1 },
];

export const ClosedPoseAxes: FC<ClosedPoseAxesProps> = ({
  value,
  onPosition,
  onRotation,
}) => (
  <>
    {POSITION_AXES.map((item) => (
      <TweakAxis
        key={item.label}
        label={item.label}
        min={item.min}
        max={item.max}
        step={item.step}
        value={value.position[item.axis]}
        onChange={(next) => onPosition(item.axis, next)}
      />
    ))}
    {ROTATION_AXES.map((item) => (
      <TweakAxis
        key={item.label}
        label={item.label}
        min={item.min}
        max={item.max}
        step={item.step}
        value={value.rotationDeg[item.axis]}
        onChange={(next) => onRotation(item.axis, next)}
      />
    ))}
  </>
);
