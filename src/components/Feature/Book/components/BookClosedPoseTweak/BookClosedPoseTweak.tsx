import type { FC } from 'react';
import type { BookStage } from '../BookStage';
import styles from './BookClosedPoseTweak.module.scss';
import { TweakAxis } from './components/TweakAxis';
import { CLOSED_POSE_TWEAK_AXES } from './constants';

export type BookClosedPose = {
  position: [number, number, number];
  rotationDeg: [number, number, number];
};

type BookClosedPoseTweakProps = {
  stage: BookStage;
  value: BookClosedPose;
  onChange: (next: BookClosedPose) => void;
};

/** TEMP: remove after poses are locked into constants. */
export const BookClosedPoseTweak: FC<BookClosedPoseTweakProps> = ({
  stage,
  value,
  onChange,
}) => {
  const [px, py, pz] = value.position;
  const [rx, ry, rz] = value.rotationDeg;
  const isPresent = stage === 'presented';

  const handleAxis = (
    group: 'position' | 'rotationDeg',
    axis: 0 | 1 | 2,
    next: number
  ) => {
    const vec = [...value[group]] as [number, number, number];
    vec[axis] = next;
    onChange({ ...value, [group]: vec });
  };

  return (
    <aside className={styles.root} aria-label="Book pose tweak">
      <p className={styles.title}>
        {isPresent ? 'Present pose (temp)' : 'Closed pose (temp)'}
      </p>
      {CLOSED_POSE_TWEAK_AXES.map((axis) => (
        <TweakAxis
          key={axis.label}
          label={axis.label}
          min={axis.min}
          max={axis.max}
          step={axis.step}
          value={value[axis.group][axis.index]}
          onChange={(next) => handleAxis(axis.group, axis.index, next)}
        />
      ))}
      <code className={styles.code}>
        {isPresent
          ? `BOOK_PRESENT_POSITION = [${px.toFixed(3)}, ${py.toFixed(3)}, ${pz.toFixed(3)}]`
          : `BOOK_CLOSED_POSITION = [${px.toFixed(3)}, ${py.toFixed(3)}, ${pz.toFixed(3)}]`}
        <br />
        {isPresent
          ? `BOOK_PRESENT_ROTATION = [${rx.toFixed(0)}, ${ry.toFixed(0)}, ${rz.toFixed(0)}]`
          : `BOOK_ROTATION = [${rx.toFixed(0)}, ${ry.toFixed(0)}, ${rz.toFixed(0)}]`}
      </code>
    </aside>
  );
};
