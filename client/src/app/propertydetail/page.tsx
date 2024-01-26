import Image from "next/image";
import styles from "@/app/page.module.css";
import TopImageScroll from "@/app/components/PropertyDetail/topImageScroll";

export default function PropertyDetail() {
  return (
    <main className={styles.main}>
      <TopImageScroll></TopImageScroll>
    <div className={styles.description}>
      <p>
        Property Detail
      </p>
    </div>
    </main>
  );
}
