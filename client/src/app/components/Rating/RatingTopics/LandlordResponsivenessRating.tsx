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

const LandlordResponsivenessRating: React.FC<RatingContainerInterface> = ({ dbReviewObject, imageURLs, setImageURLs }) => {
  
  const TOPIC = 'Landlord Responsiveness'
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('')

  const LandlordResponsiveness = {
    "rating": rating,
    "comment": comment
  }

  dbReviewObject.landlord_responsiveness = rating;
  dbReviewObject.landlord_responsiveness_comment = comment;

  return (
    <>
      <div className='rating-elements'> 
      <h2>{TOPIC}</h2>
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
    </>
  );
};

export default LandlordResponsivenessRating;