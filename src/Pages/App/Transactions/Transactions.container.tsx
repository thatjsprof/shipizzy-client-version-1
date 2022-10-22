import React from "react";
import MakeGraphQLRequest, {
  checkError,
  IRequestProps,
} from "Utils/GraphqlRequest";
import { graphql } from "react-apollo";
import Transactions from "./Transactions";
import { flowRight as compose } from "lodash";
import {
  GET_TRANSACTIONS,
  SEARCH_TRANSACTIONS,
} from "Graphql/Resolvers/Transaction/Transaction.mutationdefs";

const TransactionsContainer = ({
  getTransactions,
  searchTransactions,
}: any) => {
  const [loading, setLoading] = React.useState<boolean>(false);

  const makeGetTransactions = async (payload: any) => {
    let requestOptions: IRequestProps = {
      payloadOptions: {
        variables: payload,
      },
      requestFunction: getTransactions,
    };

    setLoading(true);

    const { error, data } = await MakeGraphQLRequest(requestOptions);

    setLoading(false);

    checkError(error);

    return data;
  };

  const makeSearchTransaction = async (payload: any) => {
    let requestOptions: IRequestProps = {
      payloadOptions: {
        variables: payload,
      },
      requestFunction: searchTransactions,
    };

    setLoading(true);

    const { error, data } = await MakeGraphQLRequest(requestOptions);

    setLoading(false);

    checkError(error);

    return data;
  };

  return (
    <Transactions
      loading={loading}
      makeGetTransactions={makeGetTransactions}
      makeSearchTransaction={makeSearchTransaction}
    />
  );
};

export default compose(
  graphql(GET_TRANSACTIONS, { name: "getTransactions" }),
  graphql(SEARCH_TRANSACTIONS, { name: "searchTransactions" })
)(TransactionsContainer);
