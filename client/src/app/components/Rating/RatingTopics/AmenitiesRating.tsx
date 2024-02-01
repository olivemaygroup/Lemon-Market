"use client";
import { useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import styles from "@/app/page.module.css";
// import StoreProvider from "../StoreProvider";
import PhotoUploadComponent from "../UploadPhoto";
import AddComment from "../AddComment";
import CustomizedRating from "../CustomizedRating";
import { Review } from "@/app/types/types";

interface RatingContainerInterface {
  imageURLs: [], 
  setImageURLs: Function
  dbReviewObject: Review
}

const AmenitiesRating: React.FC<RatingContainerInterface> = ({ dbReviewObject, imageURLs, setImageURLs }) => {
  
  const TOPIC = 'Amenities'
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('')

  const Amenities = {
    "rating": rating,
    "comment": comment
  }

  dbReviewObject.amenities = rating
  dbReviewObject.amenities_comment = comment

  return (
    <>
      <div className='rating-elements'> 
      <h2>{TOPIC}</h2>
        <div className='col text-center'>
        <CustomizedRating 
        TOPIC={TOPIC}
        rating={rating}
        setRating={setRating}
        />

        <PhotoUploadComponent 
        TOPIC={TOPIC}
        imageURLs={imageURLs}
        setImageURLs={setImageURLs}
        />
        <AddComment 
        TOPIC={TOPIC}
        comment={comment}
        setComment={setComment}
        />
        </div>
      </div>
    </>
  );
};

export default AmenitiesRating;