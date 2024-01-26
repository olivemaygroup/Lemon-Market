import Image from "next/image";
import styles from "@/app/page.module.css";
import ReviewItem from "@/app/components/AddReview/reviewItem";



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