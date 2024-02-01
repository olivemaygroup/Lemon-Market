"use client";
import { useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import styles from "@/app/page.module.css";
// import StoreProvider from "../StoreProvider";
import StarRating from "./StarRating";
import PhotoUploadComponent from "./UploadPhoto";
import AddComment from "./AddComment";
import CustomizedRating from "./CustomizedRating";

interface RatingContainerInterface {
  metric: string
}

const RatingContainer: React.FC<RatingContainerInterface> = ({ metric, imageURLs, setImageURLs }) => {
  
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>('')

  // {
  //   {metric}.rating: 5,
  //   {metric}.imageURLS: {
  //     ""
  //     ""
  //   },
  //   metr
  // }

  return (
    <>
      <div className='rating-item'> 
      <h2>{metric}</h2>
        <div className='col text-center'>
          <CustomizedRating 
          metric={metric}
          rating={rating} 
          onRating={(rate: number) => setRating(rate)} 
          />
          <PhotoUploadComponent 
          metric={metric}
          imageURLs={imageURLs}
          setImageURLs={setImageURLs}
          />
          <AddComment 
          metric={metric}
          comment={comment}
          setComment={setComment}
          />
        </div>
      </div>
    </>
  );
};

export default RatingContainer