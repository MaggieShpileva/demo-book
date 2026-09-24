import type { CSSProperties, FC } from 'react';
import clsx from 'clsx';
import styles from './HeaderNavSection.module.scss';

type HeaderNavSectionStyle = CSSProperties & {
  '--header-nav-fill'?: string;
};

type HeaderNavSectionProps = {
  isActive: boolean;
  isCover?: boolean;
  isBack?: boolean;
  ariaLabel: string;
  label?: string;
  progress?: string;
  fillRatio?: number;
  onSelect: () => void;
};

export const HeaderNavSection: FC<HeaderNavSectionProps> = ({
  isActive,
  isCover = false,
  isBack = false,
  ariaLabel,
  label,
  progress,
  fillRatio = 0,
  onSelect,
}) => (
  <button
    type="button"
    className={clsx(styles.headerNavSection, {
      [styles.headerNavSectionActive]: isActive,
      [styles.headerNavSectionCover]: isCover,
      [styles.headerNavSectionBack]: isBack,
    })}
    style={
      {
        '--header-nav-fill': String(fillRatio),
      } satisfies HeaderNavSectionStyle
    }
    aria-current={isActive ? 'true' : undefined}
    aria-label={ariaLabel}
    onClick={onSelect}
  >
    <span className={styles.fill} />
    <span className={styles.tick} aria-hidden />
    {label != null ? (
      <span className={styles.title} aria-hidden>
        {label}
      </span>
    ) : null}
    {progress != null ? (
      <span className={styles.progress} aria-hidden>
        {progress}
      </span>
    ) : null}
  </button>
);
