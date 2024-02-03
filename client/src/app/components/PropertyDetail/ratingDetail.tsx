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

  const cleanlinessAverage = cleanlinessRating(reviewList)
  const maintenanceAverage = maintenanceRating(reviewList)
  const valueAverage = valueRating(reviewList)
  const depositAverage = depositRating(reviewList)
  const amenitiesAverage = amenitiesRating(reviewList)
  const landlordAverage = landlordRating(reviewList)
  const rentAverage = rentRating(reviewList)
  const councilAverage = councilRating(reviewList)

  console.log('Cleanliness at rating detail', cleanlinessAverage)
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
        <div><h2>Rent PCM</h2><span><ReadonlyRating rating={rentAverage} /></span></div>
      </div>
      <div className="council">
        <div><h2>Council tax PCM</h2><span><ReadonlyRating rating={councilAverage} /></span></div>
      </div>
    </div>
  )
}

export default RatingDetail
