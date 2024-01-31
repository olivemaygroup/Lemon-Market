'use client'

import styles from "@/app/components/Landing/page.module.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import Link from 'next/link'



const ProperetyCard = () => {


  const address  = useSelector((state: RootState) => state.property.value)

  console.log(address)

  const [value, setValue] = React.useState<number | null>(5);


  return (
    <Link
      href="/propertydetail"
      style={{ textDecoration: 'none' }}>
      <div className={styles.card_container}>
        <div className={styles.card_image}>
          <p>Picture</p>
        </div>
        <div className={styles.card_address}>
          <p>{address.fullAddress}</p>
        </div>
        <div className={styles.card_rating_container}>
          <Box
            sx={{
              '& > legend': { mt: 2 },
            }}
            >
          <Rating size="small" name="read-only" value={value} readOnly />
        </Box>
          <p>4 reviews</p>
        </div>
      </div>
    </Link>
  );
};

export default ProperetyCard;
