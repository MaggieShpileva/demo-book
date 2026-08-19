type BindDialogEventsParams = {
  dialog: HTMLDialogElement;
  onClose: () => void;
  onHide: () => void;
};

export const bindDialogEvents = ({
  dialog,
  onClose,
  onHide,
}: BindDialogEventsParams): (() => void) => {
  const handleClose = () => {
    onHide();
    onClose();
  };

  const handleCancel = (event: Event) => {
    event.preventDefault();
    onClose();
  };

  dialog.addEventListener('close', handleClose);
  dialog.addEventListener('cancel', handleCancel);

  return () => {
    dialog.removeEventListener('close', handleClose);
    dialog.removeEventListener('cancel', handleCancel);
  };
};
