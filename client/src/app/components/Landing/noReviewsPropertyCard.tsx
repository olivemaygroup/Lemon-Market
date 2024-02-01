
'use client'

import styles from "@/app/components/Landing/page.module.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Link from 'next/link'
import { PropertyType } from "@/app/types/property-type";


const NoReviewsPropertyCard = ({ property }: { property: PropertyType }) => {

  return (
    <Link href="/propertydetail" style={{ textDecoration: 'none' }} >
      <div className={styles.card_container}>
        <div className={styles.card_image}>
          <p>Picture</p>
        </div>
        <div className={styles.card_address}>
          <p>{property.fullAddress}</p>
        </div>
        <div className={styles.card_rating_container}>
          <Box
            sx={{
              '& > legend': { mt: 2 },
            }}
          >
            <Rating size="small" name="read-only" value={0} readOnly />
          </Box>
          <p>{0}</p>
        </div>
      </div>
    </Link >
  )
}
export default NoReviewsPropertyCard