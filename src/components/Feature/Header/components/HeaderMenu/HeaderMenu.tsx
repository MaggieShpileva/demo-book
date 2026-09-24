import type { FC } from 'react';
import { motion } from 'motion/react';
import SVG_cross from '@assets/icons/header/cross.svg?react';
import {
  HEADER_COPY,
  HEADER_MENU_ID,
  HEADER_MENU_ITEMS,
} from '../../constants';
import { HeaderMenuIssues } from './components/HeaderMenuIssues/HeaderMenuIssues';
import { HeaderMenuRow } from './components/HeaderMenuRow/HeaderMenuRow';
import styles from './HeaderMenu.module.scss';

type HeaderMenuProps = {
  onClose: () => void;
};

export const HeaderMenu: FC<HeaderMenuProps> = ({ onClose }) => (
  <motion.nav
    id={HEADER_MENU_ID}
    className={styles.headerMenu}
    aria-label={HEADER_COPY.menu}
    initial={{
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
      clipPath: 'circle(0% at 100% 0%)',
    }}
    animate={{
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
      clipPath: 'circle(180% at 100% 0%)',
    }}
    exit={{
      opacity: 1,
      transform: 'translate3d(0, 0, 0)',
      clipPath: 'circle(0% at 100% 0%)',
    }}
    transition={{ duration: 0.6, ease: [0.6, 1, 0.3, 1] }}
  >
    <motion.div
      className={styles.content}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.1, ease: 'linear' }}
    >
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, ease: 'linear' }}
        key="close-button"
        type="button"
        className={styles.close}
        aria-label={HEADER_COPY.closeMenu}
        onClick={onClose}
      >
        <SVG_cross aria-hidden />
      </motion.button>
      <div className={styles.list}>
        {HEADER_MENU_ITEMS.map((item) => (
          <div key={item.id} className={styles.group}>
            <HeaderMenuRow item={item} onNavigate={onClose} />
            {item.items ? (
              <HeaderMenuIssues items={item.items} onNavigate={onClose} />
            ) : null}
          </div>
        ))}
      </div>
    </motion.div>
  </motion.nav>
);
