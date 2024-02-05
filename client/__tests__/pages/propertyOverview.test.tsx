import React from "react";
import { render, screen} from "@testing-library/react";
import { Provider } from "react-redux";
import PropertyOverview from "@/app/components/PropertyDetail/propertyOverview";

import { configureStore, Reducer } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store"; 
import '@testing-library/react'
import { mockStore } from "./initialState";
import { Review } from "@/app/types/review-types";

const createMockStore = (initialState: RootState) => {
  const rootReducer: Reducer<RootState> = (state = initialState, action) => state;
  return configureStore({
    reducer: rootReducer,
  });
};

describe('PropertyOverview Component', () => {
  let store: ReturnType<typeof createMockStore>; 
  let reviewList: Review[]

  beforeEach(() => {
    const initialState: RootState = mockStore
    const reviewList = initialState.reviewList.value
    console.log('review list console: ', reviewList)
      store = createMockStore(initialState);
    });

  test('renders average rating correctly', () => {
    render(
      <Provider store={store}>
        <PropertyOverview reviewList={reviewList} />
      </Provider>
    );

    const averageRatingElement = screen.getByTestId('readonly-rating');
    const ratingProp = averageRatingElement.getAttribute('aria-label');
    console.log(ratingProp)


    expect(ratingProp).toEqual("5"); 
  });
});
