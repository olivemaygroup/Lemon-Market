'use client'

import Image from "next/image";
import "./propertyOverview.css"
import testPic from "../../../../public/testPic.jpg";
import noimage from "../../../../public/noimage.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel'
import CustomizedRating from "../Rating/CustomizedRating";
import Link from 'next/link'

import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import NavigationIcon from '@mui/icons-material/Navigation';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Review } from '@/app/types/review-types';
import ReadonlyRating from "./readonlyRating";
import { Photo } from "@/app/types/review-types";
import { PropertyType } from "@/app/types/property-type";
import favoriteAPIservice  from '@/app/ApiServices/favouritesAPI'

const PropertyOverview = ({ reviewList, property, SetShowPopup, showPopup }: {reviewList: Review[] | undefined, property: PropertyType, SetShowPopup: any, showPopup: boolean}) => {

  const router = useRouter()
  const user = useSelector((state: RootState) => state.auth.value)

  console.log('user console: ', user)

  const averageRating = useSelector((state: RootState) => state.fullProperty.value.avg_rating)


  const loggedIn = useSelector((state: RootState) => state.auth.value)
  const [saved, SetSaved] = useState(false)
  

  useEffect(() => {
    
    const getMyFav = async () => {
      let myFav = await favoriteAPIservice.getFavourites()
      if ((myFav?.filter((item) => item.property_id === property.property_id).length === 1)) {
        SetSaved(true)
      } else {
        SetSaved(false)
      }
    }
    getMyFav()

  },[loggedIn, averageRating, saved])

  let allPhotos: Array<Photo> = []
  
  if (reviewList) {
    reviewList.forEach(review => {
      allPhotos = allPhotos.concat(review.photos);
    });
  }

  const handleFavorite = async () => {

    if (!user && !showPopup) {
      SetShowPopup(!showPopup)
      return
    }

    const newSavedState = !saved;
    SetSaved(newSavedState); 
  
    try {
      if (newSavedState) {
        await favoriteAPIservice.addFavorite(property.property_id);
      } else {
        await favoriteAPIservice.removeFavorite(property.property_id);
      }
    } catch (error) {
      console.error('Error while updating favorite:', error);
      SetSaved(!newSavedState);
    }
  };

  const handleAdd = () => {
    if (!user && !showPopup) {
      SetShowPopup(!showPopup)
      return
    } else {
      router.push('/addreview')
    } 
  }

  return (
   
    <div className={'overviewContainer'}>
      <div className='photocount' data-testid='photos'>
      { allPhotos.length > 0 ?
        <p>{allPhotos.length}</p>
        :
        <p>No photos</p>
      }
      </div>

      {allPhotos.length !== 0 ? (
        
        <Carousel
        showArrows={true}
        infiniteLoop={true}
        dynamicHeight={false}
        className='carousel'
        data-testid={"cousel test"}
        
        >
          {allPhotos.map((photo) => (
            <div key={photo.photo_id} className='picturecontainer'>
              <img
                src={photo.url}
                alt="Picture of the property"
                // sizes="(max-width: 500px) 100vw, 33vw"
                // layout="responsive"
                // width={100}
                // height={240}
                />
            </div>
          ))}
        </Carousel>
      ) : (
        // <div className="no-image">
          <Image 
          src={noimage}
          alt="Picture of the property"
          sizes="(max-width: 500px) 100vw, 33vw"
          // style={{objectFit: "contain"}}
          // layout="fill"
          width={300}
          height={200}
          />
          // </div>
        )}
      
      {/* Render options for general rating */}
      {averageRating  ?
      <div data-testid='average-rating' className="rating">
        <ReadonlyRating rating={averageRating} />
      </div>
      :
      <div className="rating">
        <ReadonlyRating rating={0} />
      </div>
      }

      {reviewList && reviewList.length > 0 ?
      <div data-testid='reviewNumber' className="reviews">
        <p>{reviewList.length} reviews</p>
      </div>
      :
      <div data-testid='reviewNumberEmpty' className="reviews">
        <p>No reviews</p>
      </div>
      }

      <div className="favoriteIcon" style={{ position: 'absolute', top: '10px', left: '10px', cursor: 'pointer' }} onClick={handleFavorite}>
        {!saved ? 
          <FavoriteBorderIcon style={{ color: "#fae301", fontSize: '50px' }} /> : 
          <FavoriteIcon  style={{ color: "#fae301", fontSize: '50px' }} />
        }
      </div>

      <div className="addButton">
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Fab style={{backgroundColor: "#fae301"}} aria-label="add" onClick={handleAdd}>
              <AddIcon 
              />
            </Fab>
          </Box>
      </div>
    </div>
    
  );
};

export default PropertyOverview;

