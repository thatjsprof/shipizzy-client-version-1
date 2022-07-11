import React from "react";
import { graphql } from "react-apollo";
import Lf from "Utils/LocalForage/config";
import { flowRight as compose } from "lodash";
import {
  GET_USER,
  DECODE_TOKEN,
} from "Graphql/Resolvers/Users/Users.mutationdefs";
import { IRequestProps } from "Utils/GraphqlRequest";
import { getCurrentAuthenticatedUser } from "Store/UserSlice";

const AuthProvider = ({ getUser, children, decodeToken }: any) => {
  React.useEffect(() => {
    const initialize = async () => {
      const authToken = await Lf.getItem("authToken");

      let requestOptionsDecodeToken: IRequestProps = {
        payloadOptions: {
          variables: { token: authToken },
        },
        requestFunction: decodeToken,
      };

      await getCurrentAuthenticatedUser(getUser, requestOptionsDecodeToken);
    };

    initialize();
  }, [decodeToken, getUser]);

  return <>{children}</>;
};

export default compose(
  graphql(GET_USER, { name: "getUser" }),
  graphql(DECODE_TOKEN, { name: "decodeToken" })
)(AuthProvider);
