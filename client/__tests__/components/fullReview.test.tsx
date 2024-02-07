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

    //Finacials testing
    const rent = screen.getAllByTestId("fr")[0];
    expect(rent.textContent).toEqual("Rent: 2000");
    const bill = screen.getAllByTestId('fb')[0];
    expect(bill.textContent).toEqual("Bills: 200");
    const tax = screen.getAllByTestId('fc')[0];
    expect(tax.textContent).toEqual("Council tax: 100");

    // Cleanliness testing 
    const CleanRating = screen.getAllByTestId('readonly-rating')[1];
    expect(CleanRating.getAttribute('aria-label')).toEqual("3");
    const cleanComment = screen.getAllByTestId("cc")[0];
    expect(cleanComment.textContent).toEqual("The cleanliness was acceptable but could be improved.");
    
    // Maintenance testing 
    
    const maintenanceRating = screen.getAllByTestId('readonly-rating')[2];
    expect(maintenanceRating.getAttribute('aria-label')).toEqual("3");
    const maintenanceComment = screen.getAllByTestId("mc")[0];
    expect(maintenanceComment.textContent).toEqual("There were some maintenance issues that need attention.");
    
    // Value for money testing 
    const valueRating = screen.getAllByTestId('readonly-rating')[3];
    expect(valueRating.getAttribute('aria-label')).toEqual("3");
    const valueComment = screen.getAllByTestId("vc")[0];
    expect(valueComment.textContent).toEqual("The value for money was moderate considering the amenities.");
    
   
    // Deposit handling testing 
    const depositRating = screen.getAllByTestId('readonly-rating')[4];
    expect(depositRating.getAttribute('aria-label')).toEqual("3");
    const depositComment = screen.getAllByTestId("dc")[0];
    expect(depositComment.textContent).toEqual("The deposit handling process was smooth and hassle-free.");
    
    
    // Amenities testing 
    
    const amenitiesRating = screen.getAllByTestId('readonly-rating')[5];
    expect(amenitiesRating.getAttribute('aria-label')).toEqual("3");
    const amenitiesComment = screen.getAllByTestId("ac")[0];
    expect(amenitiesComment.textContent).toEqual("The amenities provided were satisfactory and added value.");
    
    // landlord responsiveness testing 
    
    const landlordRating = screen.getAllByTestId('readonly-rating')[6];
    expect(landlordRating.getAttribute('aria-label')).toEqual("3");
    const landlordComment = screen.getAllByTestId("lc")[0];
    expect(landlordComment.textContent).toEqual("The landlord was responsive to queries and concerns.");
    
  });
});
