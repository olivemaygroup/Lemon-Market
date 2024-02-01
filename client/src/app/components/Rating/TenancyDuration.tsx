import React from 'react'

interface TenancyDurationInterface {
  handleTStart: Function,
  handleTEnd: Function
}

const TenancyDuration: React.FC<TenancyDurationInterface> = (handleTStart, handleTEnd) => {

  const handleStartInput = (event: DateConstructor) => {
    handleTStart(event.target.value);
  };
  const handleEndInput = (event: DateConstructor) => {
    handleTEnd(event.target.value);
  };

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
      onChange={handleStartInput}
      />
      </div>
      <div>
      <p>Tenancy End Date:</p>
        <input
        type="date"
        name="tenancy-end"
        className="input"
        placeholder="When did your tenancy end?"
        onChange={handleEndInput}
        />
      </div>    
    </form>
  )
}

export default TenancyDuration