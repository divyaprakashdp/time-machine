import React, { useState } from "react";
import { useDate } from "./DateContext";

function DateForm({ onSubmit }) {
  const { setDate } = useDate();
  const [inputDay, setInputDay] = useState(new Date().getDate());
  const [inputMonth, setInputMonth] = useState(new Date().getMonth() + 1);

  const handleSubmit = (event) => {
    event.preventDefault();
    setDate(`${inputMonth}/${inputDay}`);
    if (onSubmit) {
      onSubmit();
    }
  };

  const dayMaxValue = (month) => {
    const daysInMonthArray = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    return daysInMonthArray[month - 1];
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col text-center items-center justify-center  text-gray-700 p-4"
    >
      <h1 className="text-4xl font-bold mb-6 text-red-400">TIME MACHINE</h1>
      <div className="flex flex-col sm:flex-row items-center gap-6 mb-6">
        <div className="flex flex-col items-center">
          <label htmlFor="month" className="text-lg font-semibold mb-2">
            Select the month:
          </label>
          <input
            id="month"
            type="number"
            max={12}
            min={1}
            value={inputMonth}
            onChange={(e) => setInputMonth(e.target.value)}
            className="w-24 p-2 border-2 border-yellow-400 rounded-lg bg-gray-700 text-gray-100 text-center focus:outline-none focus:ring-2 focus:ring-yellow-500 "
          />
        </div>
        <div className="flex flex-col items-center">
          <label htmlFor="day" className="text-lg font-semibold mb-2">
            Select the day:
          </label>
          <input
            id="day"
            type="number"
            max={dayMaxValue(inputMonth)}
            min={1}
            value={inputDay}
            onChange={(e) => setInputDay(e.target.value)}
            className="w-24 p-2 border-2 border-yellow-400 rounded-lg bg-gray-700 text-gray-100 text-center focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>
      </div>
      <button
        type="submit"
        className="px-6 py-2 bg-yellow-500 text-gray-900 font-bold rounded-lg hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      >
        Go
      </button>
    </form>
  );
}

export default DateForm;
