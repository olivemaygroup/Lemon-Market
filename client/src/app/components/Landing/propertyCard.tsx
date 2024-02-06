
'use client'

import styles from "@/app/components/Landing/page.module.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { useEffect } from "react";
import Link from 'next/link'
import { PropertyType } from "@/app/types/property-type";
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';



import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import favouriteAPIservice from "@/app/ApiServices/favouritesAPI";

const PropertyCard = ({ fullProperty, profilePhoto }: { fullProperty: PropertyType, profilePhoto: string }) => {

  const [favouriteFlag, setFavouriteFlag] = React.useState<boolean>(false)

  const favouriteHandler = (() => {
    if (favouriteFlag) {
      favouriteAPIservice.removeFavorite(fullProperty.property_id).then(() => {
        setFavouriteFlag(false)
      })
    } else {
      favouriteAPIservice.addFavorite(fullProperty.property_id).then(() => {
        setFavouriteFlag(true)
      })
    }
  })

  useEffect(() => {
    favouriteAPIservice.getFavourites().then(res => {
      res?.forEach((property) => {
        if (property.property_id === fullProperty.property_id) {
          setFavouriteFlag(true)
        }
      })
    })
  }, [favouriteFlag])

  return (
    <>
    <Link href="/propertydetail">
        <Card variant="outlined" className={styles.card_container}>
            <div className={styles.image_address_container}>
              <div className={styles.card_image}>
                <img src={profilePhoto} />
              </div>
              <div className={styles.card_address}>
                <p>{fullProperty.fullAddress}</p>
              </div>
            </div>
          <div className={styles.card_rating_container}>
            <div className={styles.favourite_icon_container}>
              <button className={styles.favourite_icon} onClick={favouriteHandler} >
                {favouriteFlag ? (
                  <FavoriteIcon />) : (
                    <FavoriteBorderIcon />
                    )}
              </button>
            </div>
            <Rating size="small" name="read-only" value={fullProperty.avg_rating} readOnly />
            <p>{fullProperty.num_of_reviews} Reviews</p>
          </div>
        </Card>
      </Link>
    </>
  )
}
export default PropertyCard