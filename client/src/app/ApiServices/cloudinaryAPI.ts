import axios from "axios";
import { AxiosResponse } from "axios";
import { Photo } from "../types/review-types";
import { ImageFileObject } from "../types/review-types";



function createCloudinaryURL(): string {
  const cloudinaryName = process.env.NEXT_PUBLIC_CLOUDINARYNAME;
  if (cloudinaryName) {
    return `https://api.cloudinary.com/v1_1/${cloudinaryName}/image/upload`;
  } else {
    console.error("cloudinary database name undefined");
    return "";
  }
}

//Takes an array of uploaded files and returns and array of object that containe a url and the corresponding tag

const cloudinaryImagesToURLS = async (files: ImageFileObject[]): Promise<{ url: AxiosResponse<any, any>, tag: string }[] | undefined> => {

  const CLOUDINARYURL: string = createCloudinaryURL();

  const imagePromises: Promise<AxiosResponse<any, any>>[] = [];


  for (let image of files) {
    const imageData = new FormData();
    imageData.append("file", image.file);
    imageData.append("tags", image.tag)
    imageData.append("upload_preset", "default");
    const imagePromise = axios.post(CLOUDINARYURL, imageData);
    imagePromises.push(imagePromise);
  }

  if (imagePromises.length > 0) {
    return Promise.all(imagePromises)
      .then((res) => {
        if (res) {
          const photoArray = res.map(url => {
            return { url: url.data.secure_url, tag: url.data.tags[0] }
          })
          return photoArray
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        return undefined
      });
  } else {
    return undefined
  }
}

export default cloudinaryImagesToURLS;

