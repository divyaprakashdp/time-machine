import React, { useState } from "react";
import defaultImage from "./assets/defaultImage.svg"
import { Link } from "react-router";
import PopUp from "./PopUp";

const DisplayCards = ({ imageUrl, cardData, altTitle, wikiLink, content, year }) => {

  const [openPopup, setOpenPopup] = useState(false);
  return (
    <>
      <div onClick={() => setOpenPopup(true)} className=" h-96 bg-gray-800 rounded-xl overflow-hidden border border-gray-700 flex flex-col hover:scale-105 transition-all duration-500 ease-out shadow-md shadow-yellow-200" >


        <div className="h-48 bg-gray-700 flex items-center justify-center relative">
          <div className="z-20 absolute right-2 bottom-1 bg-yellow-300 text-black font-semibold px-2 opacity-70 font-mono">{year}</div>
          {imageUrl && (
            imageUrl ? <img
              src={imageUrl}
              alt={altTitle}
              className="object-contain w-full h-full"
            /> : <img
              src={defaultImage}
              alt={altTitle}
              className="object-contain w-full h-full"
            />
          )}
        </div>

        <div className="p-4 flex-1 flex flex-col">
          <h3 className="text-lg font-semibold text-yellow-400 mb-3 font-sans">
            {altTitle}
          </h3>
          <p className="text-gray-300 text-base leading-relaxed font-sans font-semibold">
            {cardData}
          </p>
        </div>

      </div>
      {
        openPopup && <PopUp open={openPopup} onClose={() => setOpenPopup(false)}>
          {content}
        </PopUp>
      }
    </>
  );
};

export default DisplayCards;
