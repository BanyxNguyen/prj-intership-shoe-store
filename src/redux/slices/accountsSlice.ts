import _ from 'lodash';
import {Alert} from 'react-native';
import {createSlice, Dispatch} from '@reduxjs/toolkit';

import {AppThunk} from '../store';
import {RootState} from './index';
import {accountService} from '../../services';
import {Account, InfoOrder, Login, Register} from '../../models';
import {LoadingScreen} from '../../InitGeneral';

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
    LoadingScreen.start();
    const {account} = getState();
    const notify = 'Wrong email or password, please try again';
    try {
      const user = await accountService.login(loginForm);
      if (!user) Alert.alert(notify);
      console.log('user :', user);
      LoadingScreen.stop();
      callback(true);
      dispatch(setAccount({...account, profile: user}));
      return user;
    } catch (error) {
      callback(false);
      Alert.alert(notify);
      console.log('login', error);
      LoadingScreen.stop();
    }
  };

export const registerUser =
  (registerForm: Register, callback = (emit: boolean) => {}): AppThunk =>
  async (dispatch: Dispatch, getState) => {
    LoadingScreen.start();
    const {account} = getState();
    const notify = 'Register invalid, please try again';
    try {
      const user = await accountService.register(registerForm);
      if (!user) Alert.alert(notify);
      console.log('user :', user);
      callback(true);
      dispatch(setAccount({...account, profile: user}));
      LoadingScreen.stop();
      return user;
    } catch (error) {
      console.log('registerUser', error.response.data);
      Alert.alert(_.get(error, 'response.data[0].Description', 'Username or password invalid'));
      callback(false);
    }
    LoadingScreen.stop();
  };

export const editProfile =
  (profileForm: Account, callback = (emit: boolean) => {}): AppThunk =>
  async (dispatch: Dispatch, getState) => {
    LoadingScreen.start();
    const {account} = getState();
    const notify = 'Register invalid, please try again';
    try {
      const user = await accountService.update(profileForm);
      if (!user) Alert.alert(notify);
      console.log('user :', user);
      callback(true);
      dispatch(setAccount({...account, profile: user}));
      LoadingScreen.stop();
      return user;
    } catch (error) {
      // console.log('registerUser', error.response.data);
      Alert.alert(
        _.get(error, 'response.data[0].Description', 'Network error, please try again!!!'),
      );
      callback(false);
    }
    LoadingScreen.stop();
  };
export const logout =
  (callback = () => {}): AppThunk =>
  async (dispatch: Dispatch, getState) => {
    LoadingScreen.start();
    setTimeout(async () => {
      const {account} = getState();
      await accountService.logout();
      dispatch(setAccount({...account, profile: {}}));
      callback();
      LoadingScreen.stop();
    }, 1200);
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
  console.log(result);

  const {FirstName, LastName, Address} = profile;
  const TenNguoiNhan = !_.isEmpty(profile)
    ? FirstName + ' ' + LastName
    : result?.TenNguoiNhan || '';
  const DiaChiNguoiNhan = !_.isEmpty(profile.Address) ? Address : result?.DiaChiNguoiNhan || '';

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
