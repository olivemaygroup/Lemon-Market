'use client'

import Image from "next/image";
import styles from "@/app/page.module.css";
import ReviewItem from "@/app/components/AddReview/reviewItem";

import ReviewItem from "@/app/components/AddReview/reviewItem";
import StoreProvider from "../StoreProvider";
import { useSelector, useDispatch } from "react-redux";
import { cleanliness, landlord } from "@/lib/features/review/addReviewSlice";
import { RootState } from "@/lib/store";



const review = useSelector((state: RootState) => state.addReview)
const dispatch = useDispatch()

// localhost:3000/login

export default function Cleanliness() {
  return (
    <main className={styles.main}>
    <div className={styles.description}>
      <p>
        Add cleanliness
      </p>
    </div>
      <ReviewItem></ReviewItem>
  </main>
  );
}