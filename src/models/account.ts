export interface LoginCredentials {
  email: string;
  password: string;
}

export type EnumLogin = keyof LoginCredentials;

export interface LoginUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
}

export interface SignUp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface ResultAccount {
  id: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  accountStatus: string;
  emailVerified: boolean;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}