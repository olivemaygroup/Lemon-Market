import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel'
import ReadonlyRating from './readonlyRating';
import { Review } from '@/app/types/review-types';
import addReview from '@/app/addreview/page';
import NewItem from './newItem';
import './addreview.css';


const AddReview = () => {

  return (
    <div className='addReview_container'>
    <h2>An item to add</h2>
    <Carousel
    showArrows={true}
    infiniteLoop={true}
    dynamicHeight={false}
    className='carousel'
    showThumbs={false} 
    >
        <NewItem />
        <NewItem />
        <NewItem />
        <NewItem />
        <NewItem />
        <NewItem />

      </Carousel>
    <div className='buttons'>
      <button>back</button>
      <button>add photo</button>
      <button>next</button>
    </div>
    </div>

  )
}

export default AddReview