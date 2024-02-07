"use client";
import React, { useState } from "react";
import RentBillsTaxComponent from "../components/Rating/RentBillsTax";
import TenancyDuration from "../components/Rating/TenancyDuration";
import { Review } from "@/app/types/types";
import RatingContainer from "../components/Rating/RatingContainer";
import cloudinaryImagesToURLS from "../ApiServices/cloudinaryAPI";
import reviewAPI from "../ApiServices/reviewAPI";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import styles from './page.module.css'
import { ImageFileObject } from "../types/review-types";
import PhotoUploadComponent from "../components/Rating/UploadPhoto";
import Link from 'next/link'
import Button from '@mui/material/Button';
import { useRouter } from "next/navigation";
import { setReviewListSlice } from "@/lib/features/review/addReviewSlice";


export default function addReview() {
  const address: string = '123 love lane'
  const fullProperty = useSelector((state: RootState) => state.fullProperty.value)
  const reviewList = useSelector((state: RootState) => state.reviewList.value)
  const dispatch = useDispatch()

  const router = useRouter()
  const [imageFiles, setImageFiles] = useState<ImageFileObject[]>([]);
  const [imageURLs, setImageURLs] = useState<any[]>([]);
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
  const [total_review_rating, setTotal_review_rating] = useState<number>();
  const [monthly_rent, setMonthly_rent] = useState<number>();
  const [monthly_bill, setMonthly_bill] = useState<number>();
  const [council_tax, setCouncil_tax] = useState<number>();
  const [general_comment, setGeneral_comment] = useState<string>('');

  /*

  TODO: ensure types of monthly rent bill and tax are all numbers = currently as you can see in the dbobject I have had to convert them to integers
  TODO: data validation = Null? provide errors on inputs that haven't been filled etc - for example right now if no photos are uploaded it should error - make it so that either they have to upload photos or if photos are not uploaded to ensure backend works with it
  TODO: sort typescript = make it so that there are not type errors
  TODO: introduce required for rating
  */

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
      name: "Amenities",
      ratingState: amenities,
      RatingSetter: setAmenities,
      commentState: amenities_comment,
      commentSetter: setAmenities_comment

    },
    {
      name: "Deposit Handling",
      ratingState: deposit_handling,
      RatingSetter: setDeposit_handling,
      commentState: deposit_handling_comment,
      commentSetter: setDeposit_handling_comment
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

    const imageURLsArray: any = await cloudinaryImagesToURLS(imageFiles);
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
      general_comment,
      photos: imageURLsArray
    }

    if (fullProperty.property_id != "") {
      await reviewAPI.addReview(fullProperty.property_id, reviewObject)
      dispatch(setReviewListSlice([...reviewList, reviewObject]))
      
    } else {
      console.error('property id is undefined')
    }
    router.push('/propertydetail')

  };

  return (
    <div className={styles.addreview_page}>
      <h1 className={styles.address_title}>{fullProperty.fullAddress}</h1>
      <div className={styles.review_items_container}>

        <div className="rating-item">
        <h1 className="title">Tenancy Dates</h1>
          <TenancyDuration
            t_start={t_start}
            t_end={t_end}
            setT_end={setT_end}
            setT_start={setT_start}
            />
        </div>

        {ratingMetrics.map((metric) => (
          <div className='rating-item'>
            <RatingContainer
            key={metric.name}
            ratingState={metric.ratingState}
            ratingSetter={metric.RatingSetter}
            commentState={metric.commentState}
            commentSetter={metric.commentSetter}
            metricName={metric.name}
            imageFiles={imageFiles}
            setImageFiles={setImageFiles}
            />
          </div>
          ))}

        <div className="rating-item">
        <h1 className="title">Rent, Bills & Council Tax </h1>
          <RentBillsTaxComponent
            monthly_rent={monthly_rent}
            monthly_bill={monthly_bill}
            council_tax={council_tax}
            setMonthly_rent={setMonthly_rent}
            setMonthly_bill={setMonthly_bill}
            setCouncil_tax={setCouncil_tax}
            />
        </div>

        <form className="rating-item">
          <textarea
          className="general-comment-input"
          onChange={(event)=>{setGeneral_comment(event.target.value)}}
          placeholder="General comments and photos..."
          >
          </textarea>
          <PhotoUploadComponent
          metricName="General"
          imageFiles={imageFiles}
          setImageFiles={setImageFiles}
          />
        </form>

        <div className="rating-item-submit">
          <div className="addreview-submit-btn">
              <Button
                className={styles.addreview_submit_btn}
                onClick={() => handleSubmit}
                >
                  Submit Review
              </Button>
           
          </div>
        </div>

      </div>
    </div>
  )
};