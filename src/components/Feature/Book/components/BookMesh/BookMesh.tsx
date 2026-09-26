import type { FC, MutableRefObject } from 'react';
import { BookPage } from '../BookPage';
import { BookSpine } from '../BookSpine';
import { bookSheets } from '../../utils/buildBookSheets';

type BookMeshProps = {
  page: number;
  delayedPage: number;
  sheetAmountsRef: MutableRefObject<number[]>;
};

export const BookMesh: FC<BookMeshProps> = ({
  page,
  delayedPage,
  sheetAmountsRef,
}) => {
  const sheetCount = bookSheets.length;

  return (
    <group rotation-y={Math.PI / 2}>
      <BookSpine
        sheetCount={sheetCount}
        delayedPage={delayedPage}
        sheetAmountsRef={sheetAmountsRef}
      />
      {bookSheets.map((sheet, index) => (
        <BookPage
          key={index}
          number={index}
          front={sheet.Front}
          back={sheet.Back}
          opened={delayedPage > index}
          delayedPage={delayedPage}
          sheetCount={sheetCount}
          page={page}
          sheetAmountsRef={sheetAmountsRef}
        />
      ))}
    </group>
  );
};
