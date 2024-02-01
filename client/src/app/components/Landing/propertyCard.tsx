'use client'

import styles from "@/app/components/Landing/page.module.css";
import * as React from 'react';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { RootState } from "@/lib/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Link from 'next/link'
import checkAddress from "@/app/ApiServices/propertyAPI";
import { addProperty } from "@/lib/features/property/propertySlice";
import { PropertyType } from "@/app/types/property-type";
import ReviewCard from "./reviewCard";
import NoReviewsCard from "./noReviewsCard";



const ProperetyCard = () => {
  const dispatch = useDispatch();

  const fullProperty = useSelector((state: RootState) => state.fullProperty.value)

  return (
    <>
      {
        fullProperty.num_of_reviews ? (
          <>
            <ReviewCard />
          </>
        ) : (
          <NoReviewsCard />
        )
      }
    </>
  );
};

export default ProperetyCard;
