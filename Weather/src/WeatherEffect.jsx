import React, { useEffect, useState } from "react";
import "./WeatherEffect.css"; // Ensure you have this CSS file

const WeatherEffect = ({ type }) => {
  const [effectClass, setEffectClass] = useState("");

  useEffect(() => {
    switch (type) {
      case "Clear":
        setEffectClass("clear-sky");
        break;
      case "Clouds":
        setEffectClass("cloudy");
        break;
      case "Rain":
        setEffectClass("rainy");
        break;
      case "Snow":
        setEffectClass("snowy");
        break;
      case "Drizzle":
        setEffectClass("drizzle");
        break;
      case "Thunderstorm":
        setEffectClass("thunderstorm");
        break;
      default:
        setEffectClass("");
    }
  }, [type]);

  return <div className={`weather-animation ${effectClass}`}></div>;
};

export default WeatherEffect;
