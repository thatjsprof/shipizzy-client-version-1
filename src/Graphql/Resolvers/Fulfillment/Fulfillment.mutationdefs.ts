import { gql } from "apollo-boost";

export const CREATE_FULFILLMENT = gql`
  mutation AddFulfillment($fulfillmentDetails: FulfillmentDetails) {
    addFulfillment(fulfillmentDetails: $fulfillmentDetails) {
      _id
      userId
    }
  }
`;

export const EDIT_FULFILLMENT = gql`
  mutation EditFulfillment(
    $id: String!
    $fulfillmentDetails: FulfillmentDetails
  ) {
    editFulfillment(id: $id, fulfillmentDetails: $fulfillmentDetails) {
      _id
      userId
    }
  }
`;

export const LIST_FULFILLMENTS = gql`
  mutation GetFulfillments(
    $userID: String
    $first: Int
    $next: String
    $previous: String
  ) {
    getFulfillments(
      userID: $userID
      first: $first
      next: $next
      previous: $previous
    ) {
      totalCount
      cursor {
        next
        previous
      }
      nodes {
        _id
        type
        items {
          value
          weight
          quantity
          category
          description
        }
        userId
        status
        createdOn
        trackingID
        modifiedOn
        senderAddress {
          _id
          name
          city
          email
          state
          userID
          country
        }
        receiverAddress {
          _id
          name
          city
          email
          state
          userID
          country
        }
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const SEARCH_FULFILLMENTS = gql`
  mutation SearchFulfillments(
    $userID: String!
    $first: Int
    $page: Int
    $next: String
    $searchString: String
    $previous: String
  ) {
    searchFulfillments(
      userID: $userID
      first: $first
      next: $next
      page: $page
      searchString: $searchString
      previous: $previous
    ) {
      totalCount
      nodes {
        _id
        type
        items {
          value
          weight
          quantity
          category
          description
        }
        userId
        status
        createdOn
        trackingID
        modifiedOn
        senderAddress {
          _id
          name
          city
          email
          state
          userID
          country
        }
        receiverAddress {
          _id
          name
          city
          email
          state
          userID
          country
        }
      }
    }
  }
`;
