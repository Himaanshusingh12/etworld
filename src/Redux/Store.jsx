import { configureStore } from "@reduxjs/toolkit";
import shippingReducer from "./Slices/ShipmentSlice";

const store = configureStore({
  reducer: {
    Shipping: shippingReducer,
  },
});

export default store;
