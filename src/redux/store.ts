import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import rootReducer, {RootState} from './Slices';

const store = configureStore({
  reducer: rootReducer,
});

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;

export default store;
