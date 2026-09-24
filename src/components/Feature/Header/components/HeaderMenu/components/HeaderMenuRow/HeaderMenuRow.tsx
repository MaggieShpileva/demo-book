import type { FC } from 'react';
import type { HeaderMenuItem } from '../../../../types';
import { HeaderMenuLink } from '../HeaderMenuLink/HeaderMenuLink';
import styles from './HeaderMenuRow.module.scss';

type HeaderMenuRowProps = {
  item: HeaderMenuItem;
  onNavigate?: () => void;
};

export const HeaderMenuRow: FC<HeaderMenuRowProps> = ({ item, onNavigate }) => {
  const Icon = item.icon;

  return (
    <HeaderMenuLink
      href={item.href}
      resource={item.resource}
      className={styles.headerMenuRow}
      onClick={onNavigate}
    >
      <span className={styles.line} />
      {Icon ? <Icon className={styles.icon} aria-hidden /> : null}
      <span className={styles.label}>{item.label}</span>
    </HeaderMenuLink>
  );
};
