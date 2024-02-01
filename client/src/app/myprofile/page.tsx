'use client'
import { RootState } from "@/lib/store"
import { useSelector, useDispatch } from "react-redux"
import { setUserSlice } from "@/lib/features/user/userSlice"
import styles from "./page.module.css"
import { Error, NewUser, Password, UserType } from "../types/types"
import { useState } from "react"

const initilaState: NewUser = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
};
const initPassword: Password = {
  name: "",
  value: "",
};
const initialError: Error = {
  error: false,
  msg: "",
};

export default function MyProfile () {
  const [edit, setEdit] = useState<boolean>(false)
  const [state, setState] = useState(initilaState)
  const [password, setPassword] = useState(initPassword)
  const [passwordCheck, setPasswordCheck] = useState(initPassword)
  const [error, setError] = useState(initialError)

  const user: UserType = {
    firstName: 'steve',
    lastName: 'mcstehead',
    email: 'mcste@mail.com',
    accessToken: 'stestoken'
  }

  const handleChange = (e:any) => {

  }
  
  // const user = useSelector((state: RootState) => state.user.value)
  // console.log('USER--', user)

  return (
    <div className={styles.page}>
      <div className={styles.profilebox}>
        <h2>{user.firstName}'s profile</h2>
        {!edit? (
          <div className={styles.editdiv}>
        <div className={styles.attname}>first name :<p className={styles.att}>{user.firstName}</p></div>
        <div className={styles.attname}> last name :<p className={styles.att}>{user.lastName}</p></div>
        <div className={styles.attname}>email :<p className={styles.att}>{user.email}</p></div>
        <button className={styles.profilebtn} onClick={()=>setEdit(!edit)}>edit profile</button>
        </div>):( 
          <form className={styles.editdiv}>
        <div className={styles.attname}>first name : 
          <input 
          type="text" 
          className={styles.editinput} 
          onChange={(e)=>{handleChange}} 
          name="firstName"
          value={state.lastName}
          placeholder={user.firstName}
        /></div>
        <div className={styles.attname}>last name : 
          <input 
          type="text" 
          className={styles.editinput} 
          onChange={(e)=>{handleChange}} 
          name="lastName"
          value={state.lastName}
          placeholder={user.lastName}
        /></div>
        <div className={styles.attname}>email : 
          <input 
          type="email" 
          className={styles.editinput} 
          onChange={(e)=>{handleChange}} 
          name="email"
          value={state.email}
          placeholder={user.email}
        /></div>
        <div className={styles.attname}>password : 
          <input 
          type="password" 
          className={styles.editinput} 
          onChange={(e)=>{
            const newPass = { name: "password", value: e.target.value };
            setPassword(newPass);
          }} 
          name="password1"
          value={password.value}
        /></div>
        <div className={styles.attname}> confrim password : 
          <input 
          type="password" 
          className={styles.editinput} 
          onChange={(e)=>{
            const newPass = { name: "password", value: e.target.value };
            setPasswordCheck(newPass);
          }} 
          name="password2"
          value={passwordCheck.value}
        /></div>
        
        <button className={styles.profilebtn} onClick={()=>setEdit(!edit)}>submit changes</button>
        </form>
        )}
      </div>
      <div className={styles.divide}>
          <div className={styles.divideline}></div>C<div className={styles.divideline}></div>
      </div>
      <div>
        <h2>{user.firstName}'s reviews</h2>
      </div>
      <div className={styles.divide}>
          <div className={styles.divideline}></div>C<div className={styles.divideline}></div>
      </div>
      <div>
        <h2>{user.firstName}'s favourites</h2>
      </div>
    </div>
  )
}