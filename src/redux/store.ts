import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import rootReducer, {RootState} from './slices';
// import logger from 'redux-logger';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: rootReducer,
  middleware: [thunk],
});

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;

export default store;
