import Image from "next/image";
import "./propertyOverview.css"
import testPic from "../../../../public/testPic.jpg";
import noimage from "../../../../public/noimage.png";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel'


import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import { useState } from "react";



const PropertyOverview = () => {


  const [picture, SetPicture] = useState(true)
  const [rating, SetRating] = useState(false)
  const [review, SetReview] = useState(6)
  // let review = useSelector((state: RootState) => state.fullProperty.value)
  
 
  return (

    <div className='overviewContainer'>
      
      {picture ? 

        <Carousel
        showArrows={true}
        infiniteLoop={true}
        dynamicHeight={false}
        className='carousel'
        >
      <div className='image-container'>
        <Image 
          src={testPic}
          alt="Picture of the property"
          sizes="(max-width: 500px) 100vw, 33vw"
          layout="responsive"
          />
      </div>
      <div className='image-container'>
        <Image 
          src={testPic}
          alt="Picture of the property"
          sizes="(max-width: 500px) 100vw, 33vw"
          layout="responsive"
          />
      </div>
      <div className='image-container'>
        <Image 
          src={testPic}
          alt="Picture of the property"
          sizes="(max-width: 500px) 100vw, 33vw"
          layout="responsive"
          />
      </div>
      <></>
      </Carousel>
      :
      <Image 
          src={noimage}
          alt="Picture of the property"
          sizes="(max-width: 500px) 100vw, 33vw"
          layout="responsive"
          />
      }
      
      
      {/* Render options for general rating */}
      {rating ?
      <div className="rating">
        <p>5 stars</p>
      </div>
      :
      <div className="rating">
        <span>No stars</span>
      </div>
      }
        {review !== 0 ?
      <div className="reviews">
        <p>{review} reviews</p>
      </div>
      :
      <div className="reviews">
        <p>No reviews</p>
      </div>
      }
      {/* <div className="spacer"></div> */}
    </div>
  );
};

export default PropertyOverview;
