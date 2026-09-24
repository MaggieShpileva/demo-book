import { PAGE_WALK_FAR_MS, PAGE_WALK_NEAR_MS } from '../constants';

export const stepDelayedPage = (page: number, delayedPage: number) => {
  if (page === delayedPage) {
    return null;
  }

  return {
    next: page > delayedPage ? delayedPage + 1 : delayedPage - 1,
    delayMs:
      Math.abs(page - delayedPage) > 2 ? PAGE_WALK_FAR_MS : PAGE_WALK_NEAR_MS,
  };
};
