import type { CSSProperties, FC } from 'react';
import { BookHtmlPage } from '@components/Feature/Book/components/BookHtmlPage';
import {
  COVER_CORNER_RADIUS,
  COVER_WIDTH,
  PAGE_HTML_WIDTH_PX,
} from '@components/Feature/Book/constants';
import styles from './styles.module.scss';

export const CoverFront: FC = () => {
  const radiusPx = (COVER_CORNER_RADIUS / COVER_WIDTH) * PAGE_HTML_WIDTH_PX;
  const contentStyle = {
    borderTopRightRadius: `${radiusPx}px`,
    borderBottomRightRadius: `${radiusPx}px`,
  } satisfies CSSProperties;

  return (
    <BookHtmlPage side="right">
      <div className={styles.content} style={contentStyle}>
        123
      </div>
    </BookHtmlPage>
  );
};
