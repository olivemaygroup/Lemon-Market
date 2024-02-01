import React, { useState } from 'react'
import { Review } from "@/app/types/types";

interface RentBillsTaxPropsInterface {
  dbReviewObject: Review
}
export const RentBillsTaxComponent: React.FC<RentBillsTaxPropsInterface> = ({ dbReviewObject }) => {

  const [rent, setRent] = useState<number>(0)
  const [bills, setBills] = useState<number>(0)
  const [councilTax, setCouncilTax] = useState<number>(0)

  const handleRentChange = (event) => setRent(event.target.value);
  const handleBillsChange = (event) => setBills(event.target.value);
  const handleCouncilTaxChange = (event) => setCouncilTax(event.target.value);

  dbReviewObject.monthly_rent = rent
  dbReviewObject.monthly_bill = bills
  dbReviewObject.council_tax = councilTax

  return (
    <div>
      <form>
      <h2 className="">Rent, Bills & Council Tax </h2>
        <div className="titleform">
          <p>Rent PCM</p>
          <input 
            name="rent"
            className="input"
            placeholder="£"
            value={rent}
            onChange={handleRentChange}
          />
        </div>

        <div className="dateform">
          <p>Bills PCM</p>
          <input
            name="bills"
            className="input"
            placeholder="£"
            value={bills}
            onChange={handleBillsChange}
          />
        </div>

        <div className="Venue">
          <p>Council Tax PCM</p>
          <input 
            name="council-tax"
            className="input"
            placeholder="£"
            value={councilTax}
            onChange={handleCouncilTaxChange}
          />
        </div>
      </form>
    </div>
  )
}

export default RentBillsTaxComponent