import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel'
import ReadonlyRating from './readonlyRating';
import { Review } from '@/app/types/review-types';



const AddReview = () => {

  return (
    <div style={{height: '200px'}}>

    <Carousel
    showArrows={true}
    infiniteLoop={true}
    dynamicHeight={false}
    className='carousel'
    showThumbs={false} 
    >
        <p> TEST</p>
        <p> HELLO</p>
        <p> HELLO</p>
      </Carousel>
      </div>

  )
}

export default AddReview