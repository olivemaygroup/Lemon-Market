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
import { useRouter } from 'next/navigation';


import styles from "@/app/components/Landing/page.module.css";


const ProperetyCardContainer = ({ SetShowPopup, showPopup }: { SetShowPopup: any, showPopup: boolean }) => {

  const router = useRouter()
  const [profilePhoto, setProfilePhoto] = useState<string>('')
  const fullProperty = useSelector((state: RootState) => state.fullProperty.value)
  const reviewList: Review[] = useSelector((state: RootState) => state.reviewList.value)
  const property = useSelector((state: RootState) => state.property.value)
  const user = useSelector((state: RootState) => state.auth.value)


  React.useEffect(() => {
    if (reviewList.length > 0 && reviewList[0].photos.length > 0) {
      const generalPhotoArray = reviewList[0].photos.filter(photo => {
        if (photo.tag === 'General') return true;
      })
      setProfilePhoto(generalPhotoArray[0].url)
    }
  })

  const handleClick = () => {
    if (user) {
      router.push('/addreview')
    } else {
      SetShowPopup(!showPopup)
    }
  }


  return (
    <>

      {
        fullProperty.num_of_reviews !== 0 ? (
          <>
            <PropertyCard fullProperty={fullProperty} profilePhoto={profilePhoto} />
            {/* <Link href="/addreview" > */}
            <Button className={styles.knock_a_review_btn} variant="contained" onClick={handleClick}>Knock a review!</Button>
            {/* </Link > */}
          </>
        ) : (
          <>
            <NoReviewsPropertyCard property={property} />
            {/* <Link href="/addreview" > */}
            <Button className={styles.knock_a_review_btn} variant="contained" onClick={handleClick}>Knock a review!</Button>
            {/* </Link > */}
          </>
        )
      }
    </>
  );
};

export default ProperetyCardContainer;
