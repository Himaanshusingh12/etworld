import { configureStore } from "@reduxjs/toolkit";
import shippingReducer from "./Slices/ShipmentSlice";
import shipmentListReducer from "./Slices/ShipmentListSlice";

const store = configureStore({
  reducer: {
    Shipping: shippingReducer,
    ShipmentList: shipmentListReducer,
  },
});

export default store;
