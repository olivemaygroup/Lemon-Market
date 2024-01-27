import Image from "next/image";
import styles from "@/app/page.module.css";
import ReviewItem from "@/app/components/AddReview/reviewItem";

export default function Landlord() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Add landlord</p>
      </div>
      <ReviewItem></ReviewItem>
    </main>
  );
}
