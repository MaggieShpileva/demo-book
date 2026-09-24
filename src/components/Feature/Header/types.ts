import type { FC, SVGProps } from 'react';

export type HeaderMenuResource = 'internal' | 'external';

export type HeaderMenuItem = {
  id: string;
  label: string;
  href: string;
  resource: HeaderMenuResource;
  icon?: FC<SVGProps<SVGSVGElement>>;
  isActive?: boolean;
  items?: HeaderMenuItem[];
};
