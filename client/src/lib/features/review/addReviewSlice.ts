'use client';

import  { createSlice } from '@reduxjs/toolkit'

export interface ReviewState {
    cleanliness: string,
    landlord: string,
}

const initialState: ReviewState = {
    cleanliness: '',
    landlord: '',
}

export const addReviewSlice = createSlice({
  name: 'addreview',
  initialState,
  reducers: {
    cleanliness: (state, action) => { 
      state.cleanliness = (action.payload)
    },
    landlord: (state, action) => { 
      state.landlord = (action.payload)
  }}
})

export const { cleanliness, landlord } = addReviewSlice.actions;

export default addReviewSlice.reducer