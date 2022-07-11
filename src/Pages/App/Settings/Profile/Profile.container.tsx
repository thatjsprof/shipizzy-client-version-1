import MakeGraphQLRequest, {
  checkError,
  IRequestProps,
} from "Utils/GraphqlRequest";
import Profile from "./Profile";
import { graphql } from "react-apollo";
import React, { useState } from "react";
import { useAppSelector } from "Store/Hooks";
import { flowRight as compose } from "lodash";
import { EDIT_USER } from "Graphql/Resolvers/Users/Users.mutationdefs";

const ProfileContainer = ({ editUser, ...props }: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.user);

  const makeEditUser = async (payload: any) => {
    let requestOptions: IRequestProps = {
      payloadOptions: {
        variables: payload,
      },
      requestFunction: editUser,
    };

    setLoading(true);

    const { error, data } = await MakeGraphQLRequest(requestOptions);

    setLoading(false);

    checkError(error);

    return data;
  };

  return (
    <Profile {...props} user={user} loading={loading} editUser={makeEditUser} />
  );
};

export default compose(graphql(EDIT_USER, { name: "editUser" }))(
  ProfileContainer
);
