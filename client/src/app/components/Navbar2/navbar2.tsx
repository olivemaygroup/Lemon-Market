'use client'
import styles from '@/app/components/Navbar2/page.module.css'
import logo from '../../public/TLM_Color_Landscape.jpg'
import { useState } from 'react'
import Link from 'next/link'

function NavBar2 () {
  const [menu, setMenu] = useState<boolean>(false)

  const burgerMenu = () => {
    const mCheck = !menu;
    setMenu(mCheck)
  }

  return (
        
    <div className={styles.body}>
      <img src={logo.src} alt="nooo" height='50px'/>
      <div className={styles.newmenu}>
        {menu? 
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
        <div className={styles.links}>
          <Link className={styles.link} href="/home">home</Link>
          <Link className={styles.link} href="/myprofile">profile</Link>
          <Link className={styles.link} href="/myreviews">my reviews</Link>
          <Link className={styles.link} href="/logout">logout</Link>
        </div>
      </div>
         : <div className={styles.nomenu}></div> }
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
      <div className={styles.topmenu}>
        <Link className={styles.menuitem} href="/home">home</Link>
        <Link className={styles.menuitem} href="/myprofile">profile</Link>
        <Link className={styles.menuitem} href="/myreviews">my reviews</Link>
        <Link className={styles.menuitem} href="/logout">logout</Link>
      </div>
    </div>
  )
}

export default NavBar2