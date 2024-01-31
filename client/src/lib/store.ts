"use client";

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/lib/features/counter/counterSlice";
import reviewListSlice from "@/lib/features/review/addReviewSlice";
import PropertySlice from "@/lib/features/property/propertySlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      reviewList: reviewListSlice,
      property: PropertySlice,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
