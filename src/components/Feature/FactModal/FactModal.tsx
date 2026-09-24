import type { FC } from 'react';
import { BottomModal } from 'components-funtech-ui';
import { getFactById } from '@/mock';
import {
  closeModal,
  selectModalFactId,
  selectModalIsOpen,
} from '@/store/features/modal';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { FactModalContent } from './components/FactModalContent';
import styles from './FactModal.module.scss';

export const FactModal: FC = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(selectModalIsOpen);
  const factId = useAppSelector(selectModalFactId);
  const fact = factId == null ? undefined : getFactById(factId);

  return (
    <BottomModal
      isOpen={isOpen}
      onClose={() => dispatch(closeModal())}
      aria-label={fact?.title}
      classNames={{
        root: styles.modal,
        handle: styles.handle,
        content: styles.content,
      }}
    >
      {fact ? <FactModalContent fact={fact} /> : null}
    </BottomModal>
  );
};
