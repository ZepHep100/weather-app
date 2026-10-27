import { useState } from "react";
import  "./Weather.css";

function Weather(){
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    if(city.trim() === ""){
      setError("Введите название города");
      return;
    }
    setLoading(true);
    setError("");
    setWeather(null);
  
    try{
      
      const API_KEY = "c0cda7e685bc63ea4c25f4e1782e8d7d";
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric&lang=ru`
);
      const data = await response.json();

      setWeather(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
};


  return(
    <div className="weather-container">
      <h1>Погода</h1>
      
      <div className="weather-search">
      <input
      type="text"
      placeholder="Введите город..."
      value={city}
      onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeather}>Узнать погоду</button>
      </div>

      {loading && <p className="loading">Загрузка...</p>}

      {error && <p className="error">{error}</p>}

      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <img 
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} 
          alt="Иконка погоды"
          />
          <p className="temp">{Math.round(weather.main.temp)}°C</p>
          <p className="description">{weather.weather[0].description}</p>
        </div>
      )}
    </div>
  )
}
export default Weather;