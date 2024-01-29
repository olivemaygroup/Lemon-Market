'use client'
import Image from "next/image";
import styles from "@/app/signup/page.module.css";
import { useEffect, useState } from "react";

// interface 
const initialError = {
  error: false,
  msg: ''  
}
const initilaState = {
  firstName: '',
  lastName: '',
  email: '',
  password: ''
}

export default function Signup() {

  const [error, setError] = useState(initialError)
  const [state, setState] = useState(initilaState)

  // useEffect(()=>{},[])

  let password1:any;
  let password2:string;

  const passwordChecker = (password1:string, password2:string) => {
    const regex = /^(?=.*[A-Z])(?=.*\d).+$/;
    if (password1 !== password2 || password1.length<6 || !regex.test(password1)) {
      return false;
    } else {
      return true;
    }
  }

  const handleChange = (e:any) => {
    if (e.target.name === password2) {
      if(passwordChecker(password1, password2)) {
        const { name, value } = e.target;
        setState((prevState)=> ({
          ...prevState,
          [name]: value,
        }))
      } else {
        const err = {
          error: true,
          msg: 'passwords must be over 6 charators long, contain at least 1 number & 1 uppercase letter and they must match'
        }
        setError(err)
        return;
      }
    } else {
      const { name, value } = e.target;
        console.log(name, value)
        setState((prevState)=> ({
          ...prevState,
          [name]: value,
        }))
    }
  }
  const handleSubmit = async (e:any) => {
    e.preventDefault();
    const newUser = state;

    console.log('form done --', newUser)
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
              onChange={(e)=>{password1 = e.target.value; handleChange}}
              type="password" 
              className={styles.input_feild} 
              name="password1"
              // value={state.password}
              />
          </div>
          <div className={styles.input_div}>
            <label className={styles.input_lbl}>confirm password</label>
            <input 
              onChange={(e)=>{password2 = e.target.value; handleChange}}
              type="password" 
              className={styles.input_feild} 
              name="password2"
              // value={password}
              />
          </div>
          <div className={styles.login_btns}>
            <button  className={styles.login}>Login</button>
          </div>
        </form>
        <div>
          {error.error? <div>{error.msg} <button onClick={()=>setError(initialError)}>OK</button> </div>: <div></div> }
        </div>
      </div>
    </main>
  );
}
