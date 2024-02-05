import React from 'react'

interface TenancyDurationPropsInterface {
  t_start: string,
  t_end: string,
  setT_start: Function,
  setT_end: Function,
};

const TenancyDuration: React.FC<TenancyDurationPropsInterface> = ({ t_start, t_end, setT_end, setT_start }) => {


  return (
    <div className='tenancy-html-div-container'>
      <form className='tenancy-html-form'>
        <div className='tenancy-form-input'>
          <label>Tenancy Start</label>
          <input
            value={t_start}
            type="date"
            id="tenancy-start"
            className="tenancy-html-input"
            placeholder="When did your tenancy start?"
            onChange={(event) => setT_start(event.target.value)}
          />
        </div>
        <div className='tenancy-form-input'>
          <label>Tenancy End</label>
          <input
            
            value={t_end}
            type="date"
            id="tenancy-end"
            className="tenancy-html-input"
            placeholder="When did your tenancy end?"
            onChange={(event) => setT_end(event.target.value)}
          />
        </div>
      </form>
    </div>
  );
};

export default TenancyDuration;