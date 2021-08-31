import _ from 'lodash';
import {Alert} from 'react-native';
import {createSlice, Dispatch} from '@reduxjs/toolkit';

import {AppThunk} from '../store';
import {RootState} from './index';
import {accountService} from '../../services';
import {Account, InfoOrder, Login, Register} from '../../models';

interface InitialState {
  profile: Account;
  infoOrderHistory: InfoOrder;
}

const defaultAccount: InitialState = {
  profile: {} as Account,
  infoOrderHistory: {} as InfoOrder,
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

export const loadLoginUser = (): AppThunk => async (dispatch: Dispatch, getState) => {
  const {account} = getState();
  const result = await accountService.getProfile();
  dispatch(setAccount({...account, profile: result}));
};

export const loginUser =
  (loginForm: Login, callback = (emit: boolean) => {}): AppThunk =>
  async (dispatch: Dispatch, getState) => {
    const {account} = getState();
    const notify = 'Wrong email or password, please try again';
    try {
      const user = await accountService.login(loginForm);
      if (!user) Alert.alert(notify);
      console.log('user :', user);
      callback(true);
      dispatch(setAccount({...account, profile: user}));
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

// info order
export const loadInfoOrder = (): AppThunk => async (dispatch: Dispatch, getState) => {
  const {account} = getState();
  const result = await accountService.getInfoOrder();
  if (!_.isEmpty(result)) {
    dispatch(setAccount({...account, infoOrderHistory: result}));
  }
};

export const saveInfoOrder =
  (infoOrder: InfoOrder): AppThunk =>
  async (dispatch: Dispatch, getState) => {
    const {account} = getState();
    await accountService.saveInfoOrder(infoOrder);
    dispatch(setAccount({...account, infoOrderHistory: infoOrder}));
  };

export const checkAndGetInfoOrder = (): AppThunk => async (dispatch: Dispatch, getState) => {
  const {account} = getState();
  const {profile} = account;
  const result = await accountService.getInfoOrder();

  const {FirstName, LastName, Address} = profile;
  const TenNguoiNhan = profile ? FirstName + ' ' + LastName : result?.TenNguoiNhan || '';
  const DiaChiNguoiNhan = profile ? Address : result?.DiaChiNguoiNhan || '';

  const temp = {
    TenNguoiNhan,
    SoDienThoai: result?.SoDienThoai || '',
    DiaChiNguoiNhan,
  };

  await accountService.saveInfoOrder(temp);
  dispatch(setAccount({...account, infoOrderHistory: temp}));
};

export const accountSelectors = {
  select: (state: RootState): InitialState => state.account,
};

export default AccountReducer.reducer;
