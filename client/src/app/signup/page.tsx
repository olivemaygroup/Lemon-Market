"use client";
import Image from "next/image";
import styles from "@/app/signup/page.module.css";
import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import apiService from "../ApiServices/userAPI";


const initialError = {
  error: false,
  msg: "",
};
const initilaState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};
const Password = {
  name: "",
  value: "",
};

export default function Signup() {
  const [error, setError] = useState(initialError);
  const [state, setState] = useState(initilaState);
  const [password1, setPassword1] = useState(Password);
  const [passwordCheck, setPasswordCheck] = useState(Password);

  const passwordChecker = (password: string): boolean => {
    const regex = /^(?=.*[A-Z])(?=.*\d).+$/;
    if (password.length > 6 || regex.test(password)) {
      return true;
    } else {
      return false;
    }
  };

  const handleChange = (e: any) => {
    if (e.target.name !== "password2" || "password1") {
      const { name, value } = e.target;
      console.log(name, value);
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const resetStates = () => {
    setState(initilaState);
    setPassword1(Password);
    setPasswordCheck(Password)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const testWord = password1;
    if (
      password1.value === passwordCheck.value &&
      passwordChecker(testWord.value)
    ) {
      const { name, value } = testWord;
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else {
      const err = {
        error: true,
        msg: "passwords must be over 6 charators long, contain at least 1 number & 1 uppercase letter and they must match",
      };
      setError(err);
      return;
    }
    const newUser = state;
    const response= await apiService.signUp(newUser);
    if (response) {
      console.log('new profile --',response)
      if (response === 'User already exists, please sign in.') {
        resetStates();
        const err = {
          error: true,
          msg: "Error, User already exists",
        }; 
        console.log('ERROR---', err)
        setError(err);
      } else {
        console.log('RESPONSE---',response)
        resetStates();
        return response;
      }
    } 
  }


  return (
    <main className={styles.page}>
      <div className={styles.phone_box}>
        <h2 className={styles.h2}>Signup</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.input_div}>
            <label className={styles.input_lbl}>first name</label>
            <input
              onChange={handleChange}
              type="text"
              className={styles.input_feild}
              name="firstName"
              value={state.firstName}
            />
          </div>
          <div className={styles.input_div}>
            <label className={styles.input_lbl}>last name</label>
            <input
              onChange={handleChange}
              type="text"
              className={styles.input_feild}
              name="lastName"
              value={state.lastName}
            />
          </div>
          <div className={styles.input_div}>
            <label className={styles.input_lbl}>email</label>
            <input
              onChange={handleChange}
              type="email"
              className={styles.input_feild}
              name="email"
              value={state.email}
            />
          </div>
          <div className={styles.input_div}>
            <label className={styles.input_lbl}>password</label>
            <input
              onChange={(e) => {
                const newPass = { name: "password", value: e.target.value };
                setPassword1(newPass);
              }}
              type="password"
              className={styles.input_feild}
              name="password"
              value={password1.value}
            />
          </div>
          <div className={styles.input_div}>
            <label className={styles.input_lbl}>confirm password</label>
            <input
              onChange={(e) => {
                const newPass = { name: "password", value: e.target.value };
                setPasswordCheck(newPass);
              }}
              type="password"
              className={styles.input_feild}
              name="password2"
              value={passwordCheck.value}
            />
          </div>
          <div className={styles.div}>
            {error.error ? (
              <div className={styles.div}>
                <div className={styles.errorbox}>
                  {error.msg}
                  <button className={styles.btn} onClick={() => setError(initialError)}>OK</button>{" "}
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
