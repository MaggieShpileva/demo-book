export const CLOSE_FALLBACK_MS = 280;

type SyncDialogOpenStateParams = {
  dialog: HTMLDialogElement;
  isOpen: boolean;
  setIsVisible: (value: boolean) => void;
};

export const syncDialogOpenState = ({
  dialog,
  isOpen,
  setIsVisible,
}: SyncDialogOpenStateParams): (() => void) | void => {
  if (isOpen) {
    if (!dialog.open) dialog.showModal();

    const frameId = requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsVisible(true));
    });

    return () => cancelAnimationFrame(frameId);
  }

  setIsVisible(false);

  if (!dialog.open) return;

  const timeoutId = window.setTimeout(() => {
    if (dialog.open) dialog.close();
  }, CLOSE_FALLBACK_MS);

  return () => window.clearTimeout(timeoutId);
};
