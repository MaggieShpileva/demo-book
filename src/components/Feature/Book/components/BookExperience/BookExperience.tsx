import type { FC } from 'react';
import { PAGE_WIDTH } from '../../constants';
import { useBookCamera } from '../../hooks/useBookCamera';
import { useBookInvalidate } from '../../hooks/useBookInvalidate';
import { BookMesh } from '../BookMesh';

type BookExperienceProps = {
  page: number;
  delayedPage: number;
};

export const BookExperience: FC<BookExperienceProps> = ({
  page,
  delayedPage,
}) => {
  useBookInvalidate(page, delayedPage);
  useBookCamera(delayedPage);

  return (
    <>
      <group position={[-PAGE_WIDTH / 2, 0, 0]} rotation={[0, Math.PI, 0]}>
        <BookMesh page={page} delayedPage={delayedPage} />
      </group>
    </>
  );
};
