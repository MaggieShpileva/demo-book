import type { TransitionEvent } from 'react';

type CloseDialogAfterExitParams = {
  isVisible: boolean;
  dialog: HTMLDialogElement | null;
};

export const closeDialogAfterExit = (
  event: TransitionEvent<HTMLDivElement>,
  { isVisible, dialog }: CloseDialogAfterExitParams
): void => {
  if (event.target !== event.currentTarget) return;
  if (event.propertyName !== 'opacity') return;
  if (isVisible || !dialog?.open) return;

  dialog.close();
};
