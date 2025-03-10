# Redux Setup and DevTools Guide

## Redux Setup Overview

This project has been set up with Redux Toolkit for state management and includes Redux DevTools support for browser inspection.

### Key Components:

1. **Store**: `src/store/index.ts` - The central Redux store
2. **Slices**: `src/store/slices/` - Contains Redux toolkit slices
3. **Hooks**: `src/store/hooks.ts` - Custom hooks for TypeScript support

## Using Redux in Components

```tsx
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { myAction } from '../store/slices/mySlice';

function MyComponent() {
  // Get values from the store
  const value = useAppSelector((state) => state.myFeature.value);
  
  // Get the dispatch function
  const dispatch = useAppDispatch();
  
  // Dispatch an action
  const handleClick = () => {
    dispatch(myAction(payload));
  };
  
  return (
    <button onClick={handleClick}>
      Current value: {value}
    </button>
  );
}
```

## Using Redux DevTools in Browser

Redux DevTools allows you to inspect and debug your Redux state changes in real time.

### Installation:

1. Install the Redux DevTools browser extension:
   - [Chrome](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
   - [Firefox](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)
   - [Edge](https://microsoftedge.microsoft.com/addons/detail/redux-devtools/nnkgneoiohoecpdiaponcejilbhhikei)

### Using the DevTools:

1. Open your application in the browser
2. Press F12 to open developer tools
3. Look for a "Redux" tab (if you don't see it, look for "⟫" to show more tabs)
4. Now you can:
   - See state changes in real time
   - Time-travel through actions
   - Inspect the current state
   - Dispatch actions manually

### Features:

- **State Tree**: View your entire Redux state
- **Action List**: See all dispatched actions
- **Diff View**: See what changed with each action
- **Time Travel**: Click on past actions to revert the state
- **Dispatcher**: Test new actions without writing code

## Adding a New Slice

To add a new feature to Redux:

1. Create a new slice in `src/store/slices/`
2. Add the reducer to the store in `src/store/index.ts`
3. Use the slice in your components

Example slice template:

```tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface MyFeatureState {
  value: string;
}

const initialState: MyFeatureState = {
  value: '',
};

export const myFeatureSlice = createSlice({
  name: 'myFeature',
  initialState,
  reducers: {
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setValue } = myFeatureSlice.actions;
export default myFeatureSlice.reducer;
``` 