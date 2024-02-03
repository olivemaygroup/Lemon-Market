import React from 'react'

interface TenancyDurationPropsInterface {
  t_start: string,
  t_end: string,
  setT_start: Function,
  setT_end: Function,
};

const TenancyDuration: React.FC<TenancyDurationPropsInterface> = ({ t_start, t_end, setT_end, setT_start }) => {


  return (
    <div>
      <form >
        <div>
          <label>Tenancy Start:</label>
          <input
            value={t_start}
            type="date"
            id="tenancy-start"
            className="input"
            placeholder="When did your tenancy start?"
            onChange={(event) => setT_start(event.target.value)}
          />
        </div>
        <div>
          <label>Tenancy End:</label>
          <input
            value={t_end}
            type="date"
            id="tenancy-end"
            className="input"
            placeholder="When did your tenancy end?"
            onChange={(event) => setT_end(event.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default TenancyDuration;