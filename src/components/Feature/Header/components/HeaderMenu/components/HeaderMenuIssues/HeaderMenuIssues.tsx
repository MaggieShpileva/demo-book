import type { FC } from 'react';
import clsx from 'clsx';
import type { HeaderMenuItem } from '../../../../types';
import { HeaderMenuLink } from '../HeaderMenuLink/HeaderMenuLink';
import styles from './HeaderMenuIssues.module.scss';

type HeaderMenuIssuesProps = {
  items: HeaderMenuItem[];
  onNavigate?: () => void;
};

export const HeaderMenuIssues: FC<HeaderMenuIssuesProps> = ({
  items,
  onNavigate,
}) => (
  <ul className={styles.headerMenuIssues}>
    {items.map((item) => (
      <li key={item.id} className={styles.item}>
        <HeaderMenuLink
          href={item.href}
          resource={item.resource}
          className={clsx(styles.link, { [styles.linkActive]: item.isActive })}
          onClick={onNavigate}
        >
          {item.label}
        </HeaderMenuLink>
      </li>
    ))}
  </ul>
);
