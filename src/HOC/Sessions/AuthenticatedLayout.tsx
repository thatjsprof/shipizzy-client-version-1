import React from "react";
import { IUserInfo } from "Interfaces/Auth";

type ConditionType = (userAuth: IUserInfo | null) => boolean;

const AuthenticatedLayout =
  (condition: ConditionType, message?: string) =>
  <P extends object>(Component: React.ComponentType<P>): React.FC<P> =>
  (props) => {
    return <Component {...(props as P)} />;
  };

export default AuthenticatedLayout;
