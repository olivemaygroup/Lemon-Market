
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

import { GoBookmarkFill } from "react-icons/go";
import { GoBookmark } from "react-icons/go";
import favouriteAPIservice from "@/app/ApiServices/favouritesAPI";

const PropertyCard = ({ fullProperty }: { fullProperty: PropertyType }) => {

  const [favouriteFlag, setFavouriteFlag] = React.useState<boolean>(false)

  const favouriteHandler = (() => {
    if (favouriteFlag) {
      favouriteAPIservice.removeFavorite('eyJhbGciOiJIUzI1NiJ9.NA.oeLKdo1U0E5x9a0N6_Gb3tOj8DZiucVe5Z7BNWwpfzc', fullProperty.property_id).then(() => {
        setFavouriteFlag(false)
      })
    } else {
      favouriteAPIservice.addFavorite('eyJhbGciOiJIUzI1NiJ9.NA.oeLKdo1U0E5x9a0N6_Gb3tOj8DZiucVe5Z7BNWwpfzc', fullProperty.property_id).then(() => {
        setFavouriteFlag(true)
      })
    }
  })

  useEffect(() => {
    favouriteAPIservice.getFavourites('eyJhbGciOiJIUzI1NiJ9.NA.oeLKdo1U0E5x9a0N6_Gb3tOj8DZiucVe5Z7BNWwpfzc').then(res => {
      res?.forEach((property) => {
        if (property.property_id === fullProperty.property_id) {
          setFavouriteFlag(true)
        }
      })
    })
  }, [favouriteFlag])

  return (
    <div className={styles.card_container}>
      <Link href="/propertydetail" style={{ textDecoration: 'none' }} >
        <div className={styles.card_image}>
          <p>Picture</p>
        </div>
        <div className={styles.card_address}>
          <p>{fullProperty.fullAddress}</p>
        </div>
      </Link >
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
      <div>
        <button onClick={favouriteHandler} >
          {favouriteFlag ? (
            <GoBookmarkFill />) : (
            <GoBookmark />
          )}
        </button>
      </div>
    </div>
  )
}
export default PropertyCard