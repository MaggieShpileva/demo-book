import { stepDelayedPage } from './stepDelayedPage';

type StepFn = (
  page: number,
  delayedPage: number
) => { next: number; delayMs: number } | null;

export const runDelayedPageWalk = (
  page: number,
  getDelayedPage: () => number,
  setDelayedPage: (page: number) => void,
  step: StepFn = stepDelayedPage
) => {
  let timeout = 0;
  let current = getDelayedPage();

  const goToPage = () => {
    const nextStep = step(page, current);
    if (nextStep == null) {
      return;
    }

    current = nextStep.next;
    setDelayedPage(current);
    timeout = window.setTimeout(goToPage, nextStep.delayMs);
  };

  goToPage();

  return () => {
    window.clearTimeout(timeout);
  };
};
