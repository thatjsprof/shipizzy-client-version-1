export interface ISignIn {
  email: string;
  password: string;
}

type UserSexTypes = "male" | "female" | "trans";
type UserAccountTypes = "business" | "individual";

export interface IUser {
  id: string | null;
  email: string | null;
  lastName: string | null;
  firstName: string | null;
  rcNumber?: string | null;
  sex?: UserSexTypes | null;
  isVerified: boolean | null;
  businessName?: string | null;
  dateOfBirth?: string | Date | null;
  phoneNumber?: string | number | null;
  defaultSenderAddress?: string | null;
  accountType?: UserAccountTypes | null;
  defaultReceiverAddress?: string | null;
}

export type PartialUser = Partial<IUser>;

export interface UserState {
  user: Partial<IUser>;
  isInitialized: boolean;
  isAuthenticated?: boolean;
}

export interface ILoginUser {
  authDetails: ISignIn;
}

export interface IToken {
  token: string;
}

export interface ISignUp {
  name: string;
  email: string;
  agree?: boolean;
  password: string;
  rcNumber?: string;
  accountType: string;
  businessName?: string;
  confirm_password?: string;
}

export interface ISignUpUser {
  userDetails: ISignUp;
}

export interface IForgotPassword {
  email: string;
}

export interface IResetPassword {
  password: string;
  newPassword: string;
}

export interface IChangePassword {
  password: string;
  newPassword: string;
  confirmPassword: string;
}

export interface IUserInfo {
  name: string;
  email: string;
}

export type AccountType = {
  text: string;
  value: UserAccountTypes;
};
