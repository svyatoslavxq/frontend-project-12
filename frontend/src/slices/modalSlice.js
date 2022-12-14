/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    type: null,
    item: null,
  },
  reducers: {
    openModal: (state, { payload }) => {
      state.type = payload.type;
      state.item = payload.itemId;
    },
    closeModal: (state) => {
      state.type = null;
      state.item = null;
    },
  },
});

export const modalTypes = {
  removing: 'removing',
  renaming: 'renaming',
  adding: 'adding',
};

export const modalSelector = (state) => state.modal;
export const { openModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
