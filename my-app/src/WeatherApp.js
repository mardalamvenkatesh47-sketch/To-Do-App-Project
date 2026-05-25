import { useState } from "react";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (city.trim() === "") {
      alert("Please enter city name");
      return;
    }

    try {
      setError("");

      /* Free Weather API */
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=YOUR_API_KEY&units=metric`
      );

      const data = await response.json();

      if (data.cod === "404") {
        setError("City not found");
        setWeather(null);
        return;
      }

      setWeather(data);
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f2f2f2",
        padding: "40px",
        textAlign: "center",
      }}
    >
      <h1>🌤 React Day 36 - Weather App</h1>

      {/* Search Section */}
      <div style={{ marginTop: "30px" }}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          style={{
            padding: "12px",
            width: "250px",
            marginRight: "10px",
            borderRadius: "5px",
            border: "1px solid gray",
          }}
        />

        <button
          onClick={getWeather}
          style={{
            padding: "12px 20px",
            background: "blue",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          Search
        </button>
      </div>

      {/* Error */}
      {error && (
        <h3 style={{ color: "red", marginTop: "20px" }}>
          {error}
        </h3>
      )}

      {/* Weather Card */}
      {weather && (
        <div
          style={{
            background: "white",
            width: "350px",
            margin: "40px auto",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.2)",
          }}
        >
          <h2>{weather.name}</h2>

          <h1>{weather.main.temp}°C</h1>

          <h3>{weather.weather[0].main}</h3>

          <p>Humidity: {weather.main.humidity}%</p>

          <p>Wind Speed: {weather.wind.speed} km/h</p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;