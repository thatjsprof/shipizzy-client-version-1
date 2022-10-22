import { gql } from "apollo-boost";

export const GET_TRANSACTIONS = gql`
  mutation GetTransactions(
    $userID: String!
    $first: Int
    $next: String
    $previous: String
  ) {
    getTransactions(
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
        status
        reference
        paymentMode
        totalAmount
        transactionDate
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
    }
  }
`;

export const SEARCH_TRANSACTIONS = gql`
  mutation SearchTransactions(
    $userID: String!
    $first: Int
    $page: Int
    $next: String
    $searchString: String
    $previous: String
  ) {
    searchTransactions(
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
        status
        reference
        paymentMode
        totalAmount
        transactionDate
      }
    }
  }
`;

export const ADD_TRANSACTION = gql`
  mutation AddTransactions($transactionDetails: TransactionDetails) {
    addTransaction(transactionDetails: $transactionDetails) {
      status
      reference
      paymentMode
    }
  }
`;

export const TOTAL_TRANSACTION = gql`
  mutation TotalTransactionsAmount($userID: String!) {
    totalTransactionsAmount(userID: $userID)
  }
`;

export const TOTAL_MONTHLY_TRANSACTIONS = gql`
  mutation TotalMonthlyTransactions($userID: String!, $noOfMonths: Int) {
    totalMonthlyTransactions(userID: $userID, noOfMonths: $noOfMonths) {
      year
      total
      month
    }
  }
`;
