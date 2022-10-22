import { Address } from "./Address";

export enum FulfillmentStages {
  type = "FULFILLMENT_TYPE",
  item = "FULFILLMENT_ITEM",
  sender = "FULFILLMENT_SENDER",
  status = "FULFILLMENT_STATUS",
  summary = "FULFILLMENT_SUMMARY",
  payment = "FULFILLMENT_PAYMENT",
  receiver = "FULFILLMENT_RECEIVER",
  shipping = "FULFILLMENT_SHIPPING",
}

export enum FulfillmentStagesReverse {
  "FULFILLMENT_TYPE" = 2,
  "FULFILLMENT_ITEM" = 5,
  "FULFILLMENT_SENDER" = 3,
  "FULFILLMENT_STATUS" = 9,
  "FULFILLMENT_SUMMARY" = 7,
  "FULFILLMENT_PAYMENT" = 8,
  "FULFILLMENT_RECEIVER" = 4,
  "FULFILLMENT_SHIPPING" = 6,
}

export enum EFulfillmentTypes {
  dropOff = "Drop Off",
  pickUp = "Pick Up",
}

export type FulfillmentOption = "export" | "import";
export type FulfillmentShippingRates = "express" | "basic";
export type FulfillmentPaymentStatus = "success" | "failed";
export type FulfillmentInsuranceOption = "basic" | "premium";
export type FulfillmentTypes = keyof typeof EFulfillmentTypes;

export enum FulfillmentStatus {
  DRAFT = "draft",
  PENDING = "pending",
  SHIPPED = "shipped",
  TRANSIT = "transit",
  DELIVERED = "delivered",
}

export interface FulfillmentItem {
  currency: string;
  category: string;
  description: string;
  id?: string | number;
  _id?: string | number;
  value: number | string;
  weight: number | string;
  quantity: number | string;
}

interface FulfillmentShipping {
  shippingRate: FulfillmentShippingRates;
  insuranceOption: FulfillmentInsuranceOption;
}

interface FulfillmentPaymentInfo {
  id?: string;
  paid_at?: Date;
  amount: number;
  channel?: string;
  created_at?: Date;
  reference: string;
  status: FulfillmentPaymentStatus;
}

export interface IFulfillment {
  _id?: string;
  userId?: string;
  createdOn?: Date;
  updatedOn?: Date;
  items?: FulfillmentItem[];
  status?: FulfillmentStatus;
  type?: FulfillmentTypes | string;
  senderAddress?: Partial<Address>;
  receiverAddress?: Partial<Address>;
  insurance?: FulfillmentInsuranceOption;
  shippingOption?: FulfillmentShippingRates;
}

export interface IPayloadInt {
  id?: string;
  fulfillmentDetails: IFulfillment;
}

export interface FulfillmentState {
  id?: string | null;
  fulfillmentSummary?: {} | null;
  stage?: FulfillmentStages | null;
  fulfillmentSender?: Address | null;
  fulfillmentReceiver?: Address | null;
  fulfillmentTrackingID?: string | null;
  fulfillmentType?: FulfillmentTypes | null;
  fulfillmentItem?: FulfillmentItem[] | null;
  fulfillmentStatus?: FulfillmentStatus | null;
  fulfillmentOption?: FulfillmentOption | null;
  fulfillmentShipping?: FulfillmentShipping | null;
  fulfillmentPaymentInformation?: FulfillmentPaymentInfo | null;
}
