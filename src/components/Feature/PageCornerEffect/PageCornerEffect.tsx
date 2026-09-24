import type { FC, ReactNode } from 'react';
import WEBP_effects from '@assets/images/stage1/effects.webp';
import styles from './PageCornerEffect.module.scss';

type PageCornerEffectProps = {
  children: ReactNode;
};

export const PageCornerEffect: FC<PageCornerEffectProps> = ({ children }) => (
  <div className={styles.root}>
    {children}
    <img className={styles.effect} src={WEBP_effects} alt="Эффекты" />
  </div>
);
