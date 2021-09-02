import {CartCheckout} from './product';

export interface Login {
  UserName: string;
  PassWord: string;
}

export type EnumLogin = keyof Login;

export interface Register {
  UserName: string;
  PassWord: string;
  FirstName: string;
  LastName: string;
  Gender: 0 | 1;
  Birthday?: Date;
  Address?: string;
}

export type EnumRegister = keyof Register;

export interface Account {
  UserName: string;
  FirstName: string;
  LastName: string;
  Birthday: Date;
  Gender: 0 | 1;
  Address: string;
}

export type EnumAccount = keyof Account;
