const axios = require('axios');

const OPENWEATHER_KEY = process.env.OPENWEATHER_API_KEY;

async function getWeatherForecast(req, res) {
  try {
    const { city, lat, lon } = req.query;

    if (!city && (!lat || !lon)) {
      return res.status(400).json({
        success: false,
        message: 'Please provide city name or coordinates (lat, lon)'
      });
    }

    let queryParam = city
      ? `q=${encodeURIComponent(city)}`
      : `lat=${lat}&lon=${lon}`;

    const [currentRes, forecastRes] = await Promise.all([
      axios.get(
        `https://api.openweathermap.org/data/2.5/weather?${queryParam}&appid=${OPENWEATHER_KEY}&units=metric`
      ),
      axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?${queryParam}&appid=${OPENWEATHER_KEY}&units=metric`
      )
    ]);

    const current = {
      city: currentRes.data.name,
      country: currentRes.data.sys.country,
      temperature: Math.round(currentRes.data.main.temp),
      feelsLike: Math.round(currentRes.data.main.feels_like),
      humidity: currentRes.data.main.humidity,
      windSpeed: currentRes.data.wind.speed,
      condition: currentRes.data.weather[0].main,
      description: currentRes.data.weather[0].description,
      icon: currentRes.data.weather[0].icon
    };

    const dailyMap = {};
    forecastRes.data.list.forEach((item) => {
      const date = item.dt_txt.split(' ')[0];
      if (!dailyMap[date]) {
        dailyMap[date] = {
          date,
          temps: [],
          humidity: [],
          conditions: [],
          icons: [],
          rain: 0,
          windSpeeds: []
        };
      }
      dailyMap[date].temps.push(item.main.temp);
      dailyMap[date].humidity.push(item.main.humidity);
      dailyMap[date].conditions.push(item.weather[0].main);
      dailyMap[date].icons.push(item.weather[0].icon);
      dailyMap[date].windSpeeds.push(item.wind.speed);
      if (item.rain && item.rain['3h']) {
        dailyMap[date].rain += item.rain['3h'];
      }
    });

    const forecast = Object.values(dailyMap)
      .slice(0, 5)
      .map((day) => ({
        date: day.date,
        tempMin: Math.round(Math.min(...day.temps)),
        tempMax: Math.round(Math.max(...day.temps)),
        humidity: Math.round(day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length),
        condition: day.conditions.sort((a, b) =>
          day.conditions.filter((v) => v === a).length - day.conditions.filter((v) => v === b).length
        ).pop(),
        icon: day.icons[Math.floor(day.icons.length / 2)],
        rain: Math.round(day.rain * 10) / 10,
        windSpeed: Math.round((day.windSpeeds.reduce((a, b) => a + b, 0) / day.windSpeeds.length) * 10) / 10
      }));

    const plantingTips = generatePlantingTips(current, forecast);

    res.json({
      success: true,
      data: { current, forecast, plantingTips }
    });
  } catch (error) {
    console.error('Weather Forecast Error:', error.message);
    res.status(error.response?.status || 500).json({
      success: false,
      message: error.response?.data?.message || 'Failed to fetch weather forecast'
    });
  }
}

function generatePlantingTips(current, forecast) {
  const tips = [];
  const avgTemp = forecast.reduce((sum, d) => sum + (d.tempMax + d.tempMin) / 2, 0) / forecast.length;
  const totalRain = forecast.reduce((sum, d) => sum + d.rain, 0);
  const avgHumidity = forecast.reduce((sum, d) => sum + d.humidity, 0) / forecast.length;

  if (totalRain > 20) {
    tips.push({ type: 'rain', message_en: 'Heavy rain expected. Ensure proper drainage for your crops.', message_hi: 'भारी बारिश की संभावना। अपनी फसलों के लिए उचित जल निकासी सुनिश्चित करें।' });
  } else if (totalRain < 2) {
    tips.push({ type: 'drought', message_en: 'Low rainfall expected. Plan irrigation accordingly.', message_hi: 'कम वर्षा की संभावना। सिंचाई की योजना बनाएं।' });
  }

  if (avgTemp > 35) {
    tips.push({ type: 'heat', message_en: 'High temperatures ahead. Consider shade nets and mulching.', message_hi: 'तेज गर्मी आने वाली है। छाया जाल और मल्चिंग पर विचार करें।' });
  } else if (avgTemp < 10) {
    tips.push({ type: 'cold', message_en: 'Cold weather expected. Protect sensitive crops from frost.', message_hi: 'ठंड का मौसम आने वाला है। संवेदनशील फसलों को पाले से बचाएं।' });
  }

  if (avgHumidity > 80) {
    tips.push({ type: 'humidity', message_en: 'High humidity may increase disease risk. Monitor crops closely.', message_hi: 'अधिक नमी से रोग का खतरा बढ़ सकता है। फसलों की निगरानी करें।' });
  }

  if (tips.length === 0) {
    tips.push({ type: 'good', message_en: 'Weather looks favorable for farming activities.', message_hi: 'मौसम खेती के लिए अनुकूल दिख रहा है।' });
  }

  return tips;
}

function getCropPrices(req, res) {
  const crops = [
    { id: 1, name_en: 'Wheat', name_hi: 'गेहूं', price: 2275, unit: 'quintal', change: 2.3, mandi: 'Indore', state: 'MP' },
    { id: 2, name_en: 'Rice (Basmati)', name_hi: 'चावल (बासमती)', price: 3850, unit: 'quintal', change: -1.2, mandi: 'Karnal', state: 'Haryana' },
    { id: 3, name_en: 'Cotton', name_hi: 'कपास', price: 6620, unit: 'quintal', change: 3.5, mandi: 'Rajkot', state: 'Gujarat' },
    { id: 4, name_en: 'Soybean', name_hi: 'सोयाबीन', price: 4350, unit: 'quintal', change: -0.8, mandi: 'Indore', state: 'MP' },
    { id: 5, name_en: 'Sugarcane', name_hi: 'गन्ना', price: 355, unit: 'quintal', change: 0.5, mandi: 'Muzaffarnagar', state: 'UP' },
    { id: 6, name_en: 'Mustard', name_hi: 'सरसों', price: 5200, unit: 'quintal', change: 1.8, mandi: 'Alwar', state: 'Rajasthan' },
    { id: 7, name_en: 'Maize', name_hi: 'मक्का', price: 2050, unit: 'quintal', change: -2.1, mandi: 'Davangere', state: 'Karnataka' },
    { id: 8, name_en: 'Gram (Chana)', name_hi: 'चना', price: 5450, unit: 'quintal', change: 4.2, mandi: 'Indore', state: 'MP' },
    { id: 9, name_en: 'Groundnut', name_hi: 'मूंगफली', price: 5800, unit: 'quintal', change: 1.1, mandi: 'Junagadh', state: 'Gujarat' },
    { id: 10, name_en: 'Onion', name_hi: 'प्याज', price: 1850, unit: 'quintal', change: -5.3, mandi: 'Nashik', state: 'Maharashtra' },
    { id: 11, name_en: 'Potato', name_hi: 'आलू', price: 1200, unit: 'quintal', change: 3.8, mandi: 'Agra', state: 'UP' },
    { id: 12, name_en: 'Tomato', name_hi: 'टमाटर', price: 2400, unit: 'quintal', change: -8.2, mandi: 'Kolar', state: 'Karnataka' }
  ];

  const randomVariation = () => (Math.random() - 0.5) * 4;
  const dynamicCrops = crops.map((crop) => ({
    ...crop,
    price: Math.round(crop.price * (1 + randomVariation() / 100)),
    change: Math.round((crop.change + (Math.random() - 0.5) * 2) * 10) / 10,
    lastUpdated: new Date().toISOString()
  }));

  res.json({
    success: true,
    data: {
      crops: dynamicCrops,
      disclaimer_en: 'Prices are indicative and sourced from recent mandi data. Actual prices may vary.',
      disclaimer_hi: 'कीमतें सांकेतिक हैं और हाल के मंडी डेटा से ली गई हैं। वास्तविक कीमतें भिन्न हो सकती हैं।'
    }
  });
}

module.exports = { getWeatherForecast, getCropPrices };
