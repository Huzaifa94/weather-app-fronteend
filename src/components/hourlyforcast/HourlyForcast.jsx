import React, { useContext } from 'react';
import weatherIconMap from '../WeatherIconsMap'; 
import { ThemeContext } from '../ThemeContext';

const HourlyForecastCard = ({ hour }) => {
  const { theme } = useContext(ThemeContext); 

  const {
    date,
    icon: iconNum,
    temperature,
    wind: { speed: windSpeed } = {},
    summary
  } = hour;

  const time = new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  const iconUrl = weatherIconMap[iconNum] || weatherIconMap.default;

  return (
    <div
      className={`${
        theme === 'light' ? 'bg-blue-100 text-gray-800' : 'bg-gray-800 text-gray-300'
      } shadow-lg rounded-lg overflow-hidden flex flex-col items-center gap-2 py-3`}
    >
      <div className="mb-2">
        <img src={iconUrl} alt={`Weather icon ${iconNum}`} className="w-12 h-12" />
      </div>

      <h3 className="text-md font-bold">{time}</h3>
      <p className="text-sm font-medium">
        {temperature ? temperature.toFixed(1) : 'N/A'}°C
      </p>
      <p className="text-sm font-medium">
        Wind Speed: {windSpeed ? windSpeed.toFixed(1) : 'N/A'} km/h
      </p>
      <p className="text-sm font-extrabold">{summary}</p>
    </div>
  );
};

export default HourlyForecastCard;
