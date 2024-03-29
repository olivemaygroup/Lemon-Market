"use client";
import styles from "@/app/login/page.module.css";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Error, Login, UserType } from "../types/types";
import { setUserSlice } from "@/lib/features/user/userSlice";
import userAPI from "../ApiServices/userAPI";
import { changeAuthStatus } from "@/lib/features/authentication/authSlice";
import Link from "next/link";
// import { useRouter } from "next/router";

const initialError: Error = {
  error: false,
  msg: "",
};

export default function Login() {
  const dispatch = useDispatch()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<Error>(initialError)
  const router = useRouter();

  

  const tryLogin = async (e: React.SyntheticEvent): Promise<any | null> => {
    e.preventDefault();

    const user: Login = {
      email: email,
      password: password,
    };

    const res: any = await userAPI.login(user);
    console.log('RES login--',res)
    const currUser: UserType = {
      tenant_id: res.tenant_id,
      firstName: res.firstName,
      lastName: res.lastName,
      email: res.email
    }
    dispatch(setUserSlice(currUser))
    if (res === 401) {
      const err: Error = {
        error: true,
        msg: "Login details incorrect or sign up here",
      };
      setError(err);
      setEmail("");
      setPassword("");
      return
    } else if (res.error) {
      const err: Error = {
        error: true,
        msg: "Error logging in",
      };
      setError(err);
      setEmail("");
      setPassword("");
      return
    } else {
      dispatch(changeAuthStatus(true))
      if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', res.accessToken)
      }
      setEmail("");
      setPassword("");
      if (typeof window !== 'undefined') {
      const next = localStorage.getItem('next')
      router.push( next === '/addreview' ? '/addreview' : '/home')
      }
      if (typeof window !== 'undefined') {
      localStorage.removeItem('next')
      }
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.phone_box}>
        <h2 className="sub-title">Login</h2>
        <form onSubmit={tryLogin} className={styles.form}>
          <div className={styles.input_div}>
            <label className={styles.input_lbl}>email</label>
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              className={styles.input_feild}
              name="email"
              value={email}
            />
          </div>
          <div className={styles.input_div}>
            <label className={styles.input_lbl}>password</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              className={styles.input_feild}
              name="password"
              value={password}
            />
          </div>
          <div className={styles.div}>
            {error.error ? (
              <div className={styles.div}>
                <div className={styles.errorbox}>
                  {error.msg}
                  <button className={styles.btn} onClick={() => setError(initialError)}>OK</button>
                  <Link  className={styles.linkbtn} href="/signup">
                  <button className={styles.btn}>signup here</button>
                  </Link>
                  
                </div>
                <div className={styles.login_btns}>
                  <button className={styles.login}>Login</button>
                </div>
              </div>
            ) : (
              <div className={styles.login_btns}>
                <button className={styles.login}>Login</button>
              </div>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}

// {"firstName":"kim","lastName":"kim","email":"kim@mail.com","accessToken":"eyJhbGciOiJIUzI1NiJ9.NA.oeLKdo1U0E5x9a0N6_Gb3tOj8DZiucVe5Z7BNWwpfzc"}