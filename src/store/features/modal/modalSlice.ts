import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ModalState = {
  isOpen: boolean;
  factId: number | null;
};

type ModalRootState = {
  modal: ModalState;
};

const initialState: ModalState = {
  isOpen: false,
  factId: null,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<number>) => {
      state.isOpen = true;
      state.factId = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export const selectModalIsOpen = (state: ModalRootState) => state.modal.isOpen;
export const selectModalFactId = (state: ModalRootState) => state.modal.factId;
