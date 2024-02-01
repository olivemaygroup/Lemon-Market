
'use client'

import styles from "@/app/components/Landing/page.module.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Link from 'next/link'
import { PropertyType } from "@/app/types/property-type";
import Card from '@mui/material/Card';


const NoReviewsPropertyCard = ({ property }: { property: PropertyType }) => {

  return (
    <>
      <Card variant="outlined" className={styles.card_container}>
        <Link href="/propertydetail" style={{ textDecoration: 'none', color: 'inherit' }} >
          <div className={styles.image_address_container}>
            <div className={styles.card_image}>
              <img src="https://alto-live.s3.amazonaws.com/wvxuv4PRkq8d6Ptl1XeMpfyQWS4/trpskNcSCnw-FTY7tNK-qS43Ut8/Photo/%5B3%5D/hy8rawWs90qec_U6NO2pAQ.jpg" alt="" />
            </div>
            <div className={styles.card_address}>
              <p>{property.fullAddress}</p>
            </div>
          </div>
        </Link >
        <div className={styles.card_rating_container}>
          <Box
            sx={{
              '& > legend': { mt: 2 },
            }}
          >
            <Rating size="small" name="read-only" value={0} readOnly />
          </Box>
          <p>{0} Reviews</p>
        </div>
      </Card >
    </>
  )
}
export default NoReviewsPropertyCard