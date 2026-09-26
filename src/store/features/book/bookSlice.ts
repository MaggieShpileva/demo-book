import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { bookPages } from '@/data/bookPages';

type BookState = {
  loaderProgress: number;
  page: number;
  /** True after intro finishes and the open book has settled on page 1. */
  introComplete: boolean;
  /**
   * Next page change should flip intermediate sheets as one pack
   * (skip per-page delayed walk).
   */
  packJump: boolean;
  /**
   * Bumps on every page navigation (flip, header nav, contents).
   * Resets the page-corner idle autoplay timer.
   */
  cornerIdleNonce: number;
};

type BookRootState = {
  book: BookState;
};

const lastPage = bookPages.length;

const clampPage = (page: number) => Math.min(lastPage, Math.max(0, page));

const initialState: BookState = {
  loaderProgress: 0,
  page: 0,
  introComplete: false,
  packJump: false,
  cornerIdleNonce: 0,
};

export const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    setLoaderProgress: (state, action: PayloadAction<number>) => {
      state.loaderProgress = Math.min(100, Math.max(0, action.payload));
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = clampPage(action.payload);
      state.packJump = false;
      state.cornerIdleNonce += 1;
    },
    /** Jump with stacked sheets flipping together when |delta| > 1. */
    setPagePack: (state, action: PayloadAction<number>) => {
      state.page = clampPage(action.payload);
      state.packJump = true;
      state.cornerIdleNonce += 1;
    },
    clearPackJump: (state) => {
      state.packJump = false;
    },
    setIntroComplete: (state, action: PayloadAction<boolean>) => {
      state.introComplete = action.payload;
    },
  },
});

export const {
  setLoaderProgress,
  setPage: setBookPage,
  setPagePack: setBookPagePack,
  clearPackJump: clearBookPackJump,
  setIntroComplete: setBookIntroComplete,
} = bookSlice.actions;

export const selectLoaderProgress = (state: BookRootState) =>
  state.book.loaderProgress;

export const selectBookPage = (state: BookRootState) => state.book.page;

export const selectBookIntroComplete = (state: BookRootState) =>
  state.book.introComplete;

export const selectBookPackJump = (state: BookRootState) => state.book.packJump;

export const selectBookCornerIdleNonce = (state: BookRootState) =>
  state.book.cornerIdleNonce;
