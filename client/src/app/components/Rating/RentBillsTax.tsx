import React from 'react'

interface RentBillsTaxPropsInterface {
  monthly_rent: number
  monthly_bill: number
  council_tax: number
  setMonthly_rent: React.Dispatch<React.SetStateAction<number>>
  setMonthly_bill: React.Dispatch<React.SetStateAction<number>>
  setCouncil_tax: React.Dispatch<React.SetStateAction<number>>
};

export const RentBillsTaxComponent: React.FC<RentBillsTaxPropsInterface> = ({ monthly_rent, monthly_bill, council_tax, setMonthly_rent, setMonthly_bill, setCouncil_tax }) => {

  
  return (
    <div className='form-container'>
      <form className='rbt-form'>
      <div className="rbt-form-input">
          <p>Rent PCM</p>
          <input 
            type="number"
            step=".01"
            inputMode="decimal" // Brings up numeric keyboard on mobile devices
            pattern="\d*\.?\d{0,2}" // HTML validation pattern for up to 2 decimal places
            title="Currency" 
            name="rent"
            className="input"
            placeholder="£"
            value={monthly_rent}
            onChange={(event) => {setMonthly_rent(Number(event.target.value))}}
          />
        </div>

        <div className="rbt-form-input">
          <div>
        <p>Bills PCM</p>
          </div>
          <input
            type="number"
            step=".01"
            inputMode="decimal" 
            pattern="\d*\.?\d{0,2}" 
            title="Currency" 
            name="bills"
            className="input"
            placeholder="£"
            value={monthly_bill}
            onChange={(event) => {setMonthly_bill(Number(event.target.value))}}
          />
        </div>

        <div className="rbt-form-input">
          <p>Council Tax PCM</p>
          <input 
            type="number"
            step=".01" 
            inputMode="decimal" 
            pattern="\d*\.?\d{0,2}" 
            title="Currency" 
            name="council-tax"
            className="input"
            placeholder="£"
            value={council_tax}
            onChange={(event) => setCouncil_tax(Number(event.target.value))}
          />
        </div>
      </form>
    </div>
  )
}

export default RentBillsTaxComponent;