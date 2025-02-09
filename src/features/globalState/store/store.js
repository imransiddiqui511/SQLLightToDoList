import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from '../slice/itemsSlice';

export const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
});
