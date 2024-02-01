"use client";
import React, { useState } from "react";
import {Photo} from '../types/types'
import RentBillsTaxComponent from "../components/Rating/RatingTopics/RentBillsTax";
import TenancyDuration from "../components/Rating/TenancyDuration";
import CleanlinessRating from "../components/Rating/RatingTopics/CleanlinessRating";
import MaintenanceRating from "../components/Rating/RatingTopics/MaintenanceRating";
import SigningProcessRating from "../components/Rating/RatingTopics/ValueForMoneyRating";
import DepositHandlingRating from "../components/Rating/RatingTopics/DepositHandlingRating";
import AmenitiesRating from "../components/Rating/RatingTopics/AmenitiesRating";
import LandlordResponsivenessRating from "../components/Rating/RatingTopics/LandlordResponsivenessRating";
import { Review } from "@/app/types/types";

export default function addReview () {

  const [imageURLs, setImageURLs] = useState<Photo[]>([])
  const [dbReviewObject, setDBReviewObject] = useState<Review>({
    t_start: '',
    t_end: '',
    cleanliness: 0,
    cleanliness_comment: '',
    maintenance: 0,
    maintenance_comment: '',
    value_for_money: 0,
    value_for_money_comment: '',
    deposit_handling: 0,
    deposit_handling_comment: '',
    amenities: 0,
    amenities_comment: '',
    landlord_responsiveness: 0,
    landlord_responsiveness_comment: '',
    total_review_rating: 0,
    monthly_rent: 0,
    monthly_bill: 0,
    council_tax: 0,
    general_comment: '',
    photos: []
  })


  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const finalReviewObject = {
      ...dbReviewObject,
      photos: imageURLs
    };

    try {
      const response = await fetch('http://localhost:3001/addreview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalReviewObject),
      });

      if (!response.ok) throw new Error('Unable to send final review object to backend. Check addreview component');
      const data = await response.json();
      console.log(data); 
    } catch (error) {
      console.error('Error check addreview component', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="review-subject-container">
        <div className="rating-item">
        <TenancyDuration 
          dbReviewObject={dbReviewObject}/>
        </div>

        <div className="rating-item">
        <CleanlinessRating 
          dbReviewObject={dbReviewObject}
          imageURLs={imageURLs}
          setImageURLs={setImageURLs}
          />
        </div>

        <div className="rating-item">
        <MaintenanceRating
          dbReviewObject={dbReviewObject} 
          imageURLs={imageURLs}
          setImageURLs={setImageURLs}
          />
        </div>

        <div className="rating-item">
        <SigningProcessRating
          dbReviewObject={dbReviewObject} 
          imageURLs={imageURLs}
          setImageURLs={setImageURLs}
        />
        </div>

        <div className="rating-item">
        <DepositHandlingRating 
          dbReviewObject={dbReviewObject}
          imageURLs={imageURLs}
          setImageURLs={setImageURLs}
        />
        </div>

        <div className="rating-item">
        <AmenitiesRating
          dbReviewObject={dbReviewObject} 
          imageURLs={imageURLs}
          setImageURLs={setImageURLs}
        />
        </div>

        <div className="rating-item">
        <LandlordResponsivenessRating 
          dbReviewObject={dbReviewObject}
          imageURLs={imageURLs}
          setImageURLs={setImageURLs}
        />
        </div>

        {/* {ratingMetrics.map((metric) => (
          <RatingContainer 
          rating={rating}
          setRating={setRating}
          metric={metric}
          imageURLs={imageURLs}
          setImageURLs={setImageURLs}
          /> 
        ))} */}


        <div className="rating-item">
        <RentBillsTaxComponent 
        dbReviewObject={dbReviewObject}/>
        </div>

        <button className="rating-item" type="submit">Submit Review</button>
      </div>
    </form>
  )
};