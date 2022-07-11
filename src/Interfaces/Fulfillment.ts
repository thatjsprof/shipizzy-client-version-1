import { Category } from "./Category";

export enum FulfillmentStages {
  type = "FULFILLMENT_TYPE",
  item = "FULFILLMENT_ITEM",
  sender = "FULFILLMENT_SENDER",
  summary = "FULFILLMENT_SUMMARY",
  receiver = "FULFILLMENT_RECEIVER",
  shipping = "FULFILLMENT_SHIPPING",
}

export enum FulfillmentStagesReverse {
  "FULFILLMENT_TYPE" = 2,
  "FULFILLMENT_ITEM" = 5,
  "FULFILLMENT_SENDER" = 3,
  "FULFILLMENT_SUMMARY" = 7,
  "FULFILLMENT_RECEIVER" = 4,
  "FULFILLMENT_SHIPPING" = 6,
}

export type FulfillmentTypes = "dropOff" | "pickUp";
export type FulfillmentOption = "export" | "import";
type FulfillmentShippingRates = "express" | "basic";
type FulfillmentInsuranceOption = "basic" | "premium";

interface FulfillmentItem {
  value: number;
  weight: number;
  quantity: number;
  category: Category;
  description: string;
}

interface FulfillmentShipping {
  shippingRate: FulfillmentShippingRates;
  insuranceOption: FulfillmentInsuranceOption;
}

export interface FulfillmentState {
  id: string | null;
  fulfillmentSummary?: {} | null;
  stage?: FulfillmentStages | null;
  fulfillmentSender?: string | null;
  fulfillmentReceiver?: string | null;
  fulfillmentItem?: FulfillmentItem[];
  fulfillmentType?: FulfillmentTypes | null;
  fulfillmentOption?: FulfillmentOption | null;
  fulfillmentShipping?: FulfillmentShipping | null;
}
