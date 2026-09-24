import type { FC } from 'react';
import { BookPage } from '../BookPage';
import { BookSpine } from '../BookSpine';
import { bookSheets } from '../../utils/buildBookSheets';

type BookMeshProps = {
  page: number;
  delayedPage: number;
};

export const BookMesh: FC<BookMeshProps> = ({ page, delayedPage }) => {
  const sheetCount = bookSheets.length;
  const bookClosed = delayedPage === 0 || delayedPage === sheetCount;

  return (
    <group rotation-y={Math.PI / 2}>
      {/* <BookSpine sheetCount={sheetCount} delayedPage={delayedPage} /> */}
      {bookSheets.map((sheet, index) => (
        <BookPage
          key={index}
          number={index}
          front={sheet.Front}
          back={sheet.Back}
          opened={delayedPage > index}
          bookClosed={bookClosed}
          delayedPage={delayedPage}
          sheetCount={sheetCount}
          page={page}
        />
      ))}
    </group>
  );
};
