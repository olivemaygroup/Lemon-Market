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

export default function PropertyDetail() {
  const dispatch = useDispatch();


  const property = useSelector((state: RootState) => state.property.value)
  const reviewList = useSelector((state: RootState) => state.reviewList.value)

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

  return (
      <div className={styles.description}>
        <div className="address">
        <p>{property.fullAddress}</p>
        </div>
        <PropertyOverview></PropertyOverview>
        {/* {reviewList.map((review) => {
          <p> {review}</p>
        })} */}
       <div>
        <h2 className={styles.reviewName}>Joe Bloggs review</h2>
        <FullReview></FullReview>
        </div> 
      </div>
  );
}
