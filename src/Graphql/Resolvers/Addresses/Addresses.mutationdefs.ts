import { gql } from "apollo-boost";

export const EDIT_ADDRESS = gql`
  mutation EditAddress($id: String!, $addressDetails: AddressDetails) {
    editAddress(id: $id, addressDetails: $addressDetails) {
      _id
      name
      city
      email
      state
      userID
      country
      postalCode
      addressType
      phoneNumber
      addressLine1
      addressLine2
    }
  }
`;

export const DELETE_ADDRESS = gql`
  mutation DeleteAddress($id: String!) {
    deleteAddress(id: $id)
  }
`;

export const ADD_ADDRESS = gql`
  mutation AddAddress($addressDetails: AddressDetails) {
    addAddress(addressDetails: $addressDetails) {
      _id
      name
      city
      email
      state
      userID
      country
      postalCode
      addressType
      phoneNumber
      addressLine1
      addressLine2
    }
  }
`;

export const GET_ADDRESS = gql`
  mutation GetUsersAddress($id: String!) {
    getUsersAddress(id: $id) {
      _id
      name
      city
      email
      state
      userID
      country
      postalCode
      addressType
      phoneNumber
      addressLine1
      addressLine2
    }
  }
`;
