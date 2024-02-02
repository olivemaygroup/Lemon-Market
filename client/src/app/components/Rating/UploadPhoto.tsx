import React from 'react';
import { Photo } from '@/app/types/types';

interface PhotoUploadComponentProps {
  metricName: string;
  imageURLs: File[];
  setImageURLs: React.Dispatch<React.SetStateAction<File[]>>;
};

const PhotoUploadComponent: React.FC<PhotoUploadComponentProps> = ({
  metricName,
  imageURLs,
  setImageURLs
}) => {

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const newImagesArray: File[] = Array.from(event.target.files);
      setImageURLs(prevImages => [...prevImages, ...newImagesArray]);
    }
  };

  return (
    <form>
      <label>Upload Photo</label>
      <input type="file" accept=".jpg, .png, .jpeg" onChange={handleImageUpload} multiple />
    </form>
  );
};

export default PhotoUploadComponent;
