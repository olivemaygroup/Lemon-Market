'use client'

import styles from "@/app/components/Landing/page.module.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Link from 'next/link'
import checkAddress from "@/app/ApiServices/propertyAPI";
import { addProperty } from "@/lib/features/property/propertySlice";
import { PropertyType } from "@/app/types/property-type";
import ReviewCard from "./propertyCard";
import NoReviewsCard from "./noReviewsPropertyCard";
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
