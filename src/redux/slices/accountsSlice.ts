import {createSlice, Dispatch} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {AppThunk} from '../store';
import {Account, Login, Register} from '../../models';
import {RootState} from './index';
import {accountService} from '../../services';

interface InitialState {
  profile: Account;
}

const defaultAccount: InitialState = {
  profile: {} as Account,
};

const AccountReducer = createSlice({
  name: 'account',
  initialState: defaultAccount,
  reducers: {
    setAccount(state, action) {
      return action.payload;
    },
  },
});

export const {setAccount} = AccountReducer.actions;

export const loadLoginUser = () => async (dispatch: Dispatch) => {
  const account = await accountService.getProfile();
  dispatch(setAccount(account));
};

export const loginUser =
  (loginForm: Login, callback = (emit: boolean) => {}): AppThunk =>
  async (dispatch: Dispatch) => {
    const notify = 'Wrong email or password, please try again';
    try {
      const user = await accountService.login(loginForm);
      if (!user) Alert.alert(notify);
      console.log('user :', user);
      callback(true);
      dispatch(setAccount({profile: user}));
      return user;
    } catch (error) {
      callback(false);
      Alert.alert(notify);
      console.log('login', error);
    }
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
  select: (state: RootState): InitialState => state.account,
};

export default AccountReducer.reducer;
