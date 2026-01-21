import { configureStore } from '@reduxjs/toolkit'
import statsReducer from './redux/StatsSlice.jsx'
import { loadState, saveState } from './utils/storage.js'

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    stats : statsReducer,
  },
  preloadedState: persistedState,
});

store.subscribe( () => {
  saveState({
    stats: store.getState().stats,
  });
});