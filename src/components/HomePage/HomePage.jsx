import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import CurrentWeatherCard from "../currentweatherCard/CurrentWeatherCard";
import WeeklyForecastCard from "../weeklyforcast/WeeklyForcast";
import HourlyForecastCard from "../hourlyforcast/HourlyForcast";
import Navbar from "../navbar/Navbar";
import TemperatureTrendChart from "../TemperatureTrendChart/TemperatureTrendChart";
import { ThemeContext } from "../ThemeContext";

const Homepage = () => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [weeklyData, setWeeklyData] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [cityName, setCityName] = useState('Lahore');
  const [error, setError] = useState(null);
  
  const { theme } = useContext(ThemeContext);

  const fetchWeatherData = async (placeId) => {
    try {
      const response = await axios.get(
        `https://www.meteosource.com/api/v1/free/point`, 
        {
          params: {
            place_id: placeId,
            sections: "all",
            timezone: "UTC",
            language: "en",
            units: "metric",
            key: "ox8mwzpsjb55g1l5e15rspu6dlcst0malu27cn6y",
          },
        }
      );
      const data = response.data;
      setCurrentWeather(data.current);
      setWeeklyData(data.daily?.data?.slice(1, 6) || []); 
      setHourlyData(data.hourly?.data?.slice(6, 10) || []); 
    } catch (error) {
      setError("Failed to fetch weather data");
      console.error("Error fetching weather data:", error);
    }
  };

  useEffect(() => {
    fetchWeatherData("Lahore");
  }, []);

  const handleCitySearch = (data) => {
    const placeId = data[0]?.place_id;
    const cityName = data[0]?.name || "N/A";
    setCityName(cityName);
    if (placeId) {
      fetchWeatherData(placeId);
    }
  };

  const handleLocationUpdate = (data) => {
    const { name, weatherResponse } = data;
    setCityName(name);
    setCurrentWeather(weatherResponse.current);
    setWeeklyData(weatherResponse.daily?.data?.slice(1, 6) || []);
    setHourlyData(weatherResponse.hourly?.data?.slice(6, 10) || []);
  };

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-200"}`}>
      <Navbar onCitySearch={handleCitySearch} onLocationUpdate={handleLocationUpdate} />
      <main className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

          {/* Current Weather Card */}
          <div className="col-span-1">
            {currentWeather ? (
              <CurrentWeatherCard weather={{ current: currentWeather, cityName }} />
            ) : (
              <p className="text-red-500 dark:text-gray-400">Loading current weather...</p>
            )}
          </div>

          {/* Hourly Forecast Card */}
          <div className={`bg-white ${theme === "dark" ? "dark:bg-gray-800" : "bg-gray-100"} rounded-lg shadow-md p-4 md:col-span-2 lg:col-span-2`}>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">Hourly Forecast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {Array.isArray(hourlyData) && hourlyData.length > 0 ? (
                hourlyData.map((hour, index) => (
                  <HourlyForecastCard key={index} hour={hour} />
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No hourly forecast data available</p>
              )}
            </div>
          </div>

          {/* Weekly Forecast Card */}
          <div className={`bg-white ${theme === "dark" ? "dark:bg-gray-800" : "bg-gray-100"} rounded-lg shadow-md p-4 lg:col-span-3`}>
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">5 Days Forecast</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
              {Array.isArray(weeklyData) && weeklyData.length > 0 ? (
                weeklyData.map((day, index) => (
                  <WeeklyForecastCard key={index} day={day} />
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">No weekly forecast data available</p>
              )}
            </div>

            {/* Temperature Chart */}
            <div className={`bg-white ${theme === "dark" ? "dark:bg-gray-800" : "bg-gray-100"} rounded-lg shadow-md p-4`}>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">Temperature Trend</h2>
              <TemperatureTrendChart forecastData={weeklyData} />
            </div>
          </div>
        </div>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </main>
    </div>
  );
};

export default Homepage;
