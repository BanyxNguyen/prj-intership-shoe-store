import {NavigationProp, NavigatorScreenParams, RouteProp} from '@react-navigation/native';
import { ProductOptions } from '../models';

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

export interface IWelcomeScreenParams {}
export interface IHomeScreenParams {}
export interface IDetailScreenParams {}
export interface ISearchScreenParams {}
export interface ILoginLogOutScreenParams {
  page: number;
}
export interface IShowAndFilterScreenParams {
  title: string;
  options: ProductOptions
}

export type StackParams = {
  [HOMESCREEN]: IHomeScreenParams;
  [SEARCHSCREEN]: ISearchScreenParams;
  [DETAILSCREEN]: IDetailScreenParams;
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
