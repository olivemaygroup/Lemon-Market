import React, {useState} from 'react'
import { Review } from "@/app/types/types";

interface TenancyDurationPropsInterface {
  dbReviewObject: Review
}
const TenancyDuration: React.FC<TenancyDurationPropsInterface> = ({ dbReviewObject }) => {

  const [tenancyStart, setTenancyStart] = useState("")
  const [tenancyEnd, setTenancyEnd] = useState("")

  dbReviewObject.t_start = tenancyStart
  dbReviewObject.t_end = tenancyEnd
  
  return (
    <form>
      <h2>Tenancy Dates</h2>
      <div>
      <p>Tenancy Start Date:</p>
      <input
      type="date"
      name="tenancy-start"
      className="input"
      placeholder="When did your tenancy start?"
      onChange={(event) => {setTenancyStart(event.target.value)}}
      />
      </div>
      <div>
      <p>Tenancy End Date:</p>
        <input
        type="date"
        name="tenancy-end"
        className="input"
        placeholder="When did your tenancy end?"
        onChange={(event) => {setTenancyEnd(event.target.value)}}
        />
      </div>    
    </form>
  )
}

export default TenancyDuration;