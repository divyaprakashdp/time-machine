import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Grid, Alert } from "@mui/material";
import DisplayCards from "./DisplayCards";
import { useNavigate } from "react-router-dom";
import { DateContext } from "./DateContext";
import "./App.css";

function EventsPage() {
  const navigate = useNavigate();
  const { selectedDate } = useContext(DateContext);
  const [isDataAvailable, setDataAvailable] = useState(false);
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    const getEventsData = async () => {
      console.log("selectedDate", selectedDate);
      try {
        const response = await axios.get(
          `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/events/${selectedDate}`
        );
        console.log(response);
        setDataAvailable(response.data.events);
        setEventData(response.data.events);
      } catch (error) {
        console.error(error);
      }
    };
    getEventsData();
  }, [selectedDate]);

  return (
    <div>
      <label className="option-title">Date Selected: {selectedDate}</label>
      <Grid container direction="row" justifyContent="center" rowSpacing={5}>
        {eventData ? (
          eventData.map((event) => (
            <Grid item>
              <DisplayCards
                imageUrl={event.pages[0].thumbnail?.source}
                cardData={event.text}
                // btnText="More.."
                // onClick={() => navigate("/myDashboard")}
              />
            </Grid>
          ))
        ) : (
          <Alert severity="warning">
            No events available for the entered date.
          </Alert>
        )}
      </Grid>
    </div>
  );
}

export default EventsPage;
