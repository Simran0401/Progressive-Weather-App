import React, { useState } from "react";
import { fetchWeather } from "./api/fetchWeather";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = async (e) => {
    if (e.key === "Enter") {
      //An event will be triggered if the Enter key is pressed
      const data = await fetchWeather(query);
      setWeather(data);
      console.log(data);
      setQuery(""); //After we click enter, and we found our desired results, we need to
      // reset the input field again so that another query i.e, city can be searched later
      // so we passed an empty string in setQuery to keep the input box empty after completeing
      // our search
    }
  };

  return (
    <div className="main-container">
      <input
        type="text"
        className="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)} // It retrieves value of whatever input it was called on.
        // In this case, it’s the input element so whatever we insert in our input (here --> query), can be
        // accessed through event.target.value
        onKeyPress={search}
      />

      {weather.main && ( // main is an object with keys like temp, pressure, humidity, etc in the JSON response of the open weather api and we are accessing it with the useState variable weather which we declared above. And if weather.main exists, then only we will show the card with the below details
        <div className="city">
          <h2 className="city-name">
            <span>{weather.name}</span>
            <sup>{weather.sys.country}</sup>
          </h2>

          <div className="city-temp">
            {Math.round(weather.main.temp)}
            {/* We are rounding the values of temperature  */}
            <sup>&deg;C</sup>
          </div>

          <div className="info">
            <img
              className="city-icon"
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              // There is a weather object in the json format of the open weather api whose keys are deciption, icon etc and we are accessing those values only through useState variable weather which we declared above
            />
            <p>{weather.weather[0].description}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
