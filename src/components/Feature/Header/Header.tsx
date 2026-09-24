import type { FC } from 'react';
import { AnimatePresence } from 'motion/react';
import { HeaderBar } from './components/HeaderBar/HeaderBar';
import { HeaderMenu } from './components/HeaderMenu/HeaderMenu';
import { useHeaderMenu } from './hooks/useHeaderMenu';
import styles from './Header.module.scss';

export const Header: FC = () => {
  const { isOpen, toggle, close } = useHeaderMenu();

  return (
    <header className={styles.header}>
      <HeaderBar isOpen={isOpen} onToggle={toggle} />
      <AnimatePresence>
        {isOpen ? <HeaderMenu onClose={close} /> : null}
      </AnimatePresence>
    </header>
  );
};
