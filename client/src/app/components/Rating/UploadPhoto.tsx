import React from 'react';
import cloudinaryImagesToURLS from '@/app/ApiServices/cloudinaryAPI';
import { Photo } from '@/app/types/types';

interface PhotoUploadComponentProps {
  TOPIC: string;
  imageURLs: Photo[]; 
  setImageURLs: Function
}

const PhotoUploadComponent: React.FC<PhotoUploadComponentProps> = ({ TOPIC, imageURLs, setImageURLs }) => {

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    
    if (event.target.files && event.target.files.length > 0) {
      const imagesArray: File[] = Array.from(event.target.files);
      const uploadedURLs = await cloudinaryImagesToURLS(imagesArray, TOPIC);
      if (uploadedURLs) {
        setImageURLs([...imageURLs, ...uploadedURLs.map(item => item.url.data.url)]);
      }
    }
  };

  return (
    <form>
      <label>Upload Photo</label>
      <input type="file" accept=".jpg, .png, .jpeg" onChange={handleImageUpload} multiple></input>
    </form>
  );
};

export default PhotoUploadComponent;
