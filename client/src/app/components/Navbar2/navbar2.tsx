'use client'
import styles from '@/app/components/Navbar2/page.module.css'
import logo from '../../public/TLM_Color_Landscape.jpg'

// { <img src={logo.src} alt="nooo" height='50px'/>}
function NavBar2 () {

  return (
        
    <div className={styles.body}>
      <img src={logo.src} alt="nooo" height='50px'/>
      <div className={styles.burgerbox}>
          <div className={styles.burgers}>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
            <div className={styles.bar}></div>
          </div>
        </div>
      <div className={styles.topmenu}>
        <div className={styles.menuitem}>profile</div>
        <div className={styles.menuitem}>my reviews</div>
        <div className={styles.menuitem}>logout</div>
      </div>
    </div>
  )
}

export default NavBar2