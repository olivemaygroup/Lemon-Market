'use client'
import logo from '../../../public/icons/TLM-icon-152x152.jpg'
import styles from "@/app/home/page.module.css";
import Search from "@/app/components/Landing/search";
import { useState, useEffect, use } from "react";
import { RootState } from "@/lib/store";
import { useSelector, useDispatch } from "react-redux";
import checkAddress from "../ApiServices/propertyAPI";
import { setReviewListSlice } from "@/lib/features/review/addReviewSlice";
import { addFullProperty } from "@/lib/features/property/fullProperty";
import { PropertyType } from "../types/property-type";
import Image from 'next/image';
import { FaRobot } from 'react-icons/fa';
import comfortableHome from '../../../public/comfortable-home.jpg'
import home from '../../../public/home.png'
import bot from '../../../public/icons/Screenshot 2024-02-07 141245.png'
import Link from 'next/link'
import ProperetyCardContainer from "@/app/components/Landing/propertyCardContainer";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()
  const dispatch = useDispatch();
  const property = useSelector((state: RootState) => state.property.value);
  const [showProperty, setShowProperty] = useState(false)

  useEffect(() => {
    //currently check address does add the property if it exists - but we can change that to only occur when review happens
    setShowProperty(property.fullAddress !== '' && property.property_id !== '')

    checkAddress(property).then((response) => {
      localStorage.setItem('property_id', property.property_id)
      if (response?.num_of_reviews !== 0 && response?.reviews) {
        dispatch(setReviewListSlice(response.reviews))
        const propertyWithoutReviews: PropertyType = { fullAddress: response.fullAddress, property_id: response.property_id, num_of_reviews: response.num_of_reviews, avg_rating: response.avg_rating }
        dispatch(addFullProperty(propertyWithoutReviews))
      } else if (response) {
        dispatch(addFullProperty(response))
      }
    })
  }, [property])

  return (
    <main className={styles.main}>
      <Search></Search>
      <div className={styles.backdrop}>
        <Image 
        className={styles.logo} 
        src={comfortableHome} 
        alt="Comfortable home image with open plan living area. Sofa, cushions, rug. One wall is a window overlooking city. Paintings on the wall are Modgiliani and Pre-raphaelite. There are lemons on a round dining room table, door and cupboards are wood" />
      </div>
      {showProperty &&
        <ProperetyCardContainer />
      }
      <div 
      onClick={()=>router.push("/chatbot")}
        className={styles.robot_box}>
        <img className={styles.bot_face} src={bot.src} alt="" /> 
      </div>
    </main>
  );
}