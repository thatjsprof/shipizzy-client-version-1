import MakeGraphQLRequest, {
  checkError,
  IRequestProps,
} from "Utils/GraphqlRequest";
import Account from "./Account";
import { graphql } from "react-apollo";
import React, { useState } from "react";
import { useAppSelector } from "Store/Hooks";
import { flowRight as compose } from "lodash";
import { SEND_RESET_PASSWORD } from "Graphql/Resolvers/Users/Users.mutationdefs";

export interface IResetPayload {
  id: string;
  type: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
}

const AccountContainer = ({ resetPassword, ...props }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.user);

  const makeResetPassword = async (payload: IResetPayload) => {
    let requestOptions: IRequestProps = {
      payloadOptions: {
        variables: payload,
      },
      requestFunction: resetPassword,
    };

    setLoading(true);

    const { error, data } = await MakeGraphQLRequest(requestOptions);

    setLoading(false);

    checkError(error);

    return data;
  };

  return (
    <Account
      {...props}
      user={user}
      loading={loading}
      sendResetPassword={makeResetPassword}
    />
  );
};

export default compose(graphql(SEND_RESET_PASSWORD, { name: "resetPassword" }))(
  AccountContainer
);
