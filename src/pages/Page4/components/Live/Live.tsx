import type { FC } from 'react';
import { BookLive } from '@components/Feature/Book/components/BookLive';
import { Point } from '@/components/UI';
import type { Point as PagePoint } from '@/data/pages';
import { getFactById } from '@/mock';
import { openModal } from '@/store/features/modal';
import { useAppDispatch } from '@/store/hooks';
import styles from './Live.module.scss';

type LiveProps = {
  productName: string;
  points?: PagePoint[];
};

export const Live: FC<LiveProps> = ({ productName, points }) => {
  const dispatch = useAppDispatch();

  return (
    <BookLive>
      {points?.map((point, index) => {
        const factId = point.factId;
        const fact = factId == null ? undefined : getFactById(factId);

        return (
          <Point
            className={styles.point}
            key={`point-${index}`}
            style={{ top: `${point.top}%`, left: `${point.left}%` }}
            aria-label={fact?.title ?? productName}
            onClick={() => {
              if (factId != null) {
                dispatch(openModal(factId));
              }
            }}
          />
        );
      })}
    </BookLive>
  );
};
