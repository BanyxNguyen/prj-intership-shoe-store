import {
  NavigationProp,
  NavigatorScreenParams,
  RouteProp,
} from '@react-navigation/native';

export const WELCOMESCREEN = 'WELCOMESCREEN';
export const LOGINSCREEN = 'LOGINSCREEN';
export const REGISTERSCREEN = 'REGISTERSCREEN';
export const HOMESCREEN = 'HOMESCREEN';
export const DETAILSCREEN = 'DETAILSCREEN';
export const PROFILESCREEN = 'PROFILESCREEN';
export const LOGINLOGOUTSCREEN = 'LOGINLOGOUTSCREEN';

export interface IWelcomeScreenParams {}

export interface IHomeScreenParams {}

export interface ILoginLogOutScreenParams {
  page: number;
}

export type StackParams = {
  [WELCOMESCREEN]: IWelcomeScreenParams;
  [LOGINLOGOUTSCREEN]: ILoginLogOutScreenParams;
  [HOMESCREEN]: IHomeScreenParams;
};

export type StackNavigationProp = NavigationProp<StackParams>;
export type StackNavigatorScreenParams = NavigatorScreenParams<StackParams>;

export type WelcomeScreenRouteProp = RouteProp<StackParams, 'WELCOMESCREEN'>;
export type LoginLogOutScreenRouteProp = RouteProp<
  StackParams,
  'LOGINLOGOUTSCREEN'
>;
export type HomeScreenRouteProp = RouteProp<StackParams, 'HOMESCREEN'>;
