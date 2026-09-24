import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { bookPages } from '@/data/bookPages';

type BookState = {
  loaderProgress: number;
  page: number;
};

type BookRootState = {
  book: BookState;
};

const lastPage = bookPages.length;

const initialState: BookState = {
  loaderProgress: 0,
  page: 0,
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setLoaderProgress: (state, action: PayloadAction<number>) => {
      state.loaderProgress = Math.min(100, Math.max(0, action.payload));
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = Math.min(lastPage, Math.max(0, action.payload));
    },
  },
});

export const { setLoaderProgress, setPage: setBookPage } = bookSlice.actions;

export const selectLoaderProgress = (state: BookRootState) =>
  state.book.loaderProgress;

export const selectBookPage = (state: BookRootState) => state.book.page;
