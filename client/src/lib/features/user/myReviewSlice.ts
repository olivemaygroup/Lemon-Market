'use client'

import { createSlice } from "@reduxjs/toolkit"
import { Review } from "@/app/types/review-types"


export const myReviewSlice = createSlice({
  name: "myReview",
  initialState: {
    value: [],
  },
  reducers: {
    setMyReview: (state: {value: Review[]}, action: { type: string; payload: Review[]}) => {
      state.value = action.payload;
    },
  },
})

export const { setMyReview } = myReviewSlice.actions;

export default myReviewSlice.reducer;