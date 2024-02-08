"use client";
import styles from "@/app/signup/page.module.css";
import { useState } from "react";
import { NewUser, Error, UserType } from "../types/types";
import { useDispatch } from "react-redux";
import { setUserSlice } from "@/lib/features/user/userSlice";
import userAPI from "../ApiServices/userAPI";
import { passwordChecker } from "../ApiServices/apiServices";
import { useRouter } from "next/navigation";
import { changeAuthStatus } from "@/lib/features/authentication/authSlice";

const initialError: Error = {
  error: false,
  msg: "",
};
const initilaState: NewUser = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
};
const err: Error = {
  error: true,
  msg: "passwords must be over 6 charators long, contain at least 1 number & 1 uppercase letter and they must match",
};

export default function Signup() {
  const [error, setError] = useState(initialError);
  const [state, setState] = useState(initilaState);
  const [password1, setPassword1] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const router = useRouter();
  const dispatch = useDispatch();

  const handleChange : React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (e.target.name !== "password2"|| "password") {
      const { name, value } = e.target;
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const resetStates = () => {
    setState(initilaState);
    setPassword1('');
    setPasswordCheck('')
  }

  const handleSubmit = async (e: React.SyntheticEvent) => {
    if (typeof window !== 'undefined') {
    e.preventDefault();
    let newUser:NewUser = state
    if (passwordCheck===password1 && password1.length>=6) {
      newUser.password = password1
    } else {
      setError(err);
      console.log(err)
      return;
    }
    const response:any = await userAPI.signUp(newUser);
    if (response === 409) {
      const err: Error = {
        error: true,
        msg: "Error, User already exists",
      };
      resetStates();
      setError(err);
    } else {
      const currUser: UserType = {
        tenant_id: response.tenant_id,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email
      }
      dispatch(changeAuthStatus(true))
      dispatch(setUserSlice(currUser));
      localStorage.setItem('accessToken',response.accessToken);
      resetStates();
      const next = localStorage.getItem('next')
      router.push( next === '/addreview' ? '/addreview' : '/myprofile')
      localStorage.removeItem('next')
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
              className={styles.input_field}
              name="firstName"
              value={state.firstName}
            />
          </div>
          <div className={styles.input_div}>
            <label className={styles.input_lbl}>last name</label>
            <input
              onChange={handleChange}
              type="text"
              className={styles.input_field}
              name="lastName"
              value={state.lastName}
            />
          </div>
          <div className={styles.input_div}>
            <label className={styles.input_lbl}>email</label>
            <input
              onChange={handleChange}
              type="email"
              className={styles.input_field}
              name="email"
              value={state.email}
            />
          </div>
          <div className={styles.input_div}>
            <label className={styles.input_lbl}>password</label>
            <input
              onChange={(e)=>setPassword1(e.target.value)}
              type="password"
              className={styles.input_field}
              name="password"
              />
          </div>
          <div className={styles.input_div}>
            <label className={styles.input_lbl}>confirm password</label>
            <input
              onChange={(e) => setPasswordCheck(e.target.value)}
              onBlur={()=>{if(!passwordChecker(password1)) setError(err)}}
              type="password"
              className={styles.input_field}
              name="password2"
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
                  <button className={styles.login}>signup</button>
                </div>
              </div>
            ) : (
              <div className={styles.login_btns}>
                <button className={styles.login}>signup</button>
              </div>
            )}
          </div>
        </form>
      </div>
    </main>
  );
}
