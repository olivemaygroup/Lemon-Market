'use client'
import Image from "next/image";
import styles from "@/app/home/page.module.css";
import Search from "@/app/components/Landing/search";
import PropertyCard from "@/app/components/Landing/propertyCard";
import { useState, useEffect, use } from "react";
import { RootState } from "@/lib/store";
import { useSelector, useDispatch } from "react-redux";
import checkAddress from "../ApiServices/propertyAPI";
import { setReviewListSlice } from "@/lib/features/review/addReviewSlice";
import { addFullProperty } from "@/lib/features/property/fullProperty";
import { PropertyType } from "../types/property-type";

import Link from 'next/link'
import StoreProvider from "@/app/StoreProvider";

export default function Home() {
  const dispatch = useDispatch();
  const property = useSelector((state: RootState) => state.property.value);
  const [showProperty, SetShowProperty] = useState(false)

  useEffect(() => {
    SetShowProperty(property.fullAddress !== '' && property.property_id !== '')
  }, [property])

  useEffect(() => {
    //currently check address does add the property if it exists - but we can change that to only occur when review happens
    checkAddress(property).then((response) => {
      if (response?.reviews) {
        dispatch(setReviewListSlice(response.reviews))
        console.log(response)
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
      {showProperty &&
        <PropertyCard
        ></PropertyCard>
      }
    </main>
  );
}