import MakeGraphQLRequest, {
  checkError,
  IRequestProps,
} from "Utils/GraphqlRequest";
import { graphql } from "react-apollo";
import React, { useState } from "react";
import { ISignUpUser } from "Interfaces/Auth";
import { flowRight as compose } from "lodash";
import SignUpFormComponent from "./SignUpForm.component";
import {
  SIGN_UP_USER,
  LOGIN_GOOGLE_GET_URL,
  SIGN_UP_BUSINESS_USER,
} from "../../../Graphql/Resolvers/Users/Users.mutationdefs";

const SignUpFormContainer = ({
  getGoogleUrl,
  signUpNormalUser,
  signUpBusinessUser,
  ...props
}: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [googleLoading, setGoogleLoading] = useState<boolean>(false);

  const makeLoginNormalUser = async (payload: ISignUpUser) => {
    let requestOptions: IRequestProps = {
      payloadOptions: {
        variables: payload,
      },
      requestFunction: signUpNormalUser,
    };

    setLoading(true);

    const { error, data } = await MakeGraphQLRequest(requestOptions);

    checkError(error);

    setLoading(false);

    return data;
  };

  const makeLoginBusinessUser = async (payload: ISignUpUser) => {
    let requestOptions: IRequestProps = {
      payloadOptions: {
        variables: payload,
      },
      requestFunction: signUpBusinessUser,
    };

    setLoading(true);

    const { error, data } = await MakeGraphQLRequest(requestOptions);

    checkError(error);

    setLoading(false);

    return data;
  };

  const makeGoogleUrl = async (payload: ISignUpUser) => {
    let requestOptions: IRequestProps = {
      payloadOptions: {
        variables: payload,
      },
      requestFunction: getGoogleUrl,
    };

    setGoogleLoading(true);

    const { error, data } = await MakeGraphQLRequest(requestOptions);

    checkError(error);

    setGoogleLoading(false);

    return data;
  };

  return (
    <SignUpFormComponent
      {...props}
      loading={loading}
      getGoogleUrl={makeGoogleUrl}
      googleLoading={googleLoading}
      makeLoginNormalUser={makeLoginNormalUser}
      makeLoginBusinessUser={makeLoginBusinessUser}
    />
  );
};

export default compose(
  graphql(SIGN_UP_USER, { name: "signUpNormalUser" }),
  graphql(LOGIN_GOOGLE_GET_URL, { name: "getGoogleUrl" }),
  graphql(SIGN_UP_BUSINESS_USER, { name: "signUpBusinessUser" })
)(SignUpFormContainer);
