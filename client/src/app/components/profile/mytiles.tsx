'use client'
import Rating from '@mui/material/Rating';
import styles from './page.module.css'
import { PropertyTypeFull } from '@/app/types/property-type';
import house from '../../../../public/Screenshot 2024-02-03 141600.png'
import { useRouter } from 'next/navigation';


const MyTiles = ({ review }: {review: PropertyTypeFull}) => {
  const router = useRouter()

  return (
    <div 
      className={styles.prop_box} 
      key={review.property_id}
      onClick={()=>router.push('/propertydetail')}>
      <img className={styles.prop_pic} src={house.src} alt='' />
      <div className={styles.prop_rightside}>
        <div className={styles.prop_address} >{review.fullAddress}</div>
        <Rating className={styles.prop_rate} size="small" name="read-only" value={review.avg_rating} readOnly />
      </div>
    </div>
  )
}

export default MyTiles