import React, { useState } from 'react';
import './App.css';




function App() {
  const [cityInput, setCityInput] = useState('');
  const [weatherData, setWeatherData] = useState({});

  const getWeather = async () => {
    const response = await fetch('http://localhost:3000/getWeather', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ cities: cityInput.split(',').map(city => city.trim()) })
    });

    const data = await response.json();
    setWeatherData(data.weather);
  };

  const handleInputChange = (e) => {
    setCityInput(e.target.value);
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <input
        type="text"
        value={cityInput}
        onChange={handleInputChange}
        placeholder="Enter city names separated by commas"
      />
      <button onClick={getWeather}>Get Weather</button>
      <div>
        {Object.keys(weatherData).map(city => (
          <p key={city}>{`${city}: ${weatherData[city]}`}</p>
        ))}
      </div>
    </div>
  );
}

export default App;
