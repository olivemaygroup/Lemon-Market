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

// this is the landing page and at localhost:3000/

export default function Loading() {
  const count = useSelector((state: RootState) => state.counter.value);
  const review = useSelector((state: RootState) => state.addReview);
  const dispatch = useDispatch();

  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <button className={styles.button} onClick={() => dispatch(increment())}>
          Icrement
        </button>
        <span>{count}</span>
        <span>{review.cleanliness}</span>
        <span>{review.landlord}</span>
        <button className={styles.button} onClick={() => dispatch(decrement())}>
          Decrement
        </button>
        <button
          className={styles.button}
          onClick={() => dispatch(incrementByAmout(2))}
        >
          Icrement by 2
        </button>
        <Link href="http://localhost:3000/login">login</Link>
        <Link href="http://localhost:3000/addreview">add review</Link>
      </div>
    </main>
  );
}
