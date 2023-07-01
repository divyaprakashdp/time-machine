import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DateContext } from './DateContext';

function DateForm() {
  const navigate = useNavigate();
  const { setDate } = useContext(DateContext);
  const [inputDate, setInputDate] = useState(new Date().getFullYear());

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Year Selected: ",event.target[0].value)
    setDate(event.target[0].value);
    navigate("/EventsPage");
  };

  return (


<form onSubmit={handleSubmit}>
      <label>
        Enter a year:
        <input
          min="1900" max="2099" step="1" value={inputDate}
          onChange={(e) => setInputDate(e.target.value)}
        />
      </label>
      <button type="submit">Go</button>
    </form>
    
  );
}

export default DateForm;
