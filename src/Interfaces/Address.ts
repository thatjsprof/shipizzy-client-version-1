export type IAddressType = "local" | "international";

export interface Address {
  _id?: string;
  name: string;
  city: string;
  email: string;
  state: string;
  country: string;
  exists?: boolean;
  postalCode: string;
  phoneNumber: string;
  __typename?: string;
  addressLine1: string;
  addressLine2: string;
  additionalInfo: string;
  defaultAddress?: boolean;
  addressType: IAddressType;
}
