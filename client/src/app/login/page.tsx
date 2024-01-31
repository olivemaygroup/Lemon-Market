"use client";
import styles from "@/app/login/page.module.css";
import auth from "../utils/auth";
import apiService from "../ApiServices/apiServices";
import type { RootState } from "@/lib/store";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Error, Login } from "../types/types";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [error, setError] = useState<Error>()
  const router = useRouter();

  const tryLogin = async (e: any): Promise<any | null> => {
    e.preventDefault();
    const user: Login = {
      email,
      password,
    };
    const res:any= await apiService.login(user);
    console.log('res--', res)
    if (res === 409) {
      const err: Error = {
        error: true,
        msg: "Error, Login details incorrect",
      }; 
      setError(err);
      setEmail("");
      setPasword("");
    } else {
      return res;
    }
    localStorage.setItem('accessToken', res)
    setEmail("");
    setPasword("");
  };

  const clickGoogle = () => {};

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
                setPasword(e.target.value);
              }}
              type="password"
              className={styles.input_feild}
              name="password"
              value={password}
            />
          </div>
          <div className={styles.login_btns}>
            <button onClick={clickGoogle} className={styles.login}>
              Login
            </button>
            {/* <div className={styles.or}>
              <div className={styles.line}></div>
              <p className={styles.or_p}>or</p>
              <div className={styles.line}></div>
            </div>
            <button type="submit" className={styles.login}>
              Login with Google
            </button> */}
          </div>
        </form>
      </div>
    </main>
  );
}

// {"firstName":"kim","lastName":"kim","email":"kim@mail.com","accessToken":"eyJhbGciOiJIUzI1NiJ9.NA.oeLKdo1U0E5x9a0N6_Gb3tOj8DZiucVe5Z7BNWwpfzc"}