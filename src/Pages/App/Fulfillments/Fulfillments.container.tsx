import MakeGraphQLRequest, {
  checkError,
  IRequestProps,
} from "Utils/GraphqlRequest";
import { graphql } from "react-apollo";
import React, { useState } from "react";
import Fulfillments from "./Fulfillments";
import { flowRight as compose } from "lodash";
import {
  LIST_FULFILLMENTS,
  SEARCH_FULFILLMENTS,
} from "Graphql/Resolvers/Fulfillment/Fulfillment.mutationdefs";

const FulfillmentsContainer = ({
  listFulfillments,
  searchFulfillments,
}: any) => {
  const [loading, setLoading] = useState<boolean>(false);

  const getFulfillments = async (payload: any) => {
    let requestOptions: IRequestProps = {
      payloadOptions: {
        variables: payload,
      },
      requestFunction: listFulfillments,
    };

    setLoading(true);

    const { error, data } = await MakeGraphQLRequest(requestOptions);

    setLoading(false);

    checkError(error);

    return data;
  };

  const makeSearchFulfillments = async (payload: any) => {
    let requestOptions: IRequestProps = {
      payloadOptions: {
        variables: payload,
      },
      requestFunction: searchFulfillments,
    };

    setLoading(true);

    const { error, data } = await MakeGraphQLRequest(requestOptions);

    setLoading(false);

    checkError(error);

    return data;
  };

  return (
    <Fulfillments
      loading={loading}
      getFulfillments={getFulfillments}
      makeSearchFulfillments={makeSearchFulfillments}
    />
  );
};

export default compose(
  graphql(LIST_FULFILLMENTS, { name: "listFulfillments" }),
  graphql(SEARCH_FULFILLMENTS, { name: "searchFulfillments" })
)(FulfillmentsContainer);
