import './ratingDetail.css'
import ReadonlyRating from './readonlyRating'
import { Review } from '@/app/types/review-types';
import {
  cleanlinessRating,
  maintenanceRating,
  valueRating,
  depositRating,
  amenitiesRating,
  landlordRating,
  rentRating,
  councilRating,


} from './ratingCalculations';

const RatingDetail = ({ reviewList }: {reviewList: Review[]}) => {

  console.log('reviewList at detail',reviewList)
  let cleanlinessAverage = cleanlinessRating(reviewList)
  let maintenanceAverage = maintenanceRating(reviewList)
  let valueAverage = valueRating(reviewList)
  let depositAverage = depositRating(reviewList)
  let amenitiesAverage = amenitiesRating(reviewList)
  let landlordAverage = landlordRating(reviewList)
  let rentAverage = rentRating(reviewList)
  let councilAverage = councilRating(reviewList)

  console.log('Cleanliness at rating detail', cleanlinessAverage)
  console.log('maintenance at rating detail', maintenanceAverage)
  console.log('value at rating detail', valueAverage)
  console.log('deposit at rating detail', depositAverage)

  return (
    <div className="container">
      <div className="cleanliness">
        <div><h2>Cleanliness</h2><span><ReadonlyRating rating={cleanlinessAverage} /></span></div>
      </div>
      <div className="maintenance">
       <div><h2>Maintenance</h2><span><ReadonlyRating rating={maintenanceAverage} /></span></div>
      </div>
      <div className="value">
       <div><h2>Value for money</h2><span><ReadonlyRating rating={valueAverage} /></span></div>
      </div>
      <div className="deposit">
        <div><h2>Deposit handling</h2><span><ReadonlyRating rating={depositAverage} /></span></div>
      </div>
      <div className="amenities">
       <div><h2>Amenities</h2><span><ReadonlyRating rating={amenitiesAverage} /></span></div>
      </div>
      <div className="landlord">
       <div><h2>Landlord responsiveness</h2><span><ReadonlyRating rating={landlordAverage} /></span></div>
      </div>
      <div className="monthly">
        <div><h2>Rent PCM</h2><span>{rentAverage}</span></div>
      </div>
      <div className="council">
        <div><h2>Council tax PCM</h2><span>{councilAverage}</span></div>
      </div>
    </div>
  )
}

export default RatingDetail
