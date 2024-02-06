'use client'

import * as React from 'react';
import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { useState } from 'react';
import PropertyCard from "./propertyCard";
import NoReviewsPropertyCard from "./noReviewsPropertyCard";
import { Review } from '@/app/types/review-types';
import Button from '@mui/material/Button';
import Link from 'next/link'




const ProperetyCardContainer = () => {

  const [profilePhoto, setProfilePhoto] = useState<string>('')

  const fullProperty = useSelector((state: RootState) => state.fullProperty.value)
  const reviewList: Review[] = useSelector((state: RootState) => state.reviewList.value)
  const property = useSelector((state: RootState) => state.property.value)

  React.useEffect(() => {
    if (reviewList.length > 0 && reviewList[0].photos.length > 0) {
      setProfilePhoto(reviewList[0].photos[0].url)
    }
  })

  return (
    <>
      {
        fullProperty.num_of_reviews !== 0 ? (
          <>
            <PropertyCard fullProperty={fullProperty} profilePhoto={profilePhoto} />
            <Link href="/propertydetail" style={{ textDecoration: 'none', color: 'inherit' }} >
              <Button variant="contained">Add Review</Button>
            </Link >
          </>
        ) : (
          <>
            <NoReviewsPropertyCard property={property} />
            <Link href="/propertydetail" style={{ textDecoration: 'none', color: 'inherit' }} >
              <Button variant="contained">Add Review</Button>
            </Link >
          </>
        )
      }
    </>
  );
};

export default ProperetyCardContainer;
