import React, { useState } from 'react';

interface PhotoUploadComponentProps {
  TOPIC: string,
  photoURLs: [],
  setPhotoURLs: Function
}

const PhotoUploadComponent: React.FC<PhotoUploadComponentProps> = ({ TOPIC, photoURLs, setPhotoURLs }) => {

  return (
    <form>
      <label>Upload Photo</label>
      <input type="file" accept=".jpg, .png, .jpeg"></input>
    </form>
  )
};

export default PhotoUploadComponent;
