import React, { useState, useEffect } from 'react'

interface RentBillsTaxPropsInterface {
  setMonthly_rent: Function
  setMonthly_bill: Function
  setCouncil_tax: Function
};

export const RentBillsTaxComponent: React.FC<RentBillsTaxPropsInterface> = ({ setMonthly_rent, setMonthly_bill, setCouncil_tax }) => {

  const [rent, setRent] = useState<number>(0)
  const [bills, setBills] = useState<number>(0)
  const [councilTax, setCouncilTax] = useState<number>(0)

  const handleRentChange = (event: React.ChangeEvent<HTMLInputElement>) => setRent(Number(event.target.value));
  const handleBillsChange = (event: React.ChangeEvent<HTMLInputElement>) => setBills(Number(event.target.value));
  const handleCouncilTaxChange = (event: React.ChangeEvent<HTMLInputElement>) => setCouncilTax(Number(event.target.value));

  useEffect(() => {
    setMonthly_rent(rent);
    setMonthly_bill(bills);
    setCouncil_tax(councilTax);
  }, [rent, bills, councilTax, setMonthly_rent, setMonthly_bill, setCouncil_tax]);

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
            value={rent}
            onChange={handleRentChange}
          />
        </div>

        <div className="bills-form">
        <p>Bills PCM</p>
          <input
            type="number"
            name="bills"
            className="input"
            placeholder="£"
            value={bills}
            onChange={handleBillsChange}
          />
        </div>

        <div className="CouncilTax-form">
          <p>Council Tax PCM</p>
          <input 
            type="number" 
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