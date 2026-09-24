import { stepDelayedPage } from './stepDelayedPage';

export const runDelayedPageWalk = (
  page: number,
  getDelayedPage: () => number,
  setDelayedPage: (page: number) => void
) => {
  let timeout = 0;
  let current = getDelayedPage();

  const goToPage = () => {
    const step = stepDelayedPage(page, current);
    if (step == null) {
      return;
    }

    current = step.next;
    setDelayedPage(current);
    timeout = window.setTimeout(goToPage, step.delayMs);
  };

  goToPage();

  return () => {
    window.clearTimeout(timeout);
  };
};
