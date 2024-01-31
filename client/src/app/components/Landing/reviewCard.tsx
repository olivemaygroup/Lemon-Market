
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



const ReviewCard = () => {

  const fullProperty = useSelector((state: RootState) => state.fullProperty.value)

  return (
    <Link href="/propertydetail" style={{ textDecoration: 'none' }} >
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
            <Rating size="small" name="read-only" value={fullProperty.avg_rating} readOnly />
          </Box>
          <p>Number of Reviews: {fullProperty.num_of_reviews}</p>
        </div>
      </div>
    </Link >
  )
}
export default ReviewCard