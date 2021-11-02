declare namespace auth {
  interface ISignIn {
    email: string;
    password: string;
  }

  interface ISignUp {
    name: string;
    email: string;
    password: string;
    confirm_password: string;
  }

  interface IForgotPassword {
    email: string;
  }

  interface IUserInfo {
    name: string;
    email: string;
  }

  type AccountType = {
    value: "Business" | "Individual";
    text: string;
  };
}

type LinksType = { name: string; icon: string; url: string }[];

interface Column {
  id: string | number;
  label: string;
  minWidth?: number;
  align?: "right" | "left";
  format?: (value: number) => string;
}