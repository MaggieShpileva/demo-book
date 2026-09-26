import type { FC } from 'react';
import styles from './ContentsPage.module.scss';
import { ContentsZones } from './components/ContentsZones';
import WEBP_ContentsPage from '@/assets/images/contents-page.webp';

export const ContentsPage: FC = () => (
  <article className={styles.contentsPage} data-book-transparent>
    <img src={WEBP_ContentsPage} alt="" className={styles.image} />
    <ContentsZones />
  </article>
);
