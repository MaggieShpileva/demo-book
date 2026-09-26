import { createContext, useContext } from 'react';

export type BookStage = 'idle' | 'presented' | 'exiting' | 'reading';

type BookStageContextValue = {
  stage: BookStage;
  /** True once the book group has finished moving into present pose. */
  presentSettled: boolean;
  present: () => void;
  setPresentSettled: (settled: boolean) => void;
  /** Call once when products begin levitating — schedules exit after delay. */
  notifyProductsLevitating: () => void;
  /** After exit pose: fade products and open the reading spread. */
  enterReading: () => void;
};

export const BookStageContext = createContext<BookStageContextValue | null>(
  null
);

export const useBookStage = () => {
  const value = useContext(BookStageContext);
  if (value == null) {
    throw new Error('[Book] Stage provider is missing');
  }

  return value;
};
