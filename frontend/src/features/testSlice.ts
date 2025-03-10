import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface TestState {
  count: number;
}

const initialState: TestState = {
  count: 0
}

export const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    increment: (state) => {
      state.count += 1
    },
    decrement: (state) => {
      state.count -= 1
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.count += action.payload
    }
  }
})

export const { increment, decrement, incrementByAmount } = testSlice.actions
export default testSlice.reducer 