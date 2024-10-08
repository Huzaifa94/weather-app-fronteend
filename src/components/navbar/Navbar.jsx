import React, { useState, useEffect, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom"; 
import api from "../../utils/constants";
import { ToastContainer, toast } from 'react-toastify';
import { ThemeContext } from "../ThemeContext";
import {
  FaSearch,
  FaLocationArrow,
  FaSun,
  FaMoon,
  FaSpinner,
} from "react-icons/fa";
import debounce from "lodash/debounce";

const Navbar = ({ onCitySearch, onLocationUpdate,}) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [username, setUsername] = useState("");
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [loadingCitySearch, setLoadingCitySearch] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user?.username) {
      setUsername(user.username);
    }
    
    
  }, [city]);

  const fetchCitySuggestions =  useCallback( 
    debounce(async (query) => {
      if (query.length > 2) {
        try {
          const response = await api.get("/find_places", {
            params: { text: query },
          });
          const filteredSuggestions = response.data.map((place) => ({
            name: place.name,
            country: place.country,
            place_id: place.place_id,
          }));
          setSuggestions(filteredSuggestions);
        } catch (error) {
          console.error("Error fetching city suggestions:", error);
        }
      } else {
        setSuggestions([]);
      }
    }, 500),
    []
  );

  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmedCity = city.trim();
    if (trimmedCity) {
      setLoadingCitySearch(true);
      try {
        const response = await api.get("/find_places", {
          params: { text: trimmedCity },
          
        });
        onCitySearch(response.data);
        setCity("");
        setSuggestions([]);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      } finally {
        setLoadingCitySearch(false);
      }
    }
  };

  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setCity(newCity);
    fetchCitySuggestions(newCity);
    
    
  };

  const handleSuggestionClick = async (suggestion) => {
    console.log(suggestion, "okkkkkkkkkk");
    
   
    setSuggestions([]);
    setCity(suggestion.name);
    setLoadingCitySearch(true);
    setLoadingCitySearch(false);
  
    try {
      const response = await api.get("/find_places", {
        params: { text: suggestion.place_id },
      });
      onCitySearch(response.data);
    } catch (error) {
      console.error("Error fetching exact weather data:", error);
    } finally {
      setLoadingCitySearch(false);
    }

  };

  const handleLocationClick = async () => {
    if (navigator.geolocation) {
      setLoadingLocation(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const placeResponse = await api.get("/nearest_place", {
              params: { lat: latitude, lon: longitude },
            });
            const { name, place_id } = placeResponse.data;
            

            if (name && place_id) {
              const weatherResponse = await api.get("/point", {
                params: {
                  place_id,
                  sections: "all",
                  timezone: "UTC",
                  language: "en",
                  units: "metric",
                },
              });
              console.log(weatherResponse);
              

              
              const data = {
                name,
                place_id,
                weatherResponse: weatherResponse.data,
              };
              onLocationUpdate(data);
            } else {
              console.error("City not found");
              alert("Unable to find the city from the geolocation.");
            }
          } catch (error) {
            console.error("Error fetching location data:", error);
            alert("Error fetching location data.");
          } finally {
            setLoadingLocation(false);
          }
        },
        (error) => {
          console.error("Error getting geolocation:", error);
          alert("Unable to retrieve your location.");
          setLoadingLocation(false);
        },
        { enableHighAccuracy: true, timeout: 1000, maximumAge: 0 }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
      setLoadingLocation(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    
  };

  return (
    <nav
    
      className={`p-2 sticky top-0 z-50 flex justify-between items-center gap-3 ${
        theme === "light" ? "bg-gray-200 text-black" : "bg-gray-800 text-white"
      }`}
    >
      <div className="flex items-center gap-3">
      
        <button
          className="text-2xl font-bold hover:scale-110 transition-all duration-200 ease-in"
          onClick={() => setMenuOpen(!menuOpen)}
        ></button>
        <p className="hidden md:block text-xl font-bold">{username}</p>
      </div>
      <div className="relative w-full md:w-1/2">
        <form
          className="flex items-center gap-2 w-full"
          onSubmit={handleSearch}
        >
          <input
            className={`w-full py-2 px-3 border-2 rounded-lg outline-none text-lg ${
              theme === "light"
                ? "border-gray-300 bg-white text-black"
                : "border-gray-600 bg-gray-700 text-white"
            }`}
            type="text"
            value={city}
            onChange={handleCityChange}
            placeholder="Search for a city"
          />
          <button
            className="text-lg p-2 hover:scale-110 transition-all duration-500 ease-in-out"
            type="submit"
            disabled={loadingCitySearch}
          >
            {loadingCitySearch ? (
              <FaSpinner className="animate-spin" />
            ) : (
              <FaSearch />
            )}
          </button>
        </form>
        {suggestions.length > 0 && (
          <div
            className={`absolute top-full left-5px w-auto shadow-lg mt-2 p-2 max-h-48 overflow-hidden z-10 bg-blend-lighten ${
              theme === "light"
                ? "bg-white text-black"
                : "bg-gray-700 text-white"
            }`}
          >
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="cursor-pointer hover:bg-gray-200 px-2 py-1"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion.name}, {suggestion.country}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        <button
          className="p-2 hover:scale-110 transition-all duration-200 ease-in-out"
          onClick={handleLocationClick}
          disabled={loadingLocation}
        >
          {loadingLocation ? (
            <FaSpinner className="animate-spin" />
          ) : (
            <FaLocationArrow />
          )}
        </button>
        <button
          className="p-2 hover:scale-110 transition-all duration-200 ease-in-out"
          onClick={toggleTheme}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </button>
        {/* Add logout button */}
        <button
  className={`p-2 hover:scale-110 transition-all duration-200 ease-in-out font-semibold rounded-lg ${
    theme === "light" ? "bg-white text-black" : "bg-gray-700 text-white"
  }`}
  onClick={handleLogout}
>
  Logout
</button>
      </div>
      {menuOpen && (
        <div
          className={`${
            theme === "light"
              ? "bg-gray-200 text-black"
              : "bg-gray-800 text-white"
          } absolute top-16 left-0 right-0 p-4`}
        >
          <p>Hello {username}</p>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
