import React from "react";

type ConditionType = (userAuth: auth.IUserInfo | null) => boolean;

const AuthenticatedLayout =
  (condition: ConditionType, message?: string) =>
  <P extends object>(Component: React.ComponentType<P>): React.FC<P> =>
  (props) => {
    return <Component {...(props as P)} />;
  };

export default AuthenticatedLayout;
