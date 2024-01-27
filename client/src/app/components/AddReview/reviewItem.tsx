import Image from "next/image";
import styles from "@/app/page.module.css";

const ReviewItem = () => {
  return (
    <div className={styles.description}>
      <p>
        Review Item
      </p>
      <input placeholder="Add item"></input>
      
    </div>
  );
};

export default ReviewItem;
