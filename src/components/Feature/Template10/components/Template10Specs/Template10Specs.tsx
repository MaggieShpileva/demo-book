import type { FC } from 'react';
import clsx from 'clsx';
import styles from './Template10Specs.module.scss';

type Template10SpecsProps = {
  items: string[];
  className?: string;
};

export const Template10Specs: FC<Template10SpecsProps> = ({
  items,
  className,
}) => {
  const leftItems = items.slice(0, 3);
  const rightItems = items.slice(3);

  return (
    <div className={clsx(styles.root, className)}>
      <ul className={styles.column}>
        {leftItems.map((item) => (
          <li key={item} className={styles.item}>
            {item}
          </li>
        ))}
      </ul>
      <ul className={clsx(styles.column, styles.columnRight)}>
        {rightItems.map((item) => (
          <li key={item} className={styles.item}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
