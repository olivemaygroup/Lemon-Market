import React from 'react'

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
    <div className='form-container'>
      <form className='rbt-form'>
      <div className="rbt-form-input">
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

        <div className="rbt-form-input">
          <div>
        <p>Bills PCM</p>
          </div>
          <input
            type="number"
            name="bills"
            className="input"
            placeholder="£"
            value={monthly_bill}
            onChange={(event) => {setMonthly_bill(event.target.value)}}
          />
        </div>

        <div className="rbt-form-input">
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