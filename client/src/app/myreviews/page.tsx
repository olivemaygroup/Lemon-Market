'use client'

import FullReview from "../components/PropertyDetail/fullReview"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { RootState } from "@/lib/store"
import * as React from 'react';
import { Review } from "../types/types"

let initilaState: Review;

function MyReviews () {
  const [item, setItem] = React.useState<Review>(initilaState)
  const temp = useSelector((state: RootState) => state.myReview.value)

  useEffect(()=>{
      setItem(temp[0])
      console.log('ITEM--', temp[0])
  },[])

  return (
    <div>
      {item? 
      <FullReview item={item} />:
      <div></div>}
    </div>
  )
}

export default MyReviews