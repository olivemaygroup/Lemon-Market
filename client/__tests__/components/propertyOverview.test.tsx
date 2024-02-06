import React from "react";
import { render, screen } from "@testing-library/react";
import FullReview from "@/app/components/PropertyDetail/fullReview";
import { Provider } from "react-redux";

import { configureStore, Reducer } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import { mockStateWith } from "../../testingStates/initialWithReviews";
import { mockStateWithout } from "../../testingStates/initialWithoutReviews";
import { Review } from "@/app/types/review-types";
import PropertyOverview from "@/app/components/PropertyDetail/propertyOverview";

const createMockStore = (initialState: RootState) => {
  const rootReducer: Reducer<RootState> = (state = initialState, action) => state;
  return configureStore({
    reducer: rootReducer,
  });
};

describe('PropertyOverview Component with reviews', () => {
  let store: ReturnType<typeof createMockStore>;
  let reviewList: Review[];

  beforeEach(() => {
    const initialState: RootState = mockStateWith;
    reviewList = initialState.reviewList.value;
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
    expect(ratingProp).toEqual("4");
  });

  test('renders number of reviews correctly', () => {
    render(
      <Provider store={store}>
        <PropertyOverview reviewList={reviewList} />
      </Provider>
    );

    const reviews = screen.getByTestId('reviewNumber');
    expect(reviews.textContent).toEqual("3 reviews");
  });

  test('Image carousel is the correct length', () => {
    render(
      <Provider store={store}>
        <PropertyOverview reviewList={reviewList} />
      </Provider>
    );

    const photos = screen.getByTestId('photos')
    expect(photos.textContent).toEqual("5")
  })
});

describe('PropertyOverview Component without reviews', () => {
  let store: ReturnType<typeof createMockStore>;
  let reviewList: Review[];

  beforeEach(() => {
    const initialState: RootState = mockStateWithout;
    reviewList = initialState.reviewList.value;
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
    expect(ratingProp).toEqual("0");
  });

  test('renders number of reviews correctly', () => {
    render(
      <Provider store={store}>
        <PropertyOverview reviewList={reviewList} />
      </Provider>
    );

    const reviews = screen.getByTestId('reviewNumberEmpty');
    expect(reviews.textContent).toEqual("No reviews");
  });

  test('Image carousel shows no photos', () => {
    render(
      <Provider store={store}>
        <PropertyOverview reviewList={reviewList} />
      </Provider>
    );

    const photos = screen.getByTestId('photos')
    expect(photos.textContent).toEqual("No photos")
  })

});