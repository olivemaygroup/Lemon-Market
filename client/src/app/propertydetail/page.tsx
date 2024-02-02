'use client'
import Image from "next/image";

import styles from "@/app/propertydetail/page.module.css";
import './page.module.css'
import TopImageScroll from "@/app/components/PropertyDetail/propertyOverview";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import reviewAPI from "../ApiServices/reviewAPI";
import { setReviewListSlice } from "@/lib/features/review/addReviewSlice";
import  PropertyOverview from "@/app/components/PropertyDetail/propertyOverview";
import FullReview from "@/app/components/PropertyDetail/fullReview";
import RatingDetail from "../components/PropertyDetail/ratingDetail";
import { Review } from '@/app/types/review-types';
import AddReview from "../components/PropertyDetail/addReview";


export default function PropertyDetail() {
  const dispatch = useDispatch();


  const property = useSelector((state: RootState) => state.property.value)
  const reviewList: Review[] = useSelector((state: RootState) => state.reviewList.value)
  console.log('review list state: ', reviewList)

  
  return (
    <div className={styles.description}>
      <div className="address">
        <h2>{property.fullAddress}</h2>
      </div>
      <PropertyOverview reviewList={reviewList}/>
      <RatingDetail reviewList={reviewList}/>
      {reviewList.map((item, index) => (
        <div key={index}>
          <h2 className={styles.reviewName}>Joe Bloggs review: Jan 22</h2>
          <FullReview  item={item} />
        </div>
      ))}
      <AddReview></AddReview>
    </div>
  );
}

// useEffect(() => {

//   const accessToken = localStorage.getItem('acccesToken')

//   reviewAPI.getMyReviews('eyJhbGciOiJIUzI1NiJ9.NA.oeLKdo1U0E5x9a0N6_Gb3tOj8DZiucVe5Z7BNWwpfzc')
//     .then((res) => {
//       if (res) {
//         dispatch(setReviewListSlice(res))
//       }
//     })
//     .catch((error) => {
//       console.log(error)
//     })


// }, [])
// useEffect(() => {
//   console.log(reviewList, 'reviewLidst')
// }, [reviewList])