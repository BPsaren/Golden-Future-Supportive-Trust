import React, { useState, useEffect } from "react";
import mernStackImage from "../../components/asset/harvesting.jpg";
import barveWife from "../../components/asset/brave_wife.jpg";
import GetLoan from "../../components/asset/get_loan.jpg";
import happy from "../../components/asset/happy.jpg";
import lading from "../../components/asset/landing.jpg";
import onion from "../../components/asset/onion.jpg";
import retailer from "../../components/asset/retailer.jpg";
import saving from "../../components/asset/saving.jpg";
import spread from "../../components/asset/spread.jpg";
import student from "../../components/asset/student.jpg";
import technicalSupport from "../../components/asset/technical_support.jpg";
import understanding from "../../components/asset/understanding.jpg";

const images = [
  mernStackImage,
  GetLoan,
  barveWife,
  happy,
  lading,
  onion,
  retailer,
  saving,
  spread,
  student,
  technicalSupport,
  understanding,
];

export const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 1 : prevIndex + 1
    )
  };

  return (
    <div className="top-14 left-0 relative w-full  overflow-hidden   ">
      <div className="absolute inset-0 flex items-center justify-between px-4 z-10">
        <button
          className="bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
          onClick={handlePrev}
        >
          &#10094;
        </button>
        <button
          className="bg-gray-800 text-white p-2 rounded-full shadow-lg hover:bg-gray-700"
          onClick={handleNext}
        >
          &#10095;
        </button>
      </div>
      <div
        className="relative flex transition-transform duration-1000"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className="w-full h-full object-cover flex-shrink-0"
          />
        ))}
      </div>
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
