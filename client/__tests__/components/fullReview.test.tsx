import React from "react";
import { render, screen } from "@testing-library/react";
import FullReview from "@/app/components/PropertyDetail/fullReview";
import { Provider } from "react-redux";

import { configureStore, Reducer } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import { mockStateWith } from "../../testingStates/initialWithReviews";
import { mockStateWithout } from "../../testingStates/initialWithoutReviews";
import { Review } from "@/app/types/review-types";

const createMockStore = (initialState: RootState) => {
  const rootReducer: Reducer<RootState> = (state = initialState, action) => state;
  return configureStore({
    reducer: rootReducer,
  });
};

describe('Full review component details populate correctly', () => {
  let store: ReturnType<typeof createMockStore>;
  let item: Review;

  beforeEach(() => {
    const initialState: RootState = mockStateWith;
    item = initialState.reviewList.value[0];
    store = createMockStore(initialState);
  });

  test('renders financials correctly', () => {
    render(
      <Provider store={store}>
        <FullReview item={item} />
      </Provider>
    );
    const rent = screen.getByTestId('rent');
    console.log('rent console', rent)
    expect(rent.textContent).toEqual("Rent: 2000");
    const bill = screen.getByTestId('fb');
    expect(bill.textContent).toEqual("Bills: 200");
    const tax = screen.getByTestId('fc');
    expect(tax.textContent).toEqual("Council tax: 100");


  });


});
