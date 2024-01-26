import Image from "next/image";
import styles from "@/app/page.module.css";
import ReviewItem from "@/app/components/AddReview/reviewItem";



// localhost:3000/login

export default function addReview() {
  return (
    <main className={styles.main}>
    <div className={styles.description}>
      <p>
        Add a review
      </p>
    </div>
      <ReviewItem></ReviewItem>
  </main>
  );
}