'use client'
import Image from "next/image";
import styles from "@/app/page.module.css";


import type { RootState } from '@/lib/store'
import { useSelector, useDispatch } from "react-redux";
import { increment } from "@/lib/features/counter/counterSlice";



export default function Login() {
  
  
  const count = useSelector((state: RootState) => state.counter.value)
  const dispatch = useDispatch()

  return (
    <main className={styles.main}>
    <div className={styles.description}>
      <p>
        Login page
      </p>
      <span>{count}</span>
      <button 
          className={styles.button}
          onClick={() => dispatch(increment())}
          >Icrement
        </button>
    </div>
  </main>
  );
}
