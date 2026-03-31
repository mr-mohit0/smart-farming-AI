const express = require('express');
const router = express.Router();
const { getWeatherForecast, getCropPrices } = require('../controllers/dashboardController');

router.get('/weather-forecast', getWeatherForecast);
router.get('/crop-prices', getCropPrices);

module.exports = router;
