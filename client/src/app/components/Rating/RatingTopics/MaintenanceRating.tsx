"use client";
import { useState } from "react";
import PhotoUploadComponent from "../UploadPhoto";
import AddComment from "../AddComment";
import CustomizedRating from "../CustomizedRating";
import { Review } from "@/app/types/types";

interface RatingContainerInterface {
  imageURLs: [], 
  setImageURLs: Function
  dbReviewObject: Review
}

const MaintenanceRating: React.FC<RatingContainerInterface> = ({ dbReviewObject, imageURLs, setImageURLs }) => {
  
  const TOPIC = 'Maintenance'
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('')

  const Maintenance = {
    "rating": rating,
    "comment": comment
  }

  dbReviewObject.maintenance = rating;
  dbReviewObject.maintenance_comment = comment;

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

export default MaintenanceRating