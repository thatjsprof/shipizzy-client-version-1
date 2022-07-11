import { gql } from "apollo-boost";

export const CREATE_FULFILLMENT = gql`
  mutation AddFulfillment($fulfillmentDetails: FulfillmentDetails) {
    addFulfillment(fulfillmentDetails: $fulfillmentDetails) {
      userId
    }
  }
`;

export const LIST_FULFILLMENTS = gql`
  mutation GetFulfillments($userID: String) {
    getFulfillments(userID: $userID) {
      type
      userId
    }
  }
`;
