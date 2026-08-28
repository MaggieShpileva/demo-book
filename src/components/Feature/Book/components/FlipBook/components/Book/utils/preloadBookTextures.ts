import type { FC } from 'react';
import { bookPages } from '../htmlPages';
import { BlankPage } from '../htmlPages/BlankPage';
import { getPageTexture } from './pageTextureCache';

const UNIQUE_BOOK_PAGES: FC[] = [...new Set([...bookPages, BlankPage])];

export const preloadBookTextures = () =>
  Promise.all(UNIQUE_BOOK_PAGES.map((Page) => getPageTexture(Page))).then(
    () => undefined
  );
