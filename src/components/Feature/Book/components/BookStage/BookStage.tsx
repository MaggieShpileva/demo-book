import { useEffect, useRef, useState, type FC, type ReactNode } from 'react';
import { BOOK_EXIT_DELAY_MS } from '../../bookIntroConstants';
import { BookStageContext, type BookStage } from './BookStageContext';

type BookStageProviderProps = {
  children: ReactNode;
};

export const BookStageProvider: FC<BookStageProviderProps> = ({ children }) => {
  const [stage, setStage] = useState<BookStage>('idle');
  const [presentSettled, setPresentSettled] = useState(false);
  const stageRef = useRef(stage);
  const exitTimerRef = useRef<number | null>(null);
  const exitScheduledRef = useRef(false);

  stageRef.current = stage;

  useEffect(() => {
    return () => {
      if (exitTimerRef.current != null) {
        window.clearTimeout(exitTimerRef.current);
      }
    };
  }, []);

  return (
    <BookStageContext.Provider
      value={{
        stage,
        presentSettled,
        present: () => {
          if (exitTimerRef.current != null) {
            window.clearTimeout(exitTimerRef.current);
            exitTimerRef.current = null;
          }
          exitScheduledRef.current = false;
          setPresentSettled(false);
          setStage('presented');
        },
        setPresentSettled,
        notifyProductsLevitating: () => {
          if (
            exitScheduledRef.current ||
            stageRef.current !== 'presented'
          ) {
            return;
          }

          exitScheduledRef.current = true;
          exitTimerRef.current = window.setTimeout(() => {
            exitTimerRef.current = null;
            setStage('exiting');
          }, BOOK_EXIT_DELAY_MS);
        },
        enterReading: () => {
          if (stageRef.current !== 'exiting') {
            return;
          }

          setStage('reading');
        },
      }}
    >
      {children}
    </BookStageContext.Provider>
  );
};
