import {combineReducers} from 'redux';
import AccountsSlice, {accountSelectors} from './accountsSlice';

const rootReducer = combineReducers({
  accounts: AccountsSlice,
});

export default rootReducer;

export const selectors = {
  account: accountSelectors,
};

export type RootState = ReturnType<typeof rootReducer>;
