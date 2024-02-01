"use client";
import styles from "@/app/login/page.module.css";
import auth from "../utils/auth";
import apiService from "../ApiServices/apiServices";
import type { RootState } from "@/lib/store";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Error, Login } from "../types/types";

const initialError: Error = {
  error: false,
  msg: "",
};

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [error, setError] = useState<Error>(initialError)
  const router = useRouter();

  const tryLogin = async (e: any): Promise<any | null> => {
    e.preventDefault();
    const user: Login = {
      email: email,
      password: password,
    };
    const res:any= await apiService.login(user);
    if (res === 401) {
      const err: Error = {
        error: true,
        msg: "Login details incorrect or sign up here",
      }; 
      setError(err);
      setEmail("");
      setPasword("");
    } else {
      return res;
    }
    localStorage.setItem('accessToken', res.accessToken)
    setEmail("");
    setPasword("");
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
                setPasword(e.target.value);
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
                  <button className={styles.btn}>signup here</button>
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