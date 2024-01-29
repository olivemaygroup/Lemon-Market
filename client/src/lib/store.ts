"use client";

import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/lib/features/counter/counterSlice";
import addReviewReducer from "@/lib/features/review/addReviewSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      counter: counterReducer,
      addReview: addReviewReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
