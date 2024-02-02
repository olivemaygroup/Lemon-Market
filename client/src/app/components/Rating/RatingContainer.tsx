"use client";
import { useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import styles from "@/app/page.module.css";
// import StoreProvider from "../StoreProvider";
// import StarRating from "./StarRating";
import PhotoUploadComponent from "./UploadPhoto";
import AddComment from "./AddComment";
import CustomizedRating from "./CustomizedRating";

interface RatingContainerInterface {
  ratingState: number,
  ratingSetter: Function,
  commentState: string,
  commentSetter: Function,
  metricName: string,
  imageURLs: [],
  setImageURLs: Function
}

const RatingContainer: React.FC<RatingContainerInterface> = (
  { 
    ratingState, 
    ratingSetter, 
    commentState, 
    commentSetter, 
    metricName, 
    imageURLs, 
    setImageURLs 
  }) => {

  return (
    <>
      <div className='rating-item'> 
      <h2>{metricName}</h2>
        <div className='col text-center'>
          <CustomizedRating 
          metricName={metricName}
          ratingState={ratingState}
          ratingSetter={ratingSetter}
          onRating={(rate: number) => ratingSetter(rate)} 
          />
          <PhotoUploadComponent 
          metricName={metricName}
          imageURLs={imageURLs}
          setImageURLs={setImageURLs}
          />
          <AddComment 
          metricName={metricName}
          commentState={commentState}
          commentSetter={commentSetter}
          />
        </div>
      </div>
    </>
  );
};

export default RatingContainer