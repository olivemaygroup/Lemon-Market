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

import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Review } from '@/app/types/review-types';
import ReadonlyRating from "./readonlyRating";
import { Photo } from "@/app/types/review-types";




const PropertyOverview = ({ reviewList }: {reviewList: Review[]}) => {


  const averageRating = useSelector((state: RootState) => state.fullProperty.value.avg_rating)

  console.log('typeof console: ',typeof averageRating)
  // const total = reviewList.reduce((total: number, review: Review) => total + review.total_review_rating, 0);
  // const average = total / reviewList.length;
  
  let allPhotos: Array<Photo> = []
  
  // console.log('all photos: ', allPhotos)
  reviewList.forEach(review => {
    allPhotos = allPhotos.concat(review.photos);
});

  const [saved, SetSaved] = useState(false)
  

  const handleAdd = () => {
    // Navigate to signup or login
  }

  return (
    <div className='overviewContainer'>
      {allPhotos.length !== 0 ? (
        <Carousel
          showArrows={true}
          infiniteLoop={true}
          dynamicHeight={false}
          className='carousel'
        >
          {allPhotos.map((photo) => (
            <div key={photo.photo_id} className='image-container'>
              <img 
                src={photo.url}
                alt="Picture of the property"
                sizes="(max-width: 500px) 100vw, 33vw"
                // layout="responsive"
              />
            </div>
          ))}
        </Carousel>
      ) : (
        <Image 
          src={noimage}
          alt="Picture of the property"
          sizes="(max-width: 500px) 100vw, 33vw"
          layout="responsive"
        />
      )}
      
      {/* Render options for general rating */}
      {reviewList.length !== 0 ?
      <div className="rating">
        <p><ReadonlyRating rating={averageRating} /></p>
      </div>
      :
      <div className="rating">
        <span><ReadonlyRating rating={0} /></span>
      </div>
      }
        {reviewList.length !== 0 ?
      <div className="reviews">
        <p>{reviewList.length} reviews</p>
      </div>
      :
      <div className="reviews">
        <p>No reviews</p>
      </div>
      }

      <div className="favoriteIcon" style={{ position: 'absolute', top: '10px', left: '10px', cursor: 'pointer' }} onClick={() => SetSaved(!saved)}>
        {!saved ? 
          <FavoriteBorderIcon style={{ color: "#fae301", fontSize: '50px' }} /> : 
          <FavoriteIcon  style={{ color: "#fae301", fontSize: '50px' }} />
        }
      </div>

      <div className="addButton">
        <Link href={'/addreview'}>
          <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Fab style={{backgroundColor: "#fae301"}} aria-label="add" onClick={handleAdd}>
              <AddIcon 
              />
            </Fab>
          </Box>
        </Link>
      </div>
    </div>
    
  );
};

export default PropertyOverview;
