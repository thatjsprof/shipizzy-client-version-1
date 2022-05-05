declare namespace auth {
  interface ISignIn {
    email: string;
    password: string;
  }

  interface ISignUp {
    name: string;
    email: string;
    password: string;
    confirm_password?: string;
    accountType: string;
    businessName?: string;
    rcNumber?: string;
    agree?: boolean;
  }

  interface IForgotPassword {
    email: string;
  }

  interface IResetPassword {
    password: string;
    newPassword: string;
  }

  interface IUserInfo {
    name: string;
    email: string;
  }

  type AccountType = {
    value: "business" | "individual";
    text: string;
  };
}

type LinksType = {
  name: string;
  icon: string;
  active?: boolean;
  url: string;
}[];

interface Column {
  id: string | number;
  label: string;
  minWidth?: number;
  align?: "right" | "left";
  format?: (value: number) => string;
}
