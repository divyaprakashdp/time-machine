import React, { useEffect, useState } from "react";
import axios from "axios";
import DisplayCards from "./DisplayCards";
import { useDate } from "./DateContext";
import PopUp from "./PopUp";
import { Accordion, AccordionSummary } from "@mui/material";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Fade from '@mui/material/Fade';

function EventsPage() {
  const { selectedDate } = useDate();
  const [Data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [expanded, setExpanded] = useState("events")

  useEffect(() => {
    (async () => {
      console.log("selectedDate", selectedDate);
      try {
        setError(false);
        setIsLoading(true);
        const response = await axios.get(
          `https://api.wikimedia.org/feed/v1/wikipedia/en/onthisday/all/0${selectedDate}`
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    })();
  }, [selectedDate]);

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-center bg-gray-800 text-gray-100">
        <div className="bg-red-100 text-red-800 px-6 py-4 rounded-lg">
          <p className="text-lg font-semibold">Something went wrong. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-800 text-gray-100">
        <div className="loader w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const monthSelected = months[selectedDate.split("/")[0] - 1];
  const daySelected = selectedDate.split("/")[1];

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className="min-h-screen  text-gray-100 p-8  bg-gradient-to-b from-gray-800 to-gray-600">
      <div className="text-3xl font-serif font-bold text-center text-yellow-400 ">
        <h1 >
          Events happend on: {`${monthSelected} ${daySelected}${daySelected[1] > 1 ? "th" : "st"}`}
        </h1>
      </div>
      <div>

      </div>
      {Object.keys(Data).map(sub => (
        <Accordion key={sub} expanded={expanded === sub} className="border border-yellow-300 mb-4 p-4 text-white " sx={{ backgroundColor: "black" }} onChange={handleChange(sub)}>
          <AccordionSummary expandIcon={<ArrowDropDownIcon id={sub} sx={{ color: "gray" }} />}>
            <span className="text-yellow-700 text-2xl font-bold uppercase">{sub}</span>
          </AccordionSummary>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4 ">
            {Data[sub] &&
              Data[sub].map((event, index) => (
                <div key={event.text}>
                  <DisplayCards
                    key={event.text}
                    imageUrl={event.pages[0].thumbnail?.source}
                    cardData={event.text}
                    altTitle={event.pages[0].normalizedtitle}
                    wikiLink={event.pages[0].content_urls.desktop.page}
                    content={event.pages[0].extract}
                    year={event.year}
                    style={{
                      animation: `fadeIn 0.5s ease-out ${index * 0.1}s forwards`,
                    }}
                  />

                </div>
              ))}
          </div>
        </Accordion>
      ))}
    </div>
  );
}

export default EventsPage;
