import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Grid, Alert, CircularProgress } from "@mui/material";
import DisplayCards from "./DisplayCards";
import { useNavigate } from "react-router-dom";
import { DateContext } from "./DateContext";
import "./App.css";

function EventsPage() {
  const navigate = useNavigate();
  const { selectedDate } = useContext(DateContext);
  const [eventData, setEventData] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      console.log("selectedDate", selectedDate);
      try {
        setError(false);
        setIsLoading(true);
        const response = await axios.get(
          `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/events/${selectedDate}`
        );
        console.log(response);

        setEventData(response.data.events);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    })();
  }, [selectedDate]);

  if (error) {
    return <Alert severity="warning">Something went wrong</Alert>;
  }

  if (isLoading) {
    return <CircularProgress color="info" />;
  }

  return (
    <>
      {/* {isLoading && <LinearProgress />} */}
      <div>
        <label className="option-title">Date Selected: {selectedDate}</label>
        <Grid container direction="row" justifyContent="center" rowSpacing={5}>
          {eventData &&
            eventData.map((event) => (
              <Grid item>
                <DisplayCards
                  imageUrl={event.pages[0].thumbnail?.source}
                  cardData={event.text}
                  altTitle={event.pages[0].title}
                  // btnText="More.."
                  // onClick={() => navigate("/myDashboard")}
                />
              </Grid>
            ))}
        </Grid>
      </div>
    </>
  );
}

export default EventsPage;
