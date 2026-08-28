import type { FC } from 'react';
import { useAtom } from 'jotai';
import { pageAtom } from '../UI';
import { Page } from './components/Page';
import { bookPages } from './htmlPages';
import { useDelayedPage } from './hooks/useDelayedPage';
import { buildBookSheets } from './utils/buildBookSheets';
import type { BookProps } from './types';

type BookViewProps = BookProps & {
  singlePage?: boolean;
};

export const Book: FC<BookViewProps> = ({ singlePage = false, ...props }) => {
  const [page] = useAtom(pageAtom);
  const delayedPage = useDelayedPage(page);
  const sheets = buildBookSheets(bookPages, singlePage);
  const sheetCount = sheets.length;

  return (
    <group {...props} rotation-y={Math.PI / 2}>
      {sheets.map(({ Front, Back }, index) => (
        <Page
          key={index}
          page={delayedPage}
          sheetCount={sheetCount}
          number={index}
          opened={delayedPage > index}
          bookClosed={delayedPage === 0}
          Front={Front}
          Back={Back}
        />
      ))}
    </group>
  );
};
