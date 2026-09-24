import { combineSlices } from '@reduxjs/toolkit';
import { bookSlice } from './features/book';
import { modalSlice } from './features/modal';

export const rootReducer = combineSlices(bookSlice, modalSlice);

export type RootState = ReturnType<typeof rootReducer>;
