import React, { useContext } from "react";
import weatherIconMap from "../WeatherIconsMap";
import { ThemeContext } from "../ThemeContext";

const CurrentWeatherCard = ({ weather }) => {

  console.log(weather);
  

  const { theme } = useContext(ThemeContext);

  const {
    current: {
      summary = "N/A",
      temperature = null,
      wind: { speed: windSpeed = null, angle: windAngle = null } = {},
      cloud_cover: cloudCover = "N/A",
      icon_num: iconNum = "default",
    } = {},
  } = weather || {};

  const iconUrl = weatherIconMap[iconNum] || weatherIconMap.default;

  const formatWindDirection = (angle) => {
    if (angle === null) return "N/A";
    const directions = [
      "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
      "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"
    ];
    const index = Math.round(angle / 22.5) % 16;
    return directions[index];
  };

  return (
    <div
      className={`${
        theme === "light"
          ? "bg-gradient-to-r from-blue-500 via-blue-600 to-blue-300 text-black"
          : "bg-gray-800 text-gray-300"
      } rounded-lg shadow-md p-4 flex flex-col items-center mx-auto max-w-xs sm:max-w-md`}
    >
      <h2 className="text-2xl sm:text-4xl font-bold mb-2">{weather.cityName ?? "N/A"}</h2>
      <img src={iconUrl} alt={summary} className="w-20 h-20" />
      <h3 className="text-xl sm:text-3xl font-bold mb-1">
        {temperature ? temperature.toFixed(1) : "N/A"}°C
      </h3>
      <p className="text-md sm:text-lg font-medium mb-2 ">{summary}</p>
      <div className="text-center">
        <p className="text-sm sm:text-md flex items-center justify-center mb-1">
          <img
            src={weatherIconMap["9"]}
            alt="Wind Speed Icon"
            className="w-5 h-5 mr-2"
          />
          Wind Speed: {windSpeed ? windSpeed.toFixed(1) : "N/A"} km/h
        </p>
        <p className="text-sm sm:text-md flex items-center justify-center mb-1">
          <img
            src={weatherIconMap["1"]}
            alt="Wind Direction Icon"
            className="w-5 h-5 mr-2"
          />
          Wind Direction: {formatWindDirection(windAngle)} ({windAngle || "N/A"}°)
        </p>
        <p className="text-sm sm:text-md flex items-center justify-center">
          <img
            src={weatherIconMap["3"]}
            alt="Cloud Cover Icon"
            className="w-5 h-5 mr-2"
          />
          Cloud Cover: {cloudCover || "N/A"}%
        </p>
      </div>
    </div>
  );
};

export default CurrentWeatherCard;
