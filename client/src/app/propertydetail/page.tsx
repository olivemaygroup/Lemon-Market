'use client'
import Image from "next/image";

import styles from "@/app/page.module.css";
import TopImageScroll from "@/app/components/PropertyDetail/topImageScroll";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import reviewAPI from "../ApiServices/reviewAPI";
import { setReviewListSlice } from "@/lib/features/review/addReviewSlice";

export default function PropertyDetail() {
  const dispatch = useDispatch();

  const property = useSelector((state: RootState) => state.property.value)
  const reviewList = useSelector((state: RootState) => state.reviewList.value)

  useEffect(() => {

    const accessToken = localStorage.getItem('acccesToken')

    reviewAPI.getMyReviews('eyJhbGciOiJIUzI1NiJ9.NA.oeLKdo1U0E5x9a0N6_Gb3tOj8DZiucVe5Z7BNWwpfzc')
      .then((res) => {
        if (res) {
          dispatch(setReviewListSlice(res))
        }
      })
      .catch((error) => {
        console.log(error)
      })


  }, [])
  useEffect(() => {
    console.log(reviewList, 'reviewLidst')
  }, [reviewList])

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        {/* {reviewList.map((review) => {
          <p> {review}</p>
        })} */}
        <p></p>
      </div>
    </main>
  );
}
