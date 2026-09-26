import SVG_contents from '@assets/icons/header/contents.svg?react';
import SVG_max from '@assets/icons/header/max.svg?react';
import SVG_products from '@assets/icons/header/products.svg?react';
import SVG_vk from '@assets/icons/header/vk.svg?react';
import type { HeaderMenuItem } from './types';

export const HEADER_COPY = {
  logo: 'Золотое яблоко',
  openMenu: 'Открыть меню',
  closeMenu: 'Закрыть меню',
  menu: 'Меню',
  bookNav: 'Навигация по книге',
  navContents: 'Содержание',
  navBack: 'Задняя обложка',
} as const;

export const HEADER_MENU_ITEMS: HeaderMenuItem[] = [
  {
    id: 'contents',
    label: 'содержание',
    href: '/',
    resource: 'internal',
    icon: SVG_contents,
    items: [
      {
        id: 'archive',
        label: 'Архив',
        href: '/',
        resource: 'internal',
        isActive: true,
      },
      {
        id: 'gloss',
        label: 'Глянец',
        href: '/',
        resource: 'internal',
        isActive: false,
      },
      {
        id: 'digital',
        label: 'Диджитал',
        href: '/',
        resource: 'internal',
        isActive: false,
      },
    ],
  },
  {
    id: 'products',
    label: 'подборка товаров',
    href: 'https://goldapple.ru/',
    resource: 'external',
    icon: SVG_products,
  },
  {
    id: 'max',
    label: 'макс',
    href: 'https://max.ru',
    resource: 'external',
    icon: SVG_max,
  },
  {
    id: 'vk',
    label: 'vk',
    href: 'https://vk.com/goldapple',
    resource: 'external',
    icon: SVG_vk,
  },
];

export const HEADER_MENU_ID = 'app-header-menu';

/** Fade-in for book progress nav after intro completes. */
export const HEADER_NAV_REVEAL_MS = 560;
