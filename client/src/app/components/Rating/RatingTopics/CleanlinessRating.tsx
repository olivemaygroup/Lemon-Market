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


const CleanlinessRating: React.FC<RatingContainerInterface> = ({ dbReviewObject, imageURLs, setImageURLs }) => {
  
  const TOPIC = 'Cleanliness'

  const [comment, setComment] = useState<string>('')
  const [rating, setRating] = useState<number>(0);

  const Cleanliness = {
    "rating": rating,
    "comment": comment
  }

  dbReviewObject.cleanliness = rating;
  dbReviewObject.cleanliness_comment = comment;

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
        setComment={setComment}
        />
      </div>
    </>
  );
};

export default CleanlinessRating