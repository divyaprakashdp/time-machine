import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { Grid } from "@mui/material";
import DisplayCards from "./DisplayCards";
import { useNavigate } from "react-router-dom";
import { DateContext } from './DateContext';

function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(monthNumber - 1);

  return date.toLocaleString('en-US', { month: 'short' });
}

function EventsPage() {
  const navigate = useNavigate();
  const { selectedDate } = useContext(DateContext);
  const [isDataAvailable, setDataAvailable] = useState(false);
  const [eventData, setEventData] = useState([])

  const options = {
    method: 'GET',
    url: 'https://historical-events-by-api-ninjas.p.rapidapi.com/v1/historicalevents',
    params: {
      year: selectedDate
    },
    headers: {
      'X-RapidAPI-Key': '851ce32772msh9f952fe7e7c8a91p1f386fjsn2a6c20768b56',
      'X-RapidAPI-Host': 'historical-events-by-api-ninjas.p.rapidapi.com'
    }
  };

  const getEventsData = async () => {
    try {
      const response = await axios.request(options);
      console.log(response.data);
      setDataAvailable(response.data.length>0)
      setEventData(response.data)
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(()=>{
    getEventsData()
  },[selectedDate])

  

  return (
    <div>
      <label >Year Selected: {selectedDate}</label>
      <Grid
    container
  direction="row"
  justifyContent="space-evenly"
  rowSpacing={5}
    >
      
      {isDataAvailable && eventData.map( event => 
       <Grid item spacing={5}>
        <DisplayCards
        cardTitle={getMonthName(event.month)}
        cardData={event.event}
        btnText="Go To Youtube"
        onClick={() => navigate("/myDashboard")}
      />
       </Grid>
        
      )
      
      }
      
    </Grid>
    </div>
    
  );
}

export default EventsPage;
