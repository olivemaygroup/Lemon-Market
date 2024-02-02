import React from 'react';
import { Photo } from '@/app/types/types';
import Button from '@mui/material/Button'

interface PhotoUploadComponentProps {
  metricName: string;
  imageFiles: File[];
  setImageFiles: React.Dispatch<React.SetStateAction<File[]>>;
};

const PhotoUploadComponent: React.FC<PhotoUploadComponentProps> = ({
  metricName,
  imageFiles,
  setImageFiles
}) => {

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newImagesArray: File[] = Array.from(event.target.files);
      setImageFiles(prevImages => [...prevImages, ...newImagesArray]);
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
