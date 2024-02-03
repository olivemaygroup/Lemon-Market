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
      <h1 className="title">{metricName}</h1>
        <div className="rating-bits">

          <div className='rating-interactive-icons'>
          <CustomizedRating 
          metricName={metricName}
          ratingState={ratingState}
          ratingSetter={ratingSetter}
          onRating={(rate: number) => ratingSetter(rate)} 
          />
          </div>

          <div className="rating-btns">
            
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
          
        </div>
    </>
  );
};

export default RatingContainer