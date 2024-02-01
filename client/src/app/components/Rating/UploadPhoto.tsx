import React, { useState } from 'react';

interface PhotoUploadComponentProps {
  metric: string; 
}

const PhotoUploadComponent: React.FC<PhotoUploadComponentProps> = ({ metric, photoURLs, setPhotoURLs }) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadResponses, setUploadResponses] = useState<string[]>([]);

  const url = "https://api.cloudinary.com/v1_1/TEST-PLEASE-REPLACE/image/upload"; 

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const uploadedUrls: string[] = [];

    for (let i = 0; i < files.length; i++) {
      const formData = new FormData();
      formData.append("file", files[i]);
      formData.append("upload_preset", "docs_upload_example_us_preset"); // Replace with your Cloudinary preset
      formData.append("tags", metric); // Add tags from props

      try {
        const response = await fetch(url, {
          method: "POST",
          body: formData
        });
        const data = await response.json(); // Assuming the response is JSON
        uploadedUrls.push(data.url); // Store the URL from the response
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    setUploadResponses(uploadedUrls);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" onChange={handleFileChange} multiple />
      <button type="submit">Upload Photos</button>
      <div>
        {uploadResponses.map((url, index) => (
          <div key={index}>Uploaded URL: {url}</div>
        ))}
      </div>
    </form>
  );
};

export default PhotoUploadComponent;
