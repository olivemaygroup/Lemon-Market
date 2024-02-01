import './fullReview.css'
import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel'

const FullReview = () => {


  return (
  <div className="container">
    <Carousel
    showArrows={true}
    infiniteLoop={true}
    dynamicHeight={true}
    className='carousel'
   
    >
      <div className='text'>
        <h2>Cleanliness</h2>
        <h2>Star rating</h2>
        <p>This is a cleanliness review</p>
      </div>
      
      <div className='text'>
        <h2>Maintenance</h2>
        <h2>Star rating</h2>
        <p>"This is a cleanliness review am much longer review This is a cleanliness review am much longer reviewThis is a cleanliness review am much longer review This is a cleanliness review am much longer review This is a cleanliness review am much longer review This is a cleanliness review am much longer review"
        This is a cleanliness review am much longer review This is a cleanliness review am much longer reviewThis is a cleanliness review am much longer review This is a cleanliness review am much longer review This is a cleanliness review am much longer review This is a cleanliness review am much longer review"
        This is a cleanliness review am much longer review This is a cleanliness review am much longer reviewThis is a cleanliness review am much longer review This is a cleanliness review am much longer review This is a cleanliness review am much longer review This is a cleanliness review am much longer review"
        </p>
      </div>
    </Carousel>

  </div>
  
  )

}

export default FullReview