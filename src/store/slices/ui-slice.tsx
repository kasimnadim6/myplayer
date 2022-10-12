import { createSlice } from "@reduxjs/toolkit";

const initialState: { isLoading: boolean; isError: boolean } = {
  isLoading: true,
  isError: false,
};
const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setLoadingState(state, { payload }) {
      state.isLoading = payload;
    },
    setError(state, { payload }) {
      state.isError = payload;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
