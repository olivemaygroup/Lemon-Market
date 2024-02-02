'use client'

import ReviewCard from "../components/Landing/propertyCard";
import reviewAPI from "../ApiServices/reviewAPI";
import { RootState } from "@/lib/store";
import { useEffect, useState } from "react";
import { Review } from "../types/review-types";

import { useDispatch, useSelector } from "react-redux";
import { setReviewListSlice } from "@/lib/features/review/addReviewSlice";
import favouriteAPIservice from "../ApiServices/favouritesAPI";
import { PropertyType } from "../types/property-type";
import PropertyCard from "../components/Landing/propertyCard";
import FullReview from "../components/PropertyDetail/fullReview";



const profileReviewsPropertyContainer = () => {
  const dispatch = useDispatch();

  const property = useSelector((state: RootState) => state.property.value)

  const [favourites, setFavourites] = useState<PropertyType[] | null>(null)
  const [reviews, setReviews] = useState<Review[] | null>(null)

  useEffect(() => {
    favouriteAPIservice.getFavourites()
      .then((res) => {
        if (res) {
          setFavourites(res)
        }
      })
      .catch((error) => {
        console.log(error)
      })

    reviewAPI.getMyReviews()
      .then((res) => {
        if (res) {
          setReviews(res)
        }
      }).catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div>
      <h1> Favourites: </h1>
      {favourites && favourites.map(property => (
        <PropertyCard key={property.property_id} fullProperty={property} />
      ))}
      <h2> My Reviews: </h2>
      {reviews && reviews.map((item, index) => (
        <div key={index}>
          <FullReview item={item} />
        </div>
      ))}
    </div>
  );
}

export default profileReviewsPropertyContainer