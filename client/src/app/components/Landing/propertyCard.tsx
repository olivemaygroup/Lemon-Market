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
import { setReviewListSlice } from "@/lib/features/review/addReviewSlice";
import { addFullProperty } from "@/lib/features/property/fullProperty";
import { addProperty } from "@/lib/features/property/propertySlice";
import { PropertyType } from "@/app/types/property-type";



const ProperetyCard = () => {
  const dispatch = useDispatch();

  const property = useSelector((state: RootState) => state.property.value)
  const fullProperty = useSelector((state: RootState) => state.fullProperty.value)
  const reviewList = useSelector((state: RootState) => state.reviewList.value)


  const [value, setValue] = React.useState<number | null>(5);


  useEffect(() => {
    //currently check address does add the property if it exists - but we can change that to only occur when review happens
    checkAddress(property).then((response) => {
      if (response?.reviews) {
        dispatch(setReviewListSlice(response.reviews))
        console.log(response)
        const propertyWithoutReviews: PropertyType = { fullAddress: response.fullAddress, property_id: response.property_id, num_of_reviews: response.num_of_reviews, avg_rating: response.avg_rating }
        dispatch(addFullProperty(propertyWithoutReviews))
      } else {
        //show empty card as no reviews for the property exist
      }
    })

  }, [property])

  return (
    <Link
      href="/propertydetail"
      style={{ textDecoration: 'none' }}>
      <div className={styles.card_container}>
        <div className={styles.card_image}>
          <p>Picture</p>
        </div>
        <div className={styles.card_address}>
          <p>{fullProperty.fullAddress}</p>
        </div>
        <div className={styles.card_rating_container}>
          <Box
            sx={{
              '& > legend': { mt: 2 },
            }}
          >
            <Rating size="small" name="read-only" value={value} readOnly />
          </Box>
          <p>Property Rating: {property.avg_rating}</p>
          <p>{reviewList.length}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProperetyCard;
