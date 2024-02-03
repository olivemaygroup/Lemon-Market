'use client'
import CottageIcon from '@mui/icons-material/Cottage';
import { RootState } from "@/lib/store"
import { useSelector, useDispatch } from "react-redux"
import { setUserSlice } from "@/lib/features/user/userSlice"
import styles from "./page.module.css"
import { Error, NewUser, UserType } from "../types/types"
import { PropertyType, PropertyTypeFull } from "../types/property-type";
import { useState, useEffect } from "react"
import { passwordChecker } from "../ApiServices/apiServices"
import userAPI from "../ApiServices/userAPI"
import ProperetyCardContainer from '../components/Landing/propertyCardContainer';
import FullReview from '../components/PropertyDetail/fullReview';
import favouriteAPIservice from '../ApiServices/favouritesAPI';
import reviewAPI from '../ApiServices/reviewAPI';
import { addFullProperty } from '@/lib/features/property/fullProperty';
import PropertyCard from '../components/Landing/propertyCard';


const initilaState: NewUser = {
  email: "",
  firstName: "",
  lastName: "",
  password: "",
};
const initialError: Error = {
  error: false,
  msg: "",
};
const err: Error = {
  error: true,
  msg: "passwords must be over 6 charators long, contain at least 1 number & 1 uppercase letter and they must match",
};

// const item: Review

export default function MyProfile () {
  // profile and update profile states...
  const [edit, setEdit] = useState<boolean>(false)
  const [state, setState] = useState(initilaState)
  const [password, setPassword] = useState('')
  const [passwordCheck, setPasswordCheck] = useState('')
  const [error, setError] = useState(initialError)
  // user's reviews states...
  const [favourites, setFavourites] = useState<PropertyType[] | null>(null)
  const [myReviews, setReviews] = useState<PropertyTypeFull[] | null>(null)


  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.value)
  const token1:string | null = localStorage.getItem('accessToken')
  const token: string = token1 as string

  useEffect(() => {
    favouriteAPIservice.getFavourites()
      .then((res) => {
        if (res) {
          setFavourites(res)
        }
      })
      .catch((error) => {
        console.log(error)
    })

    reviewAPI.getMyReviews()
      .then((res) => {
        if (res) {
          console.log('RES_',res)
          setReviews(res)
          // dispatch(addFullProperty(usersReviews))
          // console.log('USER REVIEWS', usersReviews)
        }
      }).catch((error) => {
        console.error(error)
    })
  }, [])

  const handleChange = (e: any) => {
    if (e.target.name !== "password2" || "password1") {
      const { name, value } = e.target;
      setState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const resetStates = () => {
    setState(initilaState);
    setPassword('');
    setPasswordCheck('')
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    let newUser:NewUser = state
    if (passwordCheck===password) {
      newUser.password = password
    } else {
      setError(err);
      console.log(err)
      return;
    }
    const currUser: UserType = {
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      email: newUser.email
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
      dispatch(setUserSlice(currUser));
      localStorage.setItem('accessToken',response.accessToken);
      resetStates();
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.profilebox}>
        <h2>{user.firstName}'s profile</h2>
        {!edit? (
          <div className={styles.editdiv}>
            <div className={styles.attname}>first name:<p className={styles.att}>{user.firstName}</p></div>
            <div className={styles.attname}> last name:<p className={styles.att}>{user.lastName}</p></div>
            <div className={styles.attname}>email:<p className={styles.att}>{user.email}</p></div>
            <button className={styles.profilebtn} onClick={()=>setEdit(!edit)}>edit profile</button>
          </div>):( 
            <form onSubmit={handleSubmit} className={styles.editdiv}>
          <div className={styles.attname}>first name : 
            <input 
            type="text" 
            className={styles.editinput} 
            onChange={handleChange} 
            name="firstName"
            value={state.firstName}
            placeholder={user.firstName}
          /></div>
          <div className={styles.attname}>last name : 
            <input 
            type="text" 
            className={styles.editinput} 
            onChange={handleChange} 
            name="lastName"
            value={state.lastName}
            placeholder={user.lastName}
          /></div>
          <div className={styles.attname}>email : 
            <input 
            type="email" 
            className={styles.editinput} 
            onChange={handleChange} 
            name="email"
            value={state.email}
            placeholder={user.email}
          /></div>
          <div className={styles.attname}>password : 
            <input 
            type="password" 
            className={styles.editinput} 
            onChange={(e)=>setPassword(e.target.value)} 
            name="password1"
          /></div>
          <div className={styles.attname}> confrim password : 
            <input 
            type="password" 
            className={styles.editinput} 
            onChange={(e) => setPasswordCheck(e.target.value)}
            onBlur={()=>{if(!passwordChecker(password)) setError(err)}} 
            name="password2"
          /></div>
          
          <button className={styles.profilebtn} type="submit">submit changes</button>
          <button className={styles.profilebtn} onClick={()=>setEdit(!edit)} >back</button>
          </form>
        )}
      </div>
      <div className={styles.divide}>
          <div className={styles.divideline}></div><CottageIcon style={{ fill: '#fae301'}}/><div className={styles.divideline}></div>
      </div>
        <h2>{user.firstName}'s reviews</h2>
      <div className={styles.reviews}>
          <div className={styles.swipebox}>
            {myReviews?.map((review)=>(
              <PropertyCard fullProperty={review}/>
            ))}
          </div>
      </div>
      <div className={styles.divide}>
          <div className={styles.divideline}></div><CottageIcon style={{ fill: '#fae301'}}/><div className={styles.divideline}></div>
      </div>
        <h2>{user.firstName}'s favourites</h2>
      <div className={styles.reviews}>
          <div className={styles.swipebox}>
            {/* <FullReview/> */}
          </div>

      </div>
    </div>
  )
}