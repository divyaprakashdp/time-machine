import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Grid, Alert } from "@mui/material";
import DisplayCards from "./DisplayCards";
import { useNavigate } from "react-router-dom";
import { DateContext } from "./DateContext";
import "./App.css";

function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString("en-US", { month: "short" });
}

function getMonth(date) {
  return date.slice(5, 7);
}

function getDay(date) {
  return date.slice(8);
}

function getYear(date) {
  return date.slice(0, 4);
}

function EventsPage() {
  const navigate = useNavigate();
  const { selectedDate } = useContext(DateContext);
  const [isDataAvailable, setDataAvailable] = useState(false);
  const [eventData, setEventData] = useState([]);

  // const options = {
  //   method: "GET",
  //   url: "https://historical-events-by-api-ninjas.p.rapidapi.com/v1/historicalevents",
  //   params: {
  //     year: selectedDate,
  //   },
  //   headers: {
  //     "X-RapidAPI-Key": "851ce32772msh9f952fe7e7c8a91p1f386fjsn2a6c20768b56",
  //     "X-RapidAPI-Host": "historical-events-by-api-ninjas.p.rapidapi.com",
  //   },
  // };

  useEffect(() => {
    const getEventsData = async () => {
      console.log("selectedDate", selectedDate);
      try {
        const response = await axios.get(
          `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/events/${getMonth(
            selectedDate
          )}/${getDay(selectedDate)}`
        );

        const eventdataArray = response.data.events.filter(
          (item) => item.year == getYear(selectedDate)
        );
        setDataAvailable(eventdataArray.length > 0);
        setEventData(eventdataArray);
        console.log("Event Data => ", eventdataArray);
      } catch (error) {
        console.error(error);
      }
    };
    getEventsData();
  }, [selectedDate]);

  return (
    <div>
      <label className="option-title">Year Selected: {selectedDate}</label>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        rowSpacing={5}
      >
        {isDataAvailable ? (
          eventData.map((event) => (
            <Grid item>
              <DisplayCards
                imageUrl={event.pages[1].thumbnail.source}
                cardData={event.text}
                btnText="More.."
                onClick={() => navigate("/myDashboard")}
              />
            </Grid>
          ))
        ) : (
          <Alert severity="info">
            No events available for the entered date.
          </Alert>
        )}
      </Grid>
    </div>
  );
}

export default EventsPage;
