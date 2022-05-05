import { gql } from "apollo-boost";
import UserTypeDefs from "./Users/Users.typedefs";
import UserMutations from "./Users/Users.mutations";

export const typeDefs = gql`
  ${UserTypeDefs}
`;

export const resolvers = {
  Mutation: {
    ...UserMutations,
  },
};
