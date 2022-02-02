import { configureStore } from '@reduxjs/toolkit';
import songReducer from './slices/song-slice';
import uiReducer from './slices/ui-slice';

const store = configureStore({
  reducer: { ui: uiReducer, songDetails: songReducer },
});
export default store;
