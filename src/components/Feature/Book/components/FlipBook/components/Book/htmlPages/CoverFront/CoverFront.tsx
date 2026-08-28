import type { FC } from 'react';
import { BookHtmlPage } from '../../components/BookHtmlPage';
import JPG_Front from '@/assets/images/front.jpg';
import styles from './styles.module.scss';

export const CoverFront: FC = () => (
  <BookHtmlPage side="right">
    <img className={styles.image} src={JPG_Front} alt="" />
  </BookHtmlPage>
);
