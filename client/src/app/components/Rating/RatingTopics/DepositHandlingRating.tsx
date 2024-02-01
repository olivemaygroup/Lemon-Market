"use client";
import { useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import styles from "@/app/page.module.css";
// import StoreProvider from "../StoreProvider";
import PhotoUploadComponent from "../UploadPhoto";
import AddComment from "../AddComment";
import CustomizedRating from "../StyledRating";

interface RatingContainerInterface {
  imageURLs: [], 
  setImageURLs: Function
}

const DepositHandlingRating: React.FC<RatingContainerInterface> = ({ dbReviewObject, imageURLs, setImageURLs }) => {
  
  const TOPIC = 'Deposit Handling'
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('')

  const DepositHandling = {
    "rating": rating,
    "comment": comment
  }

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

export default DepositHandlingRating;