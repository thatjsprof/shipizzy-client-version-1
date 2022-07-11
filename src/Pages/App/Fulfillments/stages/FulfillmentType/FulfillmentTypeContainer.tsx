import MakeGraphQLRequest, {
  checkError,
  IRequestProps,
} from "Utils/GraphqlRequest";
import { graphql } from "react-apollo";
import React, { useState } from "react";
import { flowRight as compose } from "lodash";
import FulfillmentsType from "./FulfillmentsType";
import { CREATE_FULFILLMENT } from "Graphql/Resolvers/Fulfillment/Fulfillment.mutationdefs";

const FulfillmentTypeContainer = ({ createFulfillment, ...props }: any) => {
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

  return (
    <FulfillmentsType
      {...props}
      loading={loading}
      createFulfillment={makeFulfillment}
    />
  );
};

export default compose(
  graphql(CREATE_FULFILLMENT, { name: "createFulfillment" })
)(FulfillmentTypeContainer);
