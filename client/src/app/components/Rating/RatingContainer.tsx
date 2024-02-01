"use client";
import { useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { cleanliness, landlord } from "@/lib/features/review/addReviewSlice"; // Adjust the path based on your project structure
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import styles from "@/app/page.module.css";
// import StoreProvider from "../StoreProvider";
import StarRating from "./StarRating";
import PhotoUploadComponent from "./PhotoUpload";
import AddComment from "./AddComment";
import CustomizedRating from "./StyledRating";

interface RatingContainerInterface {
  metric: string
}

const RatingContainer: React.FC<RatingContainerInterface> = ({ metric }) => {
  
  const [rating, setRating] = useState<number>(0);
  const [imgURL, setImgURL] = useState<string[]>([]);
  const [comment, setComment] = useState<string>('')
  return (
    <>
    
      <div className='star-container'> 
      <h2>{metric}</h2>
        <div className='col text-center'>
          <CustomizedRating 
          rating={rating} 
          onRating={(rate: number) => setRating(rate)} 
          />
          <PhotoUploadComponent 
          imgURL={imgURL} 
          setImgURL={setImgURL}
          metric={metric}
          />
          <AddComment 
          comment={comment}
          setComment={setComment}
          />
        </div>
      </div>
    </>
  );
};

export default RatingContainer