import {createSlice, Dispatch} from '@reduxjs/toolkit';
import {Alert} from 'react-native';
import {AppThunk} from '../store';
import {LoginCredentials, LoginUser, SignUp, ResultAccount} from '../../models';
import {RootState} from './index';
import {accountService} from '../../services';

const Accounts = createSlice({
  name: 'accounts',
  initialState: null,
  reducers: {
    setAccount(state, action) {
      return action.payload;
    },
  },
});

export const {setAccount} = Accounts.actions;

export const login =
  (loginForm: LoginCredentials): AppThunk =>
  async (dispatch: Dispatch) => {
    const user = await accountService.login(loginForm);
    if (!user) {
      Alert.alert('Wrong email or password, please try again');
    }
    dispatch(setAccount(user));
    return user;
  };

// export const signUp = (data: SignUp, callback = () => {}): AppThunk => async (
//   dispatch: Dispatch,
// ) => {
//   const {password, email} = data;
//   const result: ResultAccount = await accountService.signUp(data);
//   if (!result) {
//     Alert.alert('Wrong email or password, please try again');
//   } else {
//     const user = await accountService.login({password, email});
//     if (!user) {
//       Alert.alert('Wrong email or password, please try again');
//     }
//     dispatch(setAccount(user));
//     callback();
//     return user;
//   }
// };

// export const editAccount = (
//   userForm: LoginUser,
//   callback = () => {},
// ): AppThunk => async (dispatch: Dispatch) => {
//   await accountService.editAccount(userForm);
//   loadLoginUser(callback)(dispatch);
//   Alert.alert('You have successfully changed information');
// };

// export const logout = (): AppThunk => async (dispatch: Dispatch) => {
//   await accountService.logout();
//   dispatch(setAccount(null));
// };

// export const loadLoginUser = (callback = () => {}) => async (
//   dispatch: Dispatch,
// ) => {
//   const user = await accountService.getLoginUser();
//   if (user !== null) {
//     dispatch(setAccount(user));
//     callback();
//   }
//   return user;
// };

// export const uploadFile = (file: Object) => async () => {
//   const user = await accountService.uploadFile(file);
//   return user;
// };

export const accountSelectors = {
  select: (state: RootState): LoginUser | null => state.accounts,
};

export default Accounts.reducer;
