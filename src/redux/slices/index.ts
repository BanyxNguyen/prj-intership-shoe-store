import {combineReducers} from 'redux';
import AccountsSlice, {accountSelectors} from './accountsSlice';
import productSlice, {productSelectors} from './productSlice';

const rootReducer = combineReducers({
  account: AccountsSlice,
  product: productSlice,
});

export default rootReducer;

export const selectors = {
  account: accountSelectors,
  product: productSelectors,
};

export type RootState = ReturnType<typeof rootReducer>;
