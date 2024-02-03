import React from 'react';
import { Photo } from '@/app/types/types';
import Button from '@mui/material/Button'
import { ImageFileObject } from '@/app/types/review-types';

interface PhotoUploadComponentProps {
  metricName: string;
  imageFiles: ImageFileObject[];
  setImageFiles: React.Dispatch<React.SetStateAction<ImageFileObject[]>>;
};

const PhotoUploadComponent: React.FC<PhotoUploadComponentProps> = ({ metricName, imageFiles, setImageFiles}) => {

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newImagesArray: File[] = Array.from(event.target.files);
      const imagesObjectArray: ImageFileObject[] = newImagesArray.map( (image)=> {
        return {file:image,tag:metricName}
      })
      setImageFiles([...imageFiles, ...imagesObjectArray]);
    }
  };

  return (
    <form>
      <Button
      variant="contained"
      component="label"
    >
      Add Photo
      <input
        type="file"
        accept=".jpg, .png, .jpeg"
        onChange={handleImageUpload} multiple 
        hidden/>
      </Button>

      {/* <label>Upload Photo</label> */}
      {/* <input 
      type="file" 
       
      
      placeholder='Hello'
      /> */}
    </form>
  );
};

export default PhotoUploadComponent;
