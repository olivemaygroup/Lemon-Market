'use client'
import { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import styles from './page.module.css'
import { PropertyTypeFull } from '@/app/types/property-type';
import house from '../../../../public/Screenshot 2024-02-03 141600.png'
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { UserType } from '@/app/types/types';
import { Review } from '@/app/types/review-types';
import { setMyReview } from '@/lib/features/user/myReviewSlice';


const MyTiles = ({ review, user }: { review: PropertyTypeFull, user: UserType }) => {

  const [profilePhoto, setProfilePhoto] = useState<string>(house.src);

  const dispatch = useDispatch()
  const router = useRouter()

  const handleClick = () => {
    const filteredRes: Review[] = review.reviews.filter((rev) => rev.tenant_id === user.tenant_id)
    dispatch(setMyReview(filteredRes))
    router.push('/myreviews')
  }
  useEffect(() => {
    if (review.reviews[0].photos.length > 0) {
      const generalPhotoArray = review.reviews[0].photos.filter(photo => {
        if (photo.tag === 'General') return true;
      })
      setProfilePhoto(generalPhotoArray[0].url)
    }
  })

  return (
    <div
      className={styles.prop_box}
      key={review.property_id}
      onClick={handleClick}>
      <img className={styles.prop_pic} src={profilePhoto} alt='' />
      <div className={styles.prop_rightside}>
        <div className={styles.prop_address} >{review.fullAddress}</div>
        <Rating className={styles.prop_rate} size="small" name="read-only" value={review.avg_rating} readOnly />
      </div>
    </div>
  )
}

export default MyTiles