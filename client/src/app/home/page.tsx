'use client'

import Image from "next/image";
import styles from "@/app/home/page.module.css";
import Search from "@/app/components/Landing/search";
import PropertyCard from "@/app/components/Landing/propertyCard";
import { useState, useEffect, use } from "react";
import { RootState } from "@/lib/store";
import { useSelector } from "react-redux";
import Link from 'next/link'

import StoreProvider from "@/app/StoreProvider";

export default function Home() {

  let stateAddress = useSelector((state: RootState) => state.addAddress);

  const [showProperty, SetShowProperty] = useState(false)

  useEffect(() => {
    SetShowProperty(stateAddress.description !== '' && stateAddress.place_id !== '')
  },[stateAddress])

  return (
    
    <main className={styles.main}>
        <Search></Search>
        { showProperty && 
        <PropertyCard
        

        ></PropertyCard>
        }
    </main>
  );
}
