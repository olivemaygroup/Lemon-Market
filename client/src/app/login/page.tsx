'use client'
import Image from "next/image";
import styles from "@/app/login/page.module.css";
import { useSession, signIn, signOut } from "next-auth/react";

import type { RootState } from '@/lib/store'
import { useSelector, useDispatch } from "react-redux";
import { increment } from "@/lib/features/counter/counterSlice";
import { useState } from "react";

type EmailType = string;
type PasswordType = string;

export default function Login () {
  const [email, setEmail] = useState<EmailType>('')
  const [password, setPasword] = useState<PasswordType>('')
  

  const tryLogin = async (e:any): Promise <any> => {
    e.preventDefault();
    const user: { email: EmailType, password: PasswordType } = {
      email, password
    }
    const response = await fetch('http://localhost:3000/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const profile = await response.json();
    if (!response.ok) {
      console.log('Login error--',profile.error)
    }
    if (response.ok) {
      console.log('login successful')
    }
    setEmail('')
    setPasword('')
  }


  const clickGoogle = () => {

  }

  return (
  <main className={styles.page}>
    <div className={styles.phone_box}>
      <h2 className="sub-title">Login</h2>
      <form onSubmit={tryLogin} className={styles.form}>
        <div className={styles.input_div}>
          <label className={styles.input_lbl}>email</label>
          <input 
            onChange={(e)=>{setEmail(e.target.value)}}
            type="email" 
            className={styles.input_feild} 
            name="email"
            value={email}
            />
        </div>
        <div className={styles.input_div}>
          <label className={styles.input_lbl}>password</label>
          <input 
            onChange={(e)=>{setPasword(e.target.value)}}
            type="password" 
            className={styles.input_feild} 
            name="password"
            value={password}
            />
        </div>
        <div className={styles.login_btns}>
          <button onClick={clickGoogle} className={styles.login}>Login</button>
          <div className={styles.or}>
            <div className={styles.line}></div>
            <p className={styles.or_p}>or</p>
            <div className={styles.line}></div>
          </div>
          <button type="submit" className={styles.login}>Login with Google</button>
        </div>
      </form>
    </div>
  </main>
  );
}
