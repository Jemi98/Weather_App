import React, { useState } from "react";
import axios from "axios";

import "./App.css";

const App = () => {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=imperial&appid=4e2d9fc84c04b4e67760b3f99b7bd95d`;

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      axios.get(url).then((response) => {
        setData(response.data);
        console.log(response.data);
      });
      setLocation("");
    }
  };

  let ruff;
  let round;

  if (data.main !== undefined) {
    ruff = data.main.temp;
    round = (Math.round(ruff - 32) * 5) / 9;
  }

  return (
    <div className="app">
      <h2 style={{ textAlign: "center", color: "#fff" }}>
        <span>Weather</span> Forecast
      </h2>
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          onKeyPress={searchLocation}
          placeholder="Enter Location"
          type="text"
        />
      </div>

      <div className="container">
        <div className="top">
          <div className="location">
            <p>{data.name}</p>
          </div>

          <div className="temp">
            {data.main ? <h1>{round.toFixed(0)}°C</h1> : null}
          </div>
        </div>
        <div className="description">
          {data.weather ? <p>{data.weather[0].main}</p> : null}
        </div>

        {data.name !== undefined ? (
          <div className="bottom">
            <div className="feels">
              {data.main ? <p>{data.main.feels_like}°F</p> : null}

              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {data.main ? <p>{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p>{data.wind.speed}MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default App;
