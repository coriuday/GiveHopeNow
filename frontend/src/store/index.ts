import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import counterReducer from './slices/counterSlice';
import projectsReducer from './slices/projectsSlice';

// Import reducers
// Example: import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    projects: projectsReducer,
    // Add more reducers here as needed
    // Example: auth: authReducer,
  },
  // Add middleware here if needed
  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  // DevTools configuration
  devTools: process.env.NODE_ENV !== 'production',
});

// Optional setup for RTK Query
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 