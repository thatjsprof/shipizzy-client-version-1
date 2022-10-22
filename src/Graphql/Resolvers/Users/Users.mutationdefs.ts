import { gql } from "apollo-boost";

export const LOGIN_USER = gql`
  mutation LoginUser($authDetails: AuthDetails) {
    loginUser(authDetails: $authDetails)
  }
`;

export const LOGIN_GOOGLE_GET_URL = gql`
  mutation LoginGoogleGetUrl {
    loginAuthGenerateUrl
  }
`;

export const LOGIN_GOOGLE_GET_USER = gql`
  mutation LoginGoogleGetUser($code: String!) {
    loginAuthGetUser(code: $code)
  }
`;

export const SIGN_UP_USER = gql`
  mutation SignUpUser($userDetails: UserDetails) {
    addUser(userDetails: $userDetails) {
      name
      email
      createdOn
      modifiedOn
    }
  }
`;

export const SIGN_UP_BUSINESS_USER = gql`
  mutation SignUpBusinessUser($userDetails: UserBusinessDetails) {
    addUserBusiness(userDetails: $userDetails) {
      name
      email
      createdOn
      modifiedOn
    }
  }
`;

export const DECODE_TOKEN = gql`
  mutation VerifyToken($token: String!) {
    verifyToken(token: $token) {
      id
      iat
      exp
      email
    }
  }
`;

export const VERIFY_USER = gql`
  mutation VerifyUser($id: String!) {
    verifyUser(id: $id)
  }
`;

export const SEND_RESET_TOKEN = gql`
  mutation SendResetToken($email: String!) {
    sendResetToken(email: $email)
  }
`;

export const SEND_RESET_PASSWORD = gql`
  mutation SendResetPassword(
    $id: String
    $type: PasswordResetTypes
    $token: String
    $password: String!
    $newPassword: String!
  ) {
    sendResetPassword(
      id: $id
      type: $type
      token: $token
      password: $password
      newPassword: $newPassword
    )
  }
`;

export const GET_USER = gql`
  mutation GetUser($userID: String!) {
    getUser(userID: $userID) {
      _id
      sex
      name
      email
      address
      rcNumber
      password
      createdOn
      modifiedOn
      isVerified
      accountType
      dateOfBirth
      phoneNumber
      businessName
      defaultSenderAddress
      defaultReceiverAddress
    }
  }
`;

export const EDIT_USER = gql`
  mutation EditUser($userID: String!, $userDetails: UserDetails) {
    editUser(userID: $userID, userDetails: $userDetails) {
      _id
      sex
      name
      email
      address
      rcNumber
      password
      createdOn
      modifiedOn
      isVerified
      accountType
      phoneNumber
      dateOfBirth
      businessName
      defaultSenderAddress
      defaultReceiverAddress
    }
  }
`;
