import { createSlice } from '@reduxjs/toolkit';

export interface UiState {
  isDateModalOpen: boolean;
}

const initialState: UiState = {
  isDateModalOpen: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    onOpenDateModal: ( state ) => {
      state.isDateModalOpen = true;
    },
    onCloseDateModal: ( state ) => {
      state.isDateModalOpen = false;
    },
  },
});

export const { onCloseDateModal, onOpenDateModal } = uiSlice.actions;

export default uiSlice.reducer;