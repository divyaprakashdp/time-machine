import React from "react";
import { Route, Routes } from "react-router-dom";
import EventsPage from "./EventsPage";
import TimeCapsule from "./TimeCapsule";

const Navigation = () => {
  return (
    <Routes>
      <Route path="/EventsPage" element={<EventsPage />} />
      <Route path="/TimeCapsule" element={<TimeCapsule />} />
    </Routes>
  );
};

export default Navigation;
