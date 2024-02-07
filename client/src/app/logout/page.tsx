'use client'
import styles from './page.module.css'
import logOut from '../ApiServices/userAPI'
import Link from 'next/link'
import { useRouter } from "next/navigation";
import { useDispatch } from 'react-redux';
import { changeAuthStatus } from '@/lib/features/authentication/authSlice';

export default function logout () {
  const router = useRouter()
  const dispatch = useDispatch()

  const handleClickLogout = async () => {
    await logOut.logOut();
    dispatch(changeAuthStatus(false))
    router.push('/home')
  }
    

  return (
    <div className={styles.backdrop}>
    <div className={styles.logout_div}>
      <p className={styles.logout_p}>Would you like to logout of your current sesion with us?</p>
      <button 
        className={styles.logout_button}
        onClick={handleClickLogout}
        >yes, my work here is done!</button>
      <button 
        className={styles.logout_button}
        ><Link className={styles.link} href="/home">no, take me back to my home page</Link></button>
    </div>
    </div>
  )
}