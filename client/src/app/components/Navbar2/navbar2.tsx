'use client'
import styles from '@/app/components/Navbar2/page.module.css'
import logo from '../../public/TLM_Color_Landscape.jpg'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

import { useSelector } from 'react-redux'
import { FaRobot } from "react-icons/fa";


import { RootState } from '@/lib/store'

function NavBar2() {
  const [menu, setMenu] = useState<boolean>(false)
  const router = useRouter()
  const auth = useSelector((state: RootState) => state.auth.value);

  const burgerMenu = () => {
    const mCheck = !menu;
    setMenu(mCheck)
  }

  return (

    <div
      className={styles.body}>
      <img src={logo.src} alt="nooo" height='50px' onClick={() => router.push('/home')} />
      <div className={styles.newmenu}>
        {menu ?
          <div className={styles.menubox}>
            <div
              onClick={burgerMenu}
              className={styles.burgerbox}
            >
              <div className={styles.burgers}>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
                <div className={styles.bar}></div>
              </div>
            </div>
            {auth ?
              <div className={styles.links}>
                <Link className={styles.link} href="/home" onClick={() => setMenu(!menu)}>home</Link>
                <Link className={styles.link} href="/myprofile" onClick={() => setMenu(!menu)}>profile</Link>
                <Link className={styles.link} href="/chatbot" onClick={() => setMenu(!menu)}><FaRobot /></Link>
                <Link className={styles.link} href="/logout" onClick={() => setMenu(!menu)}>logout</Link>
              </div> :
              <div className={styles.links}>
                <Link className={styles.link} href="/home" onClick={() => setMenu(!menu)}>home</Link>
                <Link className={styles.link} href="/login" onClick={() => setMenu(!menu)}>login</Link>
                <Link className={styles.link} href="/signup" onClick={() => setMenu(!menu)}>sign up</Link>
              </div>}
          </div>
          : <div className={styles.nomenu}></div>}
      </div>
      <div
        onClick={burgerMenu}
        className={styles.burgerbox}
      >
        <div className={styles.burgers}>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
          <div className={styles.bar}></div>
        </div>
      </div>
      {auth ?
        <div className={styles.topmenu}>
          <Link className={styles.menuitem} onClick={() => setMenu(!menu)} href="/home">home</Link>
          <Link className={styles.menuitem} onClick={() => setMenu(!menu)} href="/myprofile">profile</Link>
          <Link className={styles.menuitem} onClick={() => setMenu(!menu)} href="/myreviews">my reviews</Link>
          <Link className={styles.menuitem} onClick={() => setMenu(!menu)} href="/logout">logout</Link>
        </div> :
        <div className={styles.topmenu}>
          <Link className={styles.menuitem} onClick={() => setMenu(!menu)} href="/home">home</Link>
          <Link className={styles.menuitem} onClick={() => setMenu(!menu)} href="/login">login</Link>
          <Link className={styles.menuitem} onClick={() => setMenu(!menu)} href="/signup">sign up</Link>
        </div>
      }
    </div>
  )
}

export default NavBar2