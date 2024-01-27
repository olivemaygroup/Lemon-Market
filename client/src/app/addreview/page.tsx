'use client'
import { useState } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { cleanliness, landlord } from '@/lib/features/review/addReviewSlice'; // Adjust the path based on your project structure
import { RootState } from '@/lib/store';
import { useSelector } from 'react-redux';
import styles from '@/app/page.module.css';
import StoreProvider from '../StoreProvider';

export default function addReview() {

  const review = useSelector((state: RootState) => state.addReview)
  const [cleanlinessComment, setCleanlinessComment] = useState('');
  const [landlordComment, setLandlordComment] = useState('');
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.value)

  const handleFormSubmit = (event: onClick) => {
    event.preventDefault();
    
    dispatch(cleanliness(cleanlinessComment));
    dispatch(landlord(landlordComment));

    setCleanlinessComment('');
    setLandlordComment('');
  };

  return (
    <main className={styles.main}>

      <div className={styles.description}>
        <p>
          Add a review
        </p>
      </div>
      <span>{count}</span>
      <div>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="cleanliness">Cleanliness</label>
          <input 
            id="cleanliness" 
            type='text' 
            placeholder="Add cleanliness comment" 
            value={cleanlinessComment} 
            onChange={(e) => setCleanlinessComment(e.target.value)}
            />
          <label htmlFor="landlord">Landlord</label>
          <input 
            id="landlord" 
            type='text' 
            placeholder="Add landlord comment" 
            value={landlordComment} 
            onChange={(e) => setLandlordComment(e.target.value)}
            />
          <button type="submit">Submit</button>
        </form>
      </div>
      <ul>
        <li>{review.cleanliness}</li>
        <li>{review.landlord}</li>
      </ul>
    </main>
  );
}
