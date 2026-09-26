import { useContext, type FC } from 'react';
import { BookLive } from '@components/Feature/Book/components/BookLive';
import { BookDragContext } from '@components/Feature/Book/components/BookDragState';
import {
  selectBookPage,
  setBookPage,
  setBookPagePack,
} from '@/store/features/book';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import styles from './ContentsZones.module.scss';

/** Matches bookPages indices — avoid importing bookPages (cycle via ContentsPage). */
const ARCHIVE_PAGE = 2;
const GLOSS_PAGE = 12;
/** Same as nav `back`: bookPages.length (closed book from the back). */
const BACK_COVER_PAGE = 23;

const ZONES = [
  {
    id: 'top',
    label: 'Зона 1',
    page: ARCHIVE_PAGE,
    className: styles.zoneTop,
    pack: false,
  },
  {
    id: 'middle',
    label: 'Зона 2',
    page: GLOSS_PAGE,
    className: styles.zoneMiddle,
    pack: true,
  },
  {
    id: 'bottom',
    label: 'Зона 3',
    page: BACK_COVER_PAGE,
    className: styles.zoneBottom,
    pack: true,
  },
] as const;

/** Three horizontal hit bands — temporary tinted debug overlays. */
export const ContentsZones: FC = () => {
  const dispatch = useAppDispatch();
  const page = useAppSelector(selectBookPage);
  // Null during HTML raster (no Book providers).
  const drag = useContext(BookDragContext);

  return (
    <BookLive className={styles.root}>
      {ZONES.map((zone) => (
        <button
          key={zone.id}
          type="button"
          className={`${styles.zone} ${zone.className}`}
          aria-label={zone.label}
          onPointerDown={(event) => {
            if (drag == null) {
              return;
            }
            event.preventDefault();
            event.stopPropagation();
            drag.startDrag(page, 'next', event.clientX, {
              onTap: () => {
                dispatch(
                  zone.pack
                    ? setBookPagePack(zone.page)
                    : setBookPage(zone.page)
                );
              },
            });
          }}
        />
      ))}
    </BookLive>
  );
};
