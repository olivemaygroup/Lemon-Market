import { Photo } from "../types/types";
import axios from "axios";
import { AxiosResponse } from "axios";
import { error } from "console";



function createCloudinaryURL(): string {
  const cloudinaryName = process.env.CLOUDINARYNAME;
  if (cloudinaryName) {
    return `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`;
  } else {
    console.error("cloudinary database name undefined");
    return "";
  }
}

//Takes an array of uploaded files and returns and array of string containg their urls

const cloudinaryImagesToURLS = async (files: File[]): Promise<string[] | AxiosResponse<any, any>[]> => {

  const CLOUDINARYURL: string = createCloudinaryURL();

  const imagePromises: Promise<AxiosResponse<any, any>>[] = [];


  for (let image of files) {
    const imageData = new FormData();
    imageData.append("file", image);
    imageData.append("upload_preset", "default");
    const imagePromise = axios.post(CLOUDINARYURL, imageData);
    imagePromises.push(imagePromise);
  }

  if (imagePromises.length > 0) {
    return Promise.all(imagePromises)
      .then((res) => res)
      .catch((error) => {
        console.error("Error:", error);
        throw new Error('error resolving promises')
      });
  } else {
    throw new Error('error creating Cloudinary promises')
  }
}

export default cloudinaryImagesToURLS;
