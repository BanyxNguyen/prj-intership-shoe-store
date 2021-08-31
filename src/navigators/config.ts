import {Product, OptionMenu} from '../models';
import {NavigationProp, NavigatorScreenParams, RouteProp} from '@react-navigation/native';

export const WELCOMESCREEN = 'WELCOMESCREEN';
export const LOGINSCREEN = 'LOGINSCREEN';
export const REGISTERSCREEN = 'REGISTERSCREEN';
export const HOMESCREEN = 'HOMESCREEN';
export const DETAILSCREEN = 'DETAILSCREEN';
export const PROFILESCREEN = 'PROFILESCREEN';
export const LOGINLOGOUTSCREEN = 'LOGINLOGOUTSCREEN';
export const SEARCHSCREEN = 'SEARCHSCREEN';
export const SHOWANDFILTERSCREEN = 'SHOWANDFILTERSCREEN';
export const CHECKOUTSCREEN = 'CHECKOUTSCREEN';

export type ScreenName =
  | 'HOMESCREEN'
  | 'LOGINSCREEN'
  | 'SEARCHSCREEN'
  | 'DETAILSCREEN'
  | 'PROFILESCREEN'
  | 'WELCOMESCREEN'
  | 'CHECKOUTSCREEN'
  | 'REGISTERSCREEN'
  | 'LOGINLOGOUTSCREEN'
  | 'SHOWANDFILTERSCREEN';

export const TABSHOP = 'SHOP';
export const TABDROPS = 'DROPS';
export const TABWISHLISH = 'WISHLISH';
export const TABCARTSCREEN = 'CART';

export interface IWelcomeScreenParams {}
export interface IHomeScreenParams {}
export interface IDetailScreenParams {
  data: Product;
  readOnly?: boolean;
}
export interface ISearchScreenParams {}
export interface ILoginLogOutScreenParams {
  page: number;
}
export interface IShowAndFilterScreenParams {
  title: string;
  options: OptionMenu;
}
export interface IProfileScreenParams {}
export interface ICheckoutScreenParams {}

export type StackParams = {
  [HOMESCREEN]: IHomeScreenParams;
  [SEARCHSCREEN]: ISearchScreenParams;
  [DETAILSCREEN]: IDetailScreenParams;
  [PROFILESCREEN]: IProfileScreenParams;
  [WELCOMESCREEN]: IWelcomeScreenParams;
  [CHECKOUTSCREEN]: ICheckoutScreenParams;
  [LOGINLOGOUTSCREEN]: ILoginLogOutScreenParams;
  [SHOWANDFILTERSCREEN]: IShowAndFilterScreenParams;

  // TAB
  [TABSHOP]: {};
  [TABDROPS]: {};
  [TABWISHLISH]: {};
  [TABCARTSCREEN]: {};
};

export type StackNavigationProp = NavigationProp<StackParams>;
export type StackNavigatorScreenParams = NavigatorScreenParams<StackParams>;

export type WelcomeScreenRouteProp = RouteProp<StackParams, 'WELCOMESCREEN'>;
export type LoginLogOutScreenRouteProp = RouteProp<StackParams, 'LOGINLOGOUTSCREEN'>;
export type HomeScreenRouteProp = RouteProp<StackParams, 'HOMESCREEN'>;
export type SearchScreenRouteProp = RouteProp<StackParams, 'SEARCHSCREEN'>;
export type ShowAndFilterScreenRouteProp = RouteProp<StackParams, 'SHOWANDFILTERSCREEN'>;
export type ProfileScreenRouteProp = RouteProp<StackParams, 'PROFILESCREEN'>;
export type CheckoutScreenRouteProp = RouteProp<StackParams, 'CHECKOUTSCREEN'>;
