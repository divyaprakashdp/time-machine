import React, { createContext, useState } from 'react';

export const DateContext = createContext();

export const DateProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState(new Date().getFullYear());

  const setDate = (date) => {
    setSelectedDate(date);
  };

  return (
    <DateContext.Provider value={{ selectedDate, setDate }}>
      {children}
    </DateContext.Provider>
  );
};
