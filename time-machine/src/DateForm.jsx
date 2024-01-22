import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { DateContext } from "./DateContext";
import { Grid } from "@mui/material";

const today = () => {
  return {
    day: new Date().getDay(),
    month: new Date().getMonth() + 1,
  };
};

function DateForm() {
  console.log(`aaj - ${today().day}`);
  const navigate = useNavigate();
  const { setDate } = useContext(DateContext);
  const [inputDay, setInputDay] = useState(new Date().getDate());
  const [inputMonth, setInputMonth] = useState(new Date().getMonth() + 1);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("event val = ", event.target[0].value);
    setDate(`${inputMonth}/${inputDay}`);
    navigate("/EventsPage");
  };

  const dayMaxValue = (month) => {
    if (month < 1 || month > 12) {
      return "Invalid month";
    }
    const daysInMonthArray = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysInMonthArray[month - 1];
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>TIME MACHINE</h1>
      <Grid
        container
        spacing={4}
        sx={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item>
          <label>
            Select the month:
            <input
              type="number"
              max={12}
              min={1}
              value={inputMonth}
              onChange={(e) => setInputMonth(e.target.value)}
            />
          </label>
        </Grid>
        <Grid item>
          <label>
            Select the day:
            <input
              type="number"
              max={dayMaxValue(inputMonth)}
              min={1}
              value={inputDay}
              onChange={(e) => setInputDay(e.target.value)}
            />
          </label>
        </Grid>
      </Grid>

      <button type="submit">Go</button>
    </form>
  );
}

export default DateForm;
