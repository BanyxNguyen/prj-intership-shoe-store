import {createSlice, Dispatch} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {AppThunk} from '../store';
import {Account, Login, Register} from '../../models';
import {RootState} from './index';
import {accountService} from '../../services';

const defaultAccount = {} as Account;

const AccountReducer = createSlice({
  name: 'accounts',
  initialState: defaultAccount,
  reducers: {
    setAccount(state, action) {
      return action.payload;
    },
  },
});

export const {setAccount} = AccountReducer.actions;

export const loadLoginUser = () => async (dispatch: Dispatch) => {};

export const loginUser =
  (loginForm: Login, callback = (emit: Account | null) => {}): AppThunk =>
  async (dispatch: Dispatch) => {
    const user = await accountService.login(loginForm);
    if (!user) Alert.alert('Wrong email or password, please try again');
    callback(user);
    dispatch(setAccount(user));
    return user;
  };

export const registerUser =
  (data: Register, callback = () => {}): AppThunk =>
  async (dispatch: Dispatch) => {
    const token = await accountService.register(data);

    // if (!result) {
    //   Alert.alert('Wrong email or password, please try again');
    // } else {
    //   const user = await accountService.login({password, email});
    //   if (!user) {
    //     Alert.alert('Wrong email or password, please try again');
    //   }
    //   dispatch(setAccount(user));
    //   callback();
    //   return user;
    // }
  };

export const accountSelectors = {
  select: (state: RootState): Account | null => state.accounts,
};

export default AccountReducer.reducer;
