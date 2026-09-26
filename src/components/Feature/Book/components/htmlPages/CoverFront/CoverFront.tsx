import type { CSSProperties, FC } from 'react';
import { BookHtmlPage } from '@components/Feature/Book/components/BookHtmlPage';
import {
  COVER_CORNER_RADIUS,
  COVER_WIDTH,
  PAGE_HTML_WIDTH_PX,
} from '@components/Feature/Book/constants';
import styles from './styles.module.scss';
import WEBP_Image from '@/assets/images/cover-page.webp';
export const CoverFront: FC = () => {
  const radiusPx = (COVER_CORNER_RADIUS / COVER_WIDTH) * PAGE_HTML_WIDTH_PX;
  const contentStyle = {
    borderTopRightRadius: `${radiusPx}px`,
    borderBottomRightRadius: `${radiusPx}px`,
  } satisfies CSSProperties;

  return (
    <BookHtmlPage side="right">
      <div className={styles.content} style={contentStyle}>
        <img src={WEBP_Image} alt="cover" className={styles.image} />
      </div>
    </BookHtmlPage>
  );
};
