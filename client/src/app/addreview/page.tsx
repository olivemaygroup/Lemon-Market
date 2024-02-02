"use client";
import React, { useState } from "react";
import RentBillsTaxComponent from "../components/Rating/RentBillsTax";
import TenancyDuration from "../components/Rating/TenancyDuration";
import { Review } from "@/app/types/types";
import RatingContainer from "../components/Rating/RatingContainer";
import cloudinaryImagesToURLS from "../ApiServices/cloudinaryAPI";
import reviewAPI from "../ApiServices/reviewAPI";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";


export default function addReview() {

  const fullProperty = useSelector((state: RootState) => state.fullProperty.value)


  const [imageFiles, setImageFiles] = useState<File[]>([])

  const [imageURLs, setImageURLs] = useState<any[]>([])
  const [t_start, setT_start] = useState<string>('');
  const [t_end, setT_end] = useState<string>('');
  const [cleanliness, setCleanliness] = useState<number>(0);
  const [cleanliness_comment, setCleanliness_comment] = useState<string>('');
  const [maintenance, setMaintenance] = useState<number>(0);
  const [maintenance_comment, setMaintenance_comment] = useState<string>('');
  const [value_for_money, setValue_for_money] = useState<number>(0);
  const [value_for_money_comment, setValue_for_money_comment] = useState<string>('');
  const [deposit_handling, setDeposit_handling] = useState<number>(0);
  const [deposit_handling_comment, setDeposit_handling_comment] = useState<string>('');
  const [amenities, setAmenities] = useState<number>(0);
  const [amenities_comment, setAmenities_comment] = useState<string>('');
  const [landlord_responsiveness, setLandlord_responsiveness] = useState<number>(0);
  const [landlord_responsiveness_comment, setLandlord_responsiveness_comment] = useState<string>('');
  const [total_review_rating, setTotal_review_rating] = useState<number>(0);
  const [monthly_rent, setMonthly_rent] = useState<number>(0);
  const [monthly_bill, setMonthly_bill] = useState<number>(0);
  const [council_tax, setCouncil_tax] = useState<number>(0);
  const [general_comment, setGeneral_comment] = useState<string>('');

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
  });

  const ratingMetrics = [
    {
      name: "Cleanliness",
      ratingState: cleanliness,
      RatingSetter: setCleanliness,
      commentState: cleanliness_comment,
      commentSetter: setCleanliness_comment
    },
    {
      name: "Maintenance",
      ratingState: maintenance,
      RatingSetter: setMaintenance,
      commentState: maintenance_comment,
      commentSetter: setMaintenance_comment
    },
    {
      name: "Value For Money",
      ratingState: value_for_money,
      RatingSetter: setValue_for_money,
      commentState: value_for_money_comment,
      commentSetter: setValue_for_money_comment
    },
    {
      name: "Deposit Handling",
      ratingState: deposit_handling,
      RatingSetter: setDeposit_handling,
      commentState: deposit_handling_comment,
      commentSetter: setDeposit_handling_comment
    },
    {
      name: "Amenities",
      ratingState: amenities,
      RatingSetter: setAmenities,
      commentState: amenities_comment,
      commentSetter: setAmenities_comment

    },
    {
      name: "Landlord Responsiveness",
      ratingState: landlord_responsiveness,
      RatingSetter: setLandlord_responsiveness,
      commentState: landlord_responsiveness_comment,
      commentSetter: setLandlord_responsiveness_comment
    }
  ];

  const handleSubmit = async (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    const avgStars = await (cleanliness + maintenance + value_for_money + deposit_handling + amenities + landlord_responsiveness) / 6
    setTotal_review_rating(avgStars)

    const gen_comment = "Submitting review for test..."
    setGeneral_comment(gen_comment)

    const imageURLsArray: any = await cloudinaryImagesToURLS(imageFiles, 'test');
    if (imageURLsArray) {
      setImageURLs(imageURLsArray)
    }

    let reviewObject: Review = {
      t_start,
      t_end,
      cleanliness,
      cleanliness_comment,
      maintenance,
      maintenance_comment,
      value_for_money,
      value_for_money_comment,
      deposit_handling,
      deposit_handling_comment,
      amenities,
      amenities_comment,
      landlord_responsiveness,
      landlord_responsiveness_comment,
      total_review_rating: avgStars,
      monthly_rent: +monthly_rent,
      monthly_bill: +monthly_bill,
      council_tax: +council_tax,
      general_comment: gen_comment,
      photos: imageURLsArray
    }


    if (fullProperty.property_id !== '') {
      reviewAPI.addReview(fullProperty.property_id, reviewObject)
    } else {
      console.error('property id is undefined')
    }

  }

  let tempKey = 0;

  return (
    <div className="review-subject-container">
      <div className="rating-item">

        <TenancyDuration
          t_start={t_start}
          t_end={t_end}
          setT_end={setT_end}
          setT_start={setT_start}
        />
      </div>

      {ratingMetrics.map((metric) => (
        <RatingContainer
          key={tempKey++}
          ratingState={metric.ratingState}
          ratingSetter={metric.RatingSetter}
          commentState={metric.commentState}
          commentSetter={metric.commentSetter}
          metricName={metric.name}
          imageFiles={imageFiles}
          setImageFiles={setImageFiles}
          setImageURLs={setImageURLs}
        />
      ))}

      <div className="rating-item">
        <RentBillsTaxComponent
          monthly_rent={monthly_rent}
          monthly_bill={monthly_bill}
          council_tax={council_tax}
          setMonthly_rent={setMonthly_rent}
          setMonthly_bill={setMonthly_bill}
          setCouncil_tax={setCouncil_tax}
        />
      </div>

      <button className="rating-item" onClick={handleSubmit}>Submit Review</button>
    </div>
  )
};