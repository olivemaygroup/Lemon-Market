"use client";
import PhotoUploadComponent from "./UploadPhoto";
import AddComment from "./AddComment";
import CustomizedRating from "./CustomizedRating";
import { ImageFileObject } from "@/app/types/review-types";

interface RatingContainerInterface {
  ratingState: number,
  ratingSetter: Function,
  commentState: string,
  commentSetter: Function,
  metricName: string,
  imageFiles: ImageFileObject[],
  setImageFiles: React.Dispatch<React.SetStateAction<ImageFileObject[]>>,
}

const RatingContainer: React.FC<RatingContainerInterface> = (
  { 
    ratingState, 
    ratingSetter, 
    commentState, 
    commentSetter, 
    metricName, 
    imageFiles,
    setImageFiles,
  }) => {

  return (
    <>
      <h2 className="title">{metricName}</h2>
        <div>
    
          <CustomizedRating 
          metricName={metricName}
          ratingState={ratingState}
          ratingSetter={ratingSetter}
          onRating={(rate: number) => ratingSetter(rate)} 
          />

          <PhotoUploadComponent 
          metricName={metricName}
          imageFiles={imageFiles}
          setImageFiles={setImageFiles}
          />

          <AddComment 
          metricName={metricName}
          commentState={commentState}
          commentSetter={commentSetter}
          />
        </div>
    </>
  );
};

export default RatingContainer