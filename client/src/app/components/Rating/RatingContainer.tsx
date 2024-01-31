"use client";
import { useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { cleanliness, landlord } from "@/lib/features/review/addReviewSlice"; // Adjust the path based on your project structure
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import styles from "@/app/page.module.css";
// import StoreProvider from "../StoreProvider";
import StarRating from "./StarRating";
import UploadPhoto from "./UploadPhoto";
import AddComment from "./AddComment";

const RatingContainer = () => {
  
  const [rating, setRating] = useState<number>(0);

  return (
    <>
    
      <div className='star-container'> 
        <div className='col text-center'>
          <StarRating rating={rating} onRating={(rate: number) => setRating(rate)} />
          <UploadPhoto />
          <AddComment />
        </div>
      </div>
    </>
  );
};

export default RatingContainer