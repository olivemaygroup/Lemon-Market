"use client";
import React, { useState } from "react";
import {Photo} from '../types/types'
import RentBillsTaxComponent from "../components/Rating/RatingTopics/RentBillsTax";
import TenancyDuration from "../components/Rating/TenancyDuration";
import CleanlinessRating from "../components/Rating/RatingTopics/CleanlinessRating";
import MaintenanceRating from "../components/Rating/RatingTopics/MaintenanceRating";
import SigningProcessRating from "../components/Rating/RatingTopics/SigningProcessRating";
import DepositHandlingRating from "../components/Rating/RatingTopics/DepositHandlingRating";
import AmenitiesRating from "../components/Rating/RatingTopics/AmenitiesRating";
import LandlordResponsivenessRating from "../components/Rating/RatingTopics/LandlordResponsivenessRating";

export default function addReview () {

  const [imageURLs, setImageURLs] = useState<Photo[]>([])

  const dbReviewObject = {
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
    photos: [],
  }



  return (
    <>
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
        <RentBillsTaxComponent />
        </div>
      </div>
    </>
  )
};