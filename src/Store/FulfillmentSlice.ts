import { Address } from "Interfaces/Address";
import { FulfillmentState } from "Interfaces/Fulfillment";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const initialState: FulfillmentState = {
  id: null,
  stage: null,
  fulfillmentItem: [],
  fulfillmentType: null,
  fulfillmentOption: null,
  fulfillmentSender: null,
  fulfillmentStatus: null,
  fulfillmentSummary: null,
  fulfillmentReceiver: null,
  fulfillmentShipping: null,
  fulfillmentTrackingID: null,
  fulfillmentPaymentInformation: null,
};

const fulfillmentSlice = createSlice({
  initialState,
  reducers: {
    setFulfillmentOption: (state, action: PayloadAction<FulfillmentState>) => {
      const previousState: FulfillmentState = {
        id: state.id,
        stage: state.stage,
        fulfillmentItem: state.fulfillmentItem,
        fulfillmentType: state.fulfillmentType,
        fulfillmentOption: state.fulfillmentOption,
        fulfillmentSender: state.fulfillmentSender,
        fulfillmentStatus: state.fulfillmentStatus,
        fulfillmentSummary: state.fulfillmentSummary,
        fulfillmentReceiver: state.fulfillmentReceiver,
        fulfillmentShipping: state.fulfillmentShipping,
        fulfillmentTrackingID: state.fulfillmentTrackingID,
        fulfillmentPaymentInformation: state.fulfillmentPaymentInformation,
      };

      const currentState = { ...previousState, ...action.payload };

      state.id = currentState.id;
      state.stage = currentState.stage;
      state.fulfillmentItem = currentState.fulfillmentItem;
      state.fulfillmentType = currentState.fulfillmentType;
      state.fulfillmentOption = currentState.fulfillmentOption;
      state.fulfillmentSender = currentState.fulfillmentSender;
      state.fulfillmentStatus = currentState.fulfillmentStatus;
      state.fulfillmentSummary = currentState.fulfillmentSummary;
      state.fulfillmentReceiver = currentState.fulfillmentReceiver;
      state.fulfillmentShipping = currentState.fulfillmentShipping;
      state.fulfillmentTrackingID = currentState.fulfillmentTrackingID;
      state.fulfillmentPaymentInformation =
        currentState.fulfillmentPaymentInformation;
    },
    setFulfilmentSender: (state, action: PayloadAction<Address>) => {
      state.fulfillmentSender = {
        ...state.fulfillmentSender,
        ...action.payload,
      };
    },
  },
  name: "fulfillment",
  extraReducers: (builder) => {},
});

export default fulfillmentSlice.reducer;
export const { setFulfillmentOption } = fulfillmentSlice.actions;
