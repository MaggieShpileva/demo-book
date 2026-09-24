import type { FC } from 'react';
import clsx from 'clsx';
import { Typography } from '@components/UI';
import styles from './Template02Footer.module.scss';

type Template02FooterProps = {
  benefitsText: string;
  className?: string;
};

export const Template02Footer: FC<Template02FooterProps> = ({
  benefitsText,
  className,
}) => (
  <>
    <div className={clsx(styles.benefits, className)}>
      <hr className={styles.divider} />
      {benefitsText ? (
        <Typography size="body">{benefitsText}</Typography>
      ) : null}
    </div>
    <p className={styles.slideNumber}>01</p>
  </>
);
