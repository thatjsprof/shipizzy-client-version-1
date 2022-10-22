import { IFulfillment } from "Interfaces/Fulfillment";
import { IPaymentResponse, IVerifyPaymentResponse } from "Interfaces/Payment";

export type EditFulfillmentResponse = Promise<
  Record<"editFulfillment", IFulfillment>
>;

export type CreatePaymentResponse = Promise<
  Record<"addPayment", IPaymentResponse>
>;

export type VerifyPaymentResponse = Record<
  "verifyPayment",
  IVerifyPaymentResponse
>;
