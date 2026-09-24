import type { FC } from 'react';
import { motion } from 'motion/react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import SVG_logo from '@assets/icons/header/logo.svg?react';
import { HEADER_COPY, HEADER_MENU_ID } from '../../constants';
import { HeaderNav } from '../HeaderNav/HeaderNav';
import styles from './HeaderBar.module.scss';

type HeaderBarProps = {
  isOpen: boolean;
  onToggle: () => void;
};

export const HeaderBar: FC<HeaderBarProps> = ({ isOpen, onToggle }) => (
  <div className={styles.headerBar}>
    <Link to="/" className={styles.logo} aria-label={HEADER_COPY.logo}>
      <SVG_logo aria-hidden />
    </Link>
    <HeaderNav />
    <motion.button
      type="button"
      className={clsx(styles.toggle, { [styles.toggleHidden]: isOpen })}
      aria-expanded={isOpen}
      aria-controls={HEADER_MENU_ID}
      aria-label={HEADER_COPY.openMenu}
      tabIndex={isOpen ? -1 : undefined}
      animate={{ opacity: isOpen ? 0 : 1 }}
      transition={{ duration: 0.28, ease: 'linear' }}
      onClick={onToggle}
    >
      <span className={styles.burger} />
    </motion.button>
  </div>
);
