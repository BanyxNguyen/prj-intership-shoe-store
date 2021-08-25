import {NavigationProp, NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import {Product, FilterOptions} from '../models';

export const WELCOMESCREEN = 'WELCOMESCREEN';
export const LOGINSCREEN = 'LOGINSCREEN';
export const REGISTERSCREEN = 'REGISTERSCREEN';
export const HOMESCREEN = 'HOMESCREEN';
export const DETAILSCREEN = 'DETAILSCREEN';
export const PROFILESCREEN = 'PROFILESCREEN';
export const LOGINLOGOUTSCREEN = 'LOGINLOGOUTSCREEN';
export const SEARCHSCREEN = 'SEARCHSCREEN';
export const SHOWANDFILTERSCREEN = 'SHOWANDFILTERSCREEN';

export type ScreenName =
  | 'HOMESCREEN'
  | 'LOGINSCREEN'
  | 'SEARCHSCREEN'
  | 'DETAILSCREEN'
  | 'PROFILESCREEN'
  | 'WELCOMESCREEN'
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
}
export interface ISearchScreenParams {}
export interface ILoginLogOutScreenParams {
  page: number;
}
export interface IShowAndFilterScreenParams {
  title: string;
  options: FilterOptions;
}
export interface IProfileScreenParams {}

export type StackParams = {
  [HOMESCREEN]: IHomeScreenParams;
  [SEARCHSCREEN]: ISearchScreenParams;
  [DETAILSCREEN]: IDetailScreenParams;
  [PROFILESCREEN]: IProfileScreenParams;
  [WELCOMESCREEN]: IWelcomeScreenParams;
  [LOGINLOGOUTSCREEN]: ILoginLogOutScreenParams;
  [SHOWANDFILTERSCREEN]: IShowAndFilterScreenParams;
};

export type StackNavigationProp = NavigationProp<StackParams>;
export type StackNavigatorScreenParams = NavigatorScreenParams<StackParams>;

export type WelcomeScreenRouteProp = RouteProp<StackParams, 'WELCOMESCREEN'>;
export type LoginLogOutScreenRouteProp = RouteProp<StackParams, 'LOGINLOGOUTSCREEN'>;
export type HomeScreenRouteProp = RouteProp<StackParams, 'HOMESCREEN'>;
export type SearchScreenRouteProp = RouteProp<StackParams, 'SEARCHSCREEN'>;
export type ShowAndFilterRouteProp = RouteProp<StackParams, 'SHOWANDFILTERSCREEN'>;
export type ProfileRouteProp = RouteProp<StackParams, 'PROFILESCREEN'>;
