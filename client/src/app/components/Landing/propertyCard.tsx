'use client'

import styles from "@/app/components/Landing/page.module.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';


const ProperetyCard = () => {

  const [value, setValue] = React.useState<number | null>(5);


  return (
    <div className={styles.card_container}>
      <div className={styles.card_image}>
        <p>Picture</p>
      </div>
      <div className={styles.card_address}>
        <p>37 Parc Peneglos, Mylor Bridge, Falmouth, Cornwall, TR115SL, United Kingdom</p>
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
  );
};

export default ProperetyCard;
