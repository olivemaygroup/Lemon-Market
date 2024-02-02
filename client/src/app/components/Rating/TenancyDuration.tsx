import React, {useState, useEffect} from 'react'

interface TenancyDurationPropsInterface {
  setT_start: Function
  setT_end: Function,
};

const TenancyDuration: React.FC<TenancyDurationPropsInterface> = ({ setT_end, setT_start }) => {

  const [tenancyStart, setTenancyStart] = useState("")
  const [tenancyEnd, setTenancyEnd] = useState("")

  useEffect(() => {
    setT_start(tenancyStart);
  }, [tenancyStart, setT_start]);

  useEffect(() => {
    setT_end(tenancyEnd);
  }, [tenancyEnd, setT_end]);

  return (
    <>
      <form>
        <h2>Tenancy Dates</h2>
        <div>
          <label>Tenancy Start Date:</label>
          <input
            type="date"
            id="tenancy-start"
            className="input"
            placeholder="When did your tenancy start?"
            onChange={(event) => setTenancyStart(event.target.value)}
          />
        </div>
        <div>
          <label>Tenancy End Date:</label>
          <input
            type="date"
            id="tenancy-end"
            className="input"
            placeholder="When did your tenancy end?"
            onChange={(event) => setTenancyEnd(event.target.value)}
          />
        </div>
        <button type="submit">Submit Dates</button>
      </form>
    </>
  );
};

export default TenancyDuration;