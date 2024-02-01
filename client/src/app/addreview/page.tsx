"use client";
import React, { useState } from "react";
import { Provider, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import styles from "@/app/page.module.css";
import StoreProvider from "../StoreProvider";
import RatingContainer from "../components/Rating/RatingContainer";
import {Photo} from '../types/types'
import RentBillsTaxComponent from "../components/Rating/RentBillsTaxComponent";
import TenancyDuration from "../components/Rating/TenancyDuration";
import CleanlinessRating from "../components/Rating/RatingTopics/CleanlinessRating";
import MaintenanceRating from "../components/Rating/RatingTopics/MaintenanceRating";
import SigningProcessRating from "../components/Rating/RatingTopics/SigningProcessRating";
import DepositHandlingRating from "../components/Rating/RatingTopics/DepositHandlingRating";
import AmenitiesRating from "../components/Rating/RatingTopics/AmenitiesRating";
import LandlordResponsivenessRating from "../components/Rating/RatingTopics/LandlordResponsivenessRating";

export default function addReview () {

  const [imageURLs, setImageURLs] = useState<Photo[]>([])
  const [rating, setRating] = useState<number>(0);
  const [tenancyStart, setTenancyStart] = useState("")
  const [tenancyEnd, setTenancyEnd] = useState("")

  const handleTStart = (tenancyStart: DateConstructor) => setTenancyStart(tenancyStart)
  const handleTEnd = (tenancyEnd: DateConstructor) => setTenancyEnd(tenancyEnd)

  const ratingMetrics = [
    'Cleanliness', 
    'Maintenance', 
    'Signing and Process', 
    'Deposit Handling', 
    'Amenities', 
    'Landlord Responsiveness'
  ]

  return (
    <>
      <div className="review-subject-container">
        <div className="rating-item">
        <TenancyDuration 
        handleTStart={handleTStart} 
        handleTEnd={handleTEnd}
        />
        </div>
        
        <CleanlinessRating />
        <MaintenanceRating />
        <SigningProcessRating />
        <DepositHandlingRating />
        <AmenitiesRating />
        <LandlordResponsivenessRating />

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