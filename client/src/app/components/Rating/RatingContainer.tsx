"use client";
import PhotoUploadComponent from "./UploadPhoto";
import AddComment from "./AddComment";
import CustomizedRating from "./CustomizedRating";

interface RatingContainerInterface {
  ratingState: number,
  ratingSetter: Function,
  commentState: string,
  commentSetter: Function,
  metricName: string,
  imageFiles: File[],
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>,
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
    imageFiles,
    setImageFiles,
    imageURLs, 
    setImageURLs 
  }) => {

  return (
    <>
      <div className='rating-item'> 
      <h4>{metricName}</h4>
        <div className='col text-center'>
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
      </div>
    </>
  );
};

export default RatingContainer