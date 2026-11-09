import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "./Weather.css";

function Weather() {
  // 1. Состояние только для города (ввод пользователя)
  const [city, setCity] = useState("Moscow");
  const [searchCity, setSearchCity] = useState("Moscow"); // Город, по которому ищем
  
  const API_KEY = "c0cda7e685bc63ea4c25f4e1782e8d7d"; // Твой ключ

  // 2. React Query делает всю грязную работу
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["weather", searchCity], // Уникальный ключ (город)
    queryFn: async () => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric&lang=ru`
      );
      if (!response.ok) throw new Error("Город не найден");
      return response.json();
    },
    enabled: !!searchCity, // Запрос не выполнится, если город пустой
  });

  // 3. Обработка кнопки "Узнать погоду"
  const handleSearch = () => {
    if (city.trim() !== "") {
      setSearchCity(city);
    }
  };

  return (
    <div className="weather-container">
      <h1>Погода</h1>
      
      <div className="weather-search">
        <input
          type="text"
          placeholder="Введите город..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button onClick={handleSearch}>Узнать погоду</button>
      </div>

      {/* React Query автоматически управляет состояниями isLoading и isError */}
      {isLoading && <p className="loading">Загрузка...</p>}
      {isError && <p className="error">{error.message}</p>}

      {data && (
        <div className="weather-card">
          <h2>{data.name}</h2>
          <img 
            src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} 
            alt="Иконка погоды"
          />
          <p className="temp">{Math.round(data.main.temp)}°C</p>
          <p className="description">{data.weather[0].description}</p>
          <div className="details">
            <span>Влажность: {data.main.humidity}%</span>
            <span>Ветер: {data.wind.speed} м/с</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default Weather;