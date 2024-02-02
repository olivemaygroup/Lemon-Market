import React, { useState, useEffect } from 'react'

interface RentBillsTaxPropsInterface {
  monthly_rent: number
  monthly_bill: number
  council_tax: number
  setMonthly_rent: Function
  setMonthly_bill: Function
  setCouncil_tax: Function
};

export const RentBillsTaxComponent: React.FC<RentBillsTaxPropsInterface> = ({ monthly_rent, monthly_bill, council_tax, setMonthly_rent, setMonthly_bill, setCouncil_tax }) => {

  return (
    <div>
      <form>
      <h2 className="">Rent, Bills & Council Tax </h2>
      <div className="rent-form">
          <p>Rent PCM</p>
          <input 
            type="number"
            name="rent"
            className="input"
            placeholder="£"
            value={monthly_rent}
            onChange={(event) => {setMonthly_rent(event.target.value)}}
          />
        </div>

        <div className="bills-form">
        <p>Bills PCM</p>
          <input
            type="number"
            name="bills"
            className="input"
            placeholder="£"
            value={monthly_bill}
            onChange={(event) => {setMonthly_bill(event.target.value)}}
          />
        </div>

        <div className="CouncilTax-form">
          <p>Council Tax PCM</p>
          <input 
            type="number" 
            name="council-tax"
            className="input"
            placeholder="£"
            value={council_tax}
            onChange={(event) => setCouncil_tax(event.target.value)}
          />
        </div>
      </form>
    </div>
  )
}

export default RentBillsTaxComponent