import { useEffect, useRef, useState, type FC, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import { bindDialogEvents } from './utils/bindDialogEvents';
import { closeDialogAfterExit } from './utils/closeDialogAfterExit';
import { syncDialogOpenState } from './utils/syncDialogOpenState';
import styles from './Modal.module.scss';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  'aria-labelledby'?: string;
  'aria-describedby'?: string;
};

export const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className,
  'aria-labelledby': ariaLabelledby,
  'aria-describedby': ariaDescribedby,
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    return syncDialogOpenState({ dialog, isOpen, setIsVisible });
  }, [isOpen]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    return bindDialogEvents({
      dialog,
      onClose,
      onHide: () => setIsVisible(false),
    });
  }, [onClose]);

  if (typeof document === 'undefined') return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className={clsx(styles.dialog, { [styles.visible]: isVisible }, className)}
      aria-labelledby={ariaLabelledby}
      aria-describedby={ariaDescribedby}
      onClick={(event) => {
        if (event.target === dialogRef.current) onClose();
      }}
    >
      <div
        className={styles.content}
        onClick={(event) => event.stopPropagation()}
        onTransitionEnd={(event) =>
          closeDialogAfterExit(event, { isVisible, dialog: dialogRef.current })
        }
      >
        {children}
      </div>
    </dialog>,
    document.body
  );
};
