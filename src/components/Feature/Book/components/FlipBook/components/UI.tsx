import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';
import { bookPages } from './Book/htmlPages';
import { buildBookSheets } from './Book/utils/buildBookSheets';
import { useSinglePageBook } from '../hooks/useSinglePageBook';

export const pageAtom = atom(0);
export const cornerFoldAtom = atom(false);
/** Cover drag opened amount (0..1), or null when the cover is not being scrubbed. */
export const coverDragOpenedAtom = atom<number | null>(null);

export const UI = () => {
  const [page, setPage] = useAtom(pageAtom);
  const singlePage = useSinglePageBook();
  const sheets = buildBookSheets(bookPages, singlePage);
  const maxPage = singlePage ? sheets.length - 1 : sheets.length;

  useEffect(() => {
    const audio = new Audio('/audios/page-flip-01a.mp3');
    audio.play();
  }, [page]);

  useEffect(() => {
    setPage((current) => Math.min(current, maxPage));
  }, [maxPage, setPage]);

  return (
    <>
      <main className=" pointer-events-none select-none z-10 fixed  inset-0  flex justify-between flex-col">
        <a className="pointer-events-auto mt-10 ml-10" href="/">
          <span className="text-white font-bold">
            <span className="text-[#5a47ce]">{'{ '}</span>
            Krishna's Teachings by Adyaman Singh
            <span className="text-[#5a47ce]">{' }'}</span>
          </span>
        </a>
        <div className="w-full overflow-auto pointer-events-auto flex justify-center">
          <div className="overflow-auto flex items-center gap-4 max-w-full p-10">
            {Array.from({ length: maxPage + 1 }, (_, index) => (
              <button
                key={index}
                className={`border-transparent hover:border-white transition-all duration-300  px-4 py-3 rounded-full  text-lg uppercase shrink-0 border ${
                  index === page
                    ? 'bg-white/90 text-black'
                    : 'bg-black/30 text-white'
                }`}
                onClick={() => setPage(index)}
              >
                {index === 0
                  ? 'Cover'
                  : index === maxPage && !singlePage
                    ? 'Back Cover'
                    : `Page ${index}`}
              </button>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};
