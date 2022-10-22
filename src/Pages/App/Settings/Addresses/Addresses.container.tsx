import MakeGraphQLRequest, {
  checkError,
  IRequestProps,
} from "Utils/GraphqlRequest";
import { graphql } from "react-apollo";
import React, { useState } from "react";
import { useAppSelector } from "Store/Hooks";
import { flowRight as compose } from "lodash";
import Addresses, { IAddressPayload } from "./Addresses";
import {
  ADD_ADDRESS,
  GET_ADDRESS,
  EDIT_ADDRESS,
  DELETE_ADDRESS,
} from "Graphql/Resolvers/Addresses/Addresses.mutationdefs";

const AddressesContainer = ({
  addAddress,
  getAddress,
  editAddress,
  deleteAddress,
  ...props
}: any) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDelete, setLoadingDelete] = useState<boolean>(false);
  const { user } = useAppSelector((state) => state.user);

  const makeAddAddress = async (payload: IAddressPayload) => {
    let requestOptions: IRequestProps = {
      payloadOptions: {
        variables: payload,
      },
      requestFunction: addAddress,
    };

    setLoading(true);

    const { error, data } = await MakeGraphQLRequest(requestOptions);

    setLoading(false);

    checkError(error);

    return data;
  };

  const makeDeleteAddress = async (payload: { id: string }) => {
    let requestOptions: IRequestProps = {
      payloadOptions: {
        variables: payload,
      },
      requestFunction: deleteAddress,
    };

    setLoadingDelete(true);

    const { error, data } = await MakeGraphQLRequest(requestOptions);

    setLoadingDelete(false);

    checkError(error);

    return data;
  };

  const makeEditAddress = async (payload: IAddressPayload) => {
    console.log(payload);
    let requestOptions: IRequestProps = {
      payloadOptions: {
        variables: payload,
      },
      requestFunction: editAddress,
    };

    setLoading(true);

    const { error, data } = await MakeGraphQLRequest(requestOptions);

    setLoading(false);

    checkError(error);

    return data;
  };

  return (
    <Addresses
      {...props}
      user={user}
      loading={loading}
      makeGetAddress={getAddress}
      loadingDelete={loadingDelete}
      makeAddAddress={makeAddAddress}
      makeEditAddress={makeEditAddress}
      makeDeleteAddress={makeDeleteAddress}
    />
  );
};

export default compose(
  graphql(ADD_ADDRESS, { name: "addAddress" }),
  graphql(GET_ADDRESS, { name: "getAddress" }),
  graphql(EDIT_ADDRESS, { name: "editAddress" }),
  graphql(DELETE_ADDRESS, { name: "deleteAddress" })
)(AddressesContainer);
