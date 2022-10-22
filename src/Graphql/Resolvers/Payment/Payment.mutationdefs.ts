import { gql } from "apollo-boost";

export const CREATE_PAYMENT = gql`
  mutation AddPayment($payload: PaymentDetails, $provider: IPaymentProvider) {
    addPayment(payload: $payload, provider: $provider) {
      reference
      access_code
      authorization_url
    }
  }
`;

export const VERIFY_PAYMENT = gql`
  mutation VerifyPayment(
    $verifyPayload: VerifyPaymentDetails
    $provider: IPaymentProvider
  ) {
    verifyPayment(verifyPayload: $verifyPayload, provider: $provider) {
      id
      status
      amount
      paid_at
      channel
      reference
      created_at
    }
  }
`;
