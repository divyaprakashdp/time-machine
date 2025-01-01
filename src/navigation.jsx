import React from "react";
import { Route, Routes, Navigate } from "react-router";
import EventsPage from "./EventsPage";
import TimeCapsule from "./TimeCapsule";

const Navigation = () => {
  return (
    <Routes>
      {/* Default Route */}
      <Route path="/" element={<Navigate to="/EventsPage" />} />

      {/* Defined Routes */}
      <Route path="/EventsPage" element={<EventsPage />} />
      <Route path="/TimeCapsule" element={<TimeCapsule />} />

      {/* 404 Fallback */}
      <Route
        path="*"
        element={
          <div style={{ textAlign: "center", marginTop: "20vh" }}>
            <h1>404 - Page Not Found</h1>
            <p>The page you're looking for doesn't exist.</p>
          </div>
        }
      />
    </Routes>
  );
};

export default Navigation;
