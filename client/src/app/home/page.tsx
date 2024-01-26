import Image from "next/image";
import styles from "@/app/page.module.css";
import Search from "@/app/components/Landing/search"
import PropertyCard from "@/app/components/Landing/propertyCard";


// this is the landing page and at localhost:3000/

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>
          Landing page
        </p>
      </div>
      <Search></Search>
      <PropertyCard></PropertyCard>
    </main>
  );
}
