import { FulfillmentPaymentStatus } from "./Fulfillment";

type IProvider = "paystack" | "flutterwave";

export interface IPayloadValue {
  payload: {
    amount: number;
    email: string;
  };
  provider?: IProvider;
}

export interface IVerifyPayloadValue {
  verifyPayload: {
    reference: string;
  };
  provider?: IProvider;
}

export interface IPaymentResponse {
  authorization_url: string;
  access_code: string;
  reference: string;
}

export interface IVerifyPaymentResponse {
  id: string;
  paid_at: Date;
  amount: number;
  channel: string;
  created_at: Date;
  reference: string;
  status: FulfillmentPaymentStatus;
}
