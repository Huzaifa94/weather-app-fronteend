import React, { useContext } from "react";
import weatherIconMap from "../WeatherIconsMap";
import { ThemeContext } from "../ThemeContext";

const WeeklyForecastCard = ({ day }) => {
  const { theme } = useContext(ThemeContext);

  const {
    all_day: {
      temperature,
      icon: iconNum,
      temperature_min,
      temperature_max,
    } = {},
    day: date,
  } = day;

  const dayOfWeek = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
  });
  const iconUrl = weatherIconMap[iconNum] || weatherIconMap.default;

  return (
    <div
      className={`${
        theme === "light"
          ? "bg-blue-100 text-gray-800"
          : "bg-gray-800 text-gray-300"
      } shadow-lg rounded-lg overflow-hidden flex flex-col items-center p-2 w-full`}
    >
      <div className="mb-2">
        <img
          src={iconUrl}
          alt={`Weather icon ${iconNum}`}
          className="w-10 h-10"
        />
      </div>

      <h3 className="text-md font-bold">{dayOfWeek}</h3>
      <p className="text-sm font-medium">
        {temperature ? temperature.toFixed(1) : "N/A"}°C
      </p>

      <div className="grid grid-cols-1 gap- mt-4 text-center">
        <p className="text-sm">
          <span className="font-bold">Min Temp:</span>{" "}
          {temperature_min ? temperature_min.toFixed(1) : "N/A"}°C
        </p>
        <p className="text-sm">
          <span className="font-bold">Max Temp:</span>{" "}
          {temperature_max ? temperature_max.toFixed(1) : "N/A"}°C
        </p>
      </div>
    </div>
  );
};

export default WeeklyForecastCard;
