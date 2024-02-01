import React, { useState } from 'react'

export const RentBillsTaxComponent = () => {

  const [rent, setRent] = useState('')
  const [bills, setBills] = useState('')
  const [councilTax, setCouncilTax] = useState('')

  const handleRentChange = (event) => setRent(event.target.value);
  const handleBillsChange = (event) => setBills(event.target.value);
  const handleCouncilTaxChange = (event) => setCouncilTax(event.target.value);

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