import Image from "next/image";
import styles from "@/app/page.module.css";


// this is the landing page and at localhost:3000/

export default function Loading() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Spinner
        </p>
      </div>
      
    </main>
  );
}
