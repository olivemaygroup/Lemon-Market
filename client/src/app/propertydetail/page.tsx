'use client'
import Image from "next/image";
import { FaRobot } from "react-icons/fa";
import Link from 'next/link'
import Button from '@mui/material/Button'


import styles from "@/app/propertydetail/page.module.css";
import './page.module.css'
import TopImageScroll from "@/app/components/PropertyDetail/propertyOverview";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import reviewAPI from "../ApiServices/reviewAPI";
import { setReviewListSlice } from "@/lib/features/review/addReviewSlice";
import PropertyOverview from "@/app/components/PropertyDetail/propertyOverview";
import FullReview from "@/app/components/PropertyDetail/fullReview";
import RatingDetail from "../components/PropertyDetail/ratingDetail";
import { Review } from '@/app/types/review-types';
import AddReview from "../components/PropertyDetail/addReview";
import { Popover } from "@blueprintjs/core";


export default function PropertyDetail() {
  const dispatch = useDispatch();

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handlePopoverInteraction = (nextOpenState: boolean) => {
    setIsPopoverOpen(nextOpenState);
  };

  const chatBotPopUpText = 'Click me again to speak to an helpful AI assistant about any of your housing issues'

  const chatBotHandler = () => {
    // if (true){

    // }
  }

  const property = useSelector((state: RootState) => state.property.value)
  const reviewList: Review[] = useSelector((state: RootState) => state.reviewList.value)

  // useEffect(() => {

  //   const accessToken = localStorage.getItem('acccesToken')

  //   reviewAPI.getMyReviews()
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
    <div data-testid="propertydetailcontainer" className={styles.description}>
      <div data-testid="Address" className="address">
        <h2>{property.fullAddress}</h2>
      </div>
      <PropertyOverview data-testid="property-overview" reviewList={reviewList} />
      <RatingDetail data-testid="rating-detail" reviewList={reviewList} />
      {reviewList.map((item, index) => (
        <div key={index}>
          <h2 className={styles.reviewName}>Joe Bloggs review: Jan 22</h2>
          <FullReview item={item} />
        </div>
      ))}
      <Popover
        onInteraction={handlePopoverInteraction}
        isOpen={isPopoverOpen}
        placement={'right-end'}
        content={
          <div className={styles.chat_bot_popup}>
            <p>{chatBotPopUpText}</p>
            <Link className={styles.link} href="/chatbot">
              <Button className={styles.chat_bot_link} variant="contained">AI Chat Bot </Button>
            </Link>
          </div>
        }
      >
        <button className={styles.robot_button_container}>
          <FaRobot className={styles.robot_icon} />
        </button>
      </Popover>
    </div >
  );
}
