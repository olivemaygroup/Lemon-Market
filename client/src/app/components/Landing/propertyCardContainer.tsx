'use client'

import * as React from 'react';
import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import PropertyCard from "./propertyCard";
import NoReviewsPropertyCard from "./noReviewsPropertyCard";



const ProperetyCardContainer = () => {

  const fullProperty = useSelector((state: RootState) => state.fullProperty.value)
  const property = useSelector((state: RootState) => state.property.value)



  return (
    <>
      {
        fullProperty.num_of_reviews !== 0 ? (
          <>
            <PropertyCard fullProperty={fullProperty} />
          </>
        ) : (
          <NoReviewsPropertyCard property={property} />
        )
      }
    </>
  );
};

export default ProperetyCardContainer;
