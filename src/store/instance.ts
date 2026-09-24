import type { RootState } from './rootReducer';

export type StoreRef = {
  getState: () => RootState;
  dispatch: (action: unknown) => unknown;
  subscribe: (listener: () => void) => () => void;
};

let storeRef: StoreRef | null = null;

export const setStore = (store: StoreRef): void => {
  storeRef = store;
};

export const getStore = (): StoreRef => {
  if (!storeRef) {
    throw new Error('Store ещё не инициализирован');
  }
  return storeRef;
};
