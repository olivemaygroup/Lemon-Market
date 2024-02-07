'use client'
import Image from "next/image";
import { FaRobot } from "react-icons/fa";
import Button from '@mui/material/Button'
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import DoDisturbOnIcon from '@mui/icons-material/DoDisturbOn';
import CancelIcon from '@mui/icons-material/Cancel';
import moment from 'moment'

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
import { useRouter } from "next/navigation";
import Link from "next/link";


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
  const router = useRouter()
  const property = useSelector((state: RootState) => state.property.value)
  const reviewList: Review[] = useSelector((state: RootState) => state.reviewList.value)
  const [showPopup, SetShowPopup] = useState(false)

  console.log('show popup console', showPopup)
  useEffect(() => {
    SetShowPopup(false)

  },[property, reviewList])
  
  
  const handleSignup = () => {
    router.push('/signup')
  }

  const handleClose = () => {
  SetShowPopup(!showPopup)
  }

 

  return (
    <>
    {showPopup &&
      <div className={styles.popupcontainer}>
       
        <div className={styles.popupdetails}>
        <div className={styles.closebutton}>
           <Box sx={{ '& > :not(style)': { m: 1 } }}>
            <Fab style={{backgroundColor: "#fae301"}} aria-label="add" onClick={handleClose}>
              <DoDisturbOnIcon 
              />
            </Fab>
          </Box>
        </div>
          <h2>review or save a property?</h2>
          <p>Please login or signup</p>
          <div className={styles.buttons}>
            <Link href='/login' className={styles.link}>Login</Link>
            <button className={styles.signup} onClick={handleSignup}>signup</button>
          </div>
        </div>

      </div>
      }

    <div data-testid="propertydetailcontainer" className={ styles.description}>
      <div data-testid="Address" className="address">
        <h2>{property.fullAddress}</h2>
      </div>
      <PropertyOverview data-testid="property-overview" reviewList={reviewList} property={property} SetShowPopup={SetShowPopup} showPopup={showPopup}/>
      <RatingDetail data-testid="rating-detail" reviewList={reviewList}/>
      {reviewList.map((item, index) => (
        <div key={index}>
          <h2 className={styles.reviewName}>{moment(item.t_end).format("MMM YY")} to {moment(item.t_start).format("MMM YY")}</h2>
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
      </>
  );
}
