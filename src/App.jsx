import DateForm from "./DateForm";
import EventsPage from "./EventsPage";
import { DateProvider } from "./DateContext";
import { useState } from "react";

function App() {
  const [showEvents, setShowEvents] = useState(false);

  const handleFormSubmit = () => {
    setShowEvents(true);
  };

  return (
    <DateProvider>
      <div >
        <header >
          <DateForm onSubmit={handleFormSubmit} />
        </header>
        {showEvents && <EventsPage />}
      </div>
    </DateProvider>
  );
}

export default App;
