const express = require('express');
const axios = require('axios');

const cors = require('cors');
require('dotenv').config();


const app = express();
app.use(cors());
const apiKey = process.env.OPENWEATHERMAP_API_KEY; 
app.use(express.json());

app.post('/getWeather', async (req, res) => {
  const { cities } = req.body;

  if (!cities || !Array.isArray(cities)) {
    return res.status(400).json({ error: 'Cities array is required in the request body' });
  }

  const weatherData = {};

  
  await Promise.all(
    cities.map(async (city) => {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        const { main } = response.data.weather[0];
        weatherData[city] = `${Math.round(response.data.main.temp)}C`;
      } catch (error) {
        weatherData[city] = 'Not Found';
      }
    })
  );

  res.json({ weather: weatherData });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
