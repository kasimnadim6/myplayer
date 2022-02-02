import { createSlice } from '@reduxjs/toolkit';

const initialState: { isLoading: boolean } = {
  isLoading: true,
};
const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoadingState(state, { payload }) {
      state.isLoading = payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
