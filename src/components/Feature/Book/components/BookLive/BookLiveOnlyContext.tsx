import { createContext, useContext, type FC, type ReactNode } from 'react';

const BookLiveOnlyContext = createContext(false);

export const useBookLiveOnly = () => useContext(BookLiveOnlyContext);

type BookLiveOnlyProviderProps = {
  children: ReactNode;
};

export const BookLiveOnlyProvider: FC<BookLiveOnlyProviderProps> = ({
  children,
}) => (
  <BookLiveOnlyContext.Provider value={true}>
    {children}
  </BookLiveOnlyContext.Provider>
);
