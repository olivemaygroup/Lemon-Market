"use client";

import Image from "next/image";
import styles from "@/app/page.module.css";
import type { RootState } from "@/lib/store";
import {
  increment,
  decrement,
  incrementByAmout,
} from "@/lib/features/counter/counterSlice";
import { useSearchParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { useDebugValue } from "react";
import Link from "next/link";
import Home from '@/app/home/page'
import { useState } from "react";


export default function Loading() {

  const [loading, SetLoading] = useState(true)
  // State setup: change to state of property search#

  // const count = useSelector((state: RootState) => state.counter.value)
  // const review = useSelector((state: RootState) => state.addReview)
  // const dispatch = useDispatch()

  return (
    <main className={styles.main}>
      {loading ? 
        <p>Spinner to add back in</p>
        : 
        <Home></Home>
      }
    </main>
  );
}
