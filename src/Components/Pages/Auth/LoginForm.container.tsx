import MakeGraphQLRequest, {
  checkError,
  IRequestProps,
} from "Utils/GraphqlRequest";
import { graphql } from "react-apollo";
import React, { useState } from "react";
import { ILoginUser } from "Interfaces/Auth";
import { flowRight as compose } from "lodash";
import {
  GET_USER,
  LOGIN_USER,
  DECODE_TOKEN,
  LOGIN_GOOGLE_GET_URL,
} from "Graphql/Resolvers/Users/Users.mutationdefs";
import LoginFormComponent from "./LoginForm.component";

const LoginFormContainer = ({
  getUser,
  loginUser,
  decodeToken,
  loginGoogleGetUrl,
  ...props
}: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  const makeLoginUserRequest = async (payload: ILoginUser) => {
    let requestOptions: IRequestProps = {
      payloadOptions: {
        variables: payload,
      },
      requestFunction: loginUser,
    };

    setLoading(true);

    const { error, data } = await MakeGraphQLRequest(requestOptions);

    setLoading(false);

    checkError(error);

    return data;
  };

  const makeLoginGoogleRequest = async () => {
    let requestOptions: IRequestProps = {
      requestFunction: loginGoogleGetUrl,
    };

    setGoogleLoading(true);

    const { error, data } = await MakeGraphQLRequest(requestOptions);

    setGoogleLoading(false);

    checkError(error);

    return data;
  };

  return (
    <LoginFormComponent
      {...props}
      loading={loading}
      getUser={getUser}
      makeDecodeToken={decodeToken}
      googleLoading={googleLoading}
      loginUser={makeLoginUserRequest}
      loginGoogleGetUrl={makeLoginGoogleRequest}
    />
  );
};

export default compose(
  graphql(GET_USER, { name: "getUser" }),
  graphql(LOGIN_USER, { name: "loginUser" }),
  graphql(DECODE_TOKEN, { name: "decodeToken" }),
  graphql(LOGIN_GOOGLE_GET_URL, { name: "loginGoogleGetUrl" })
)(LoginFormContainer);
