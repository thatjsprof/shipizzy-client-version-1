import React from "react";
import Dashboard from "./Dashboard";
import MakeGraphQLRequest, {
  checkError,
  IRequestProps,
} from "Utils/GraphqlRequest";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import {
  TOTAL_MONTHLY_TRANSACTIONS,
  TOTAL_TRANSACTION,
} from "Graphql/Resolvers/Transaction/Transaction.mutationdefs";

const DashboardContainer = ({
  totalTransactionAmount,
  totalMonthlyTransactions,
}: any) => {
  const makeTransactionAmount = async (payload: any) => {
    let requestOptions: IRequestProps = {
      payloadOptions: {
        variables: payload,
      },
      requestFunction: totalTransactionAmount,
    };

    const { error, data } = await MakeGraphQLRequest(requestOptions);

    checkError(error);

    return data;
  };

  const makeTransactionTotals = async (payload: any) => {
    let requestOptions: IRequestProps = {
      payloadOptions: {
        variables: payload,
      },
      requestFunction: totalMonthlyTransactions,
    };

    const { error, data } = await MakeGraphQLRequest(requestOptions);

    checkError(error);

    return data;
  };

  return (
    <Dashboard
      totalAmount={makeTransactionAmount}
      totalMonthlyTransactions={makeTransactionTotals}
    />
  );
};

export default compose(
  graphql(TOTAL_TRANSACTION, { name: "totalTransactionAmount" }),
  graphql(TOTAL_MONTHLY_TRANSACTIONS, { name: "totalMonthlyTransactions" })
)(DashboardContainer);
