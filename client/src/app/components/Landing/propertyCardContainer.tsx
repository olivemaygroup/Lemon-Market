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


import styles from "@/app/components/Landing/page.module.css";




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
            <Link href="/addreview" >
              <Button className={styles.knock_a_review_btn} variant="contained">Knock a review!</Button>
            </Link >
          </>
        ) : (
          <>
            <NoReviewsPropertyCard property={property} />
            <Link href="/addreview" >
              <Button className={styles.knock_a_review_btn} variant="contained">Knock a review!</Button>
            </Link >
          </>
        )
      }
    </>
  );
};

export default ProperetyCardContainer;
