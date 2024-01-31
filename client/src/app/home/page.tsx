'use client'

import Image from "next/image";
import styles from "@/app/home/page.module.css";
import Search from "@/app/components/Landing/search";
import PropertyCard from "@/app/components/Landing/propertyCard";
import { useState } from "react";

import StoreProvider from "@/app/StoreProvider";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store";

export default function Home() {

  const address  = useSelector((state: RootState) => state.address) 

  // console.log(searchAddress)


  return (
    <main className={styles.main}>
        <Search></Search>
        <PropertyCard></PropertyCard>
    </main>
  );
}
