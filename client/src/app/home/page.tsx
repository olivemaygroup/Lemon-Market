'use client'

import Image from "next/image";
import styles from "@/app/home/page.module.css";
import Search from "@/app/components/Landing/search";
import PropertyCard from "@/app/components/Landing/propertyCard";
import { useState } from "react";


export default function Home() {
  const [searchAddress, SetSearchAddress] = useState('')

  console.log(searchAddress)


  return (
    <main className={styles.main}>
        <Search></Search>
        <PropertyCard></PropertyCard>
        <PropertyCard></PropertyCard>
        <PropertyCard></PropertyCard>
    </main>
  );
}
