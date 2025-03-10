import { configureStore } from '@reduxjs/toolkit'
import testReducer from './features/testSlice'

// Create the store
export const store = configureStore({
  reducer: {
    test: testReducer
  },
  devTools: true // Enable Redux DevTools
})

// Export types
export type AppDispatch = typeof store.dispatch
export type AppState = ReturnType<typeof store.getState> 