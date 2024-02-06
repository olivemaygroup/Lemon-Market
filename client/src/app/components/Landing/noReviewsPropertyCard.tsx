
'use client'
import noimage from "../../../../public/noimage.png";

import styles from "@/app/components/Landing/page.module.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Link from 'next/link'
import { PropertyType } from "@/app/types/property-type";
import Image from "next/image";
import Card from '@mui/material/Card';
import { useRouter } from 'next/navigation'



const NoReviewsPropertyCard = ({ property }: { property: PropertyType }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push('/propertydetail')
  };

  return (
    <>
      <Card variant="outlined" className={styles.card_container}>
        <div className={styles.image_address_container}>
          <div className={styles.card_image}>
            <Image
              src={noimage}
              className="no_image_available"
              alt="no image defulat image"
              // sizes="(max-width: 500px) 100vw, 33vw"
              layout="responsive"
            />
          </div>
          <div className={styles.card_address}>
            <p>{property.fullAddress}</p>
          </div>
        </div>
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