import './fullReview.css'
import React, { Component } from 'react';
import { Carousel } from 'react-responsive-carousel'
import ReadonlyRating from './readonlyRating';
import { Review } from '@/app/types/review-types';

const FullReview = ({ item }: { item: Review }) => {

// console.log('item console', item)
  return (
  <div className="container">
    <Carousel
    showArrows={true}
    infiniteLoop={true}
    dynamicHeight={true}
    className='carousel'
    showThumbs={false} 
    >
      <div className='text'>
        <h2>Financials</h2>
        <p data-testid="fr">Rent: {item.monthly_rent}</p>
        <p data-testid="fb">Bills: {item.monthly_bill}</p>
        <p data-testid="fc">Council tax: {item.council_tax}</p>
      </div>

      <div className='text'>
        <h2>Cleanliness</h2>
        <h2><ReadonlyRating rating={item.cleanliness} /></h2>
        <p data-testid="cc">{item.cleanliness_comment}</p>
      </div>
      
      <div className='text'>
        <h2>Maintenance</h2>
        <h2><ReadonlyRating rating={item.maintenance} /></h2>
        <p data-testid="mc">{item.maintenance_comment}</p>
      </div>
     
      <div className='text'>
        <h2>Value for money</h2>
        <h2><ReadonlyRating rating={item.value_for_money} /></h2>
        <p data-testid="vc">{item.value_for_money_comment}</p>
      </div>

      <div className='text'>
        <h2>Deposit handling</h2>
        <h2><ReadonlyRating rating={item.deposit_handling} /></h2>
        <p data-testid="dc">{item.deposit_handling_comment}</p>
      </div>

      <div className='text'>
        <h2>Amenities</h2>
        <h2><ReadonlyRating rating={item.amenities} /></h2>
        <p data-testid="ac">{item.amenities_comment}</p>
      </div>
     
      <div className='text'>
        <h2>Landlord responsiveness</h2>
        <h2><ReadonlyRating rating={item.landlord_responsiveness} /></h2>
        <p data-testid="lc">{item.landlord_responsiveness_comment}</p>
      </div>

    </Carousel>

    </div>

  )

}

export default FullReview