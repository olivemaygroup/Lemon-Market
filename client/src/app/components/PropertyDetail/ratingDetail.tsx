import './ratingDetail.css'
import CustomizedRating from "../Rating/CustomizedRating";

const RatingDetail = () => {



  return (
    <div className="container">
      <div className="cleanliness">
      <div><h2>Cleanliness</h2><span><CustomizedRating /></span></div>
      </div>
      <div className="maintenance">
      <div><h2>Maintenance</h2><span><CustomizedRating /></span></div>
      </div>
      <div className="value">
      <div><h2>Value for money</h2><span><CustomizedRating /></span></div>
      </div>
      <div className="deposit">
      <div><h2>Deposit handling</h2><span><CustomizedRating /></span></div>
      </div>
      <div className="amenities">
      <div><h2>Amenities</h2><span><CustomizedRating /></span></div>
      </div>
      <div className="landlord">
      <div><h2>Landlord responsiveness</h2><span><CustomizedRating /></span></div>
        <div><h2>Cleanliness</h2><span><CustomizedRating /></span></div>
      </div>
      <div className="monthly">
        <div><h2>Rent PCM</h2><span><CustomizedRating /></span></div>
      </div>
      <div className="council">
        <div><h2>Council tax PCM</h2><span><CustomizedRating /></span></div>
      </div>
    </div>
  )
}

export default RatingDetail
