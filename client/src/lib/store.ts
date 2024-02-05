"use client";

import { configureStore } from "@reduxjs/toolkit";
import reviewListSlice from "@/lib/features/review/addReviewSlice";
import PropertySlice from "@/lib/features/property/propertySlice";
import addReviewReducer from "@/lib/features/review/addReviewSlice";
import addAddressReducer from "@/lib/features/address/addressSlice";
import fullPropertySlice from "./features/property/fullProperty";
import userSlice from "./features/user/userSlice";
import authSlice from "./features/authentication/authSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      reviewList: reviewListSlice,
      property: PropertySlice,
      fullProperty: fullPropertySlice,
      addReview: addReviewReducer,
      addAddress: addAddressReducer,
      user: userSlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
