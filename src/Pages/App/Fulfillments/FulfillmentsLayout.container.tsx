import MakeGraphQLRequest, {
  checkError,
  IRequestProps,
} from "Utils/GraphqlRequest";
import { graphql } from "react-apollo";
import React, { useState } from "react";
import { flowRight as compose } from "lodash";
import FulfillmentsLayout from "./FulfillmentsLayout";
import {
  CREATE_PAYMENT,
  VERIFY_PAYMENT,
} from "Graphql/Resolvers/Payment/Payment.mutationdefs";
import {
  EDIT_FULFILLMENT,
  CREATE_FULFILLMENT,
} from "Graphql/Resolvers/Fulfillment/Fulfillment.mutationdefs";
import { EDIT_USER } from "Graphql/Resolvers/Users/Users.mutationdefs";
import { ADD_TRANSACTION } from "Graphql/Resolvers/Transaction/Transaction.mutationdefs";

const FulfillmentLayoutContainer = ({
  searchTransactions,
  createFulfillment,
  editFulfillment,
  addTransaction,
  createPayment,
  verifyPayment,
  editUser,
  ...props
}: any) => {
  const [loading, setLoading] = useState<boolean>(false);

  const makeFulfillment = async (payload: any) => {
    let requestOptions: IRequestProps = {
      payloadOptions: {
        variables: payload,
      },
      requestFunction: createFulfillment,
    };

    setLoading(true);

    const { error, data } = await MakeGraphQLRequest(requestOptions);

    setLoading(false);

    checkError(error);

    return data;
  };

  const makeAddTransaction = async (payload: any) => {
    let requestOptions: IRequestProps = {
      payloadOptions: {
        variables: payload,
      },
      requestFunction: addTransaction,
    };

    setLoading(true);

    const { error, data } = await MakeGraphQLRequest(requestOptions);

    setLoading(false);

    checkError(error);

    return data;
  };

  const makeCreatePayment = async (payload: any) => {
    let requestOptions: IRequestProps = {
      payloadOptions: {
        variables: payload,
      },
      requestFunction: createPayment,
    };

    setLoading(true);

    const { error, data } = await MakeGraphQLRequest(requestOptions);

    setLoading(false);

    checkError(error);

    return data;
  };

  const makeVerifyPayment = async (payload: any) => {
    let requestOptions: IRequestProps = {
      payloadOptions: {
        variables: payload,
      },
      requestFunction: verifyPayment,
    };

    setLoading(true);

    const result = await MakeGraphQLRequest(requestOptions);

    setLoading(false);

    return result;
  };

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

  const makeEditFulfillment = async (payload: any) => {
    let requestOptions: IRequestProps = {
      payloadOptions: {
        variables: payload,
      },
      requestFunction: editFulfillment,
    };

    setLoading(true);

    const { error, data } = await MakeGraphQLRequest(requestOptions);

    setLoading(false);

    checkError(error);

    return data;
  };

  return (
    <FulfillmentsLayout
      {...props}
      loading={loading}
      makeEditUser={makeEditUser}
      createPayment={makeCreatePayment}
      verifyPayment={makeVerifyPayment}
      createFulfillment={makeFulfillment}
      addTransaction={makeAddTransaction}
      makeEditFulfillment={makeEditFulfillment}
    />
  );
};

export default compose(
  graphql(EDIT_USER, { name: "editUser" }),
  graphql(CREATE_PAYMENT, { name: "createPayment" }),
  graphql(VERIFY_PAYMENT, { name: "verifyPayment" }),
  graphql(ADD_TRANSACTION, { name: "addTransaction" }),
  graphql(EDIT_FULFILLMENT, { name: "editFulfillment" }),
  graphql(CREATE_FULFILLMENT, { name: "createFulfillment" })
)(FulfillmentLayoutContainer);
