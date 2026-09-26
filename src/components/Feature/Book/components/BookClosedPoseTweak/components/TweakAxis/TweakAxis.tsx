import type { FC } from 'react';
import styles from '../../BookClosedPoseTweak.module.scss';

type TweakAxisProps = {
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (next: number) => void;
};

export const TweakAxis: FC<TweakAxisProps> = ({
  label,
  min,
  max,
  step,
  value,
  onChange,
}) => (
  <label className={styles.row}>
    {label}
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
    />
    <span>{step < 1 ? value.toFixed(2) : value.toFixed(0)}</span>
  </label>
);
