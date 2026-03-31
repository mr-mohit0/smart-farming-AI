"""
Test suite for Weather Forecast and Crop Market Prices APIs
Smart Farming AI Assistant - New Features Testing
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestWeatherForecastAPI:
    """Weather Forecast endpoint tests"""
    
    def test_weather_forecast_delhi(self):
        """Test weather forecast for Delhi city"""
        response = requests.get(f"{BASE_URL}/api/weather-forecast?city=Delhi")
        assert response.status_code == 200
        
        data = response.json()
        assert data["success"] == True
        assert "data" in data
        
        # Validate current weather structure
        current = data["data"]["current"]
        assert "city" in current
        assert "temperature" in current
        assert "humidity" in current
        assert "windSpeed" in current
        assert "condition" in current
        assert "description" in current
        assert current["city"] == "Delhi"
        
        # Validate forecast structure (5 days)
        forecast = data["data"]["forecast"]
        assert len(forecast) >= 1 and len(forecast) <= 5
        for day in forecast:
            assert "date" in day
            assert "tempMin" in day
            assert "tempMax" in day
            assert "humidity" in day
            assert "condition" in day
            assert "rain" in day
        
        # Validate planting tips
        tips = data["data"]["plantingTips"]
        assert isinstance(tips, list)
        assert len(tips) >= 1
        for tip in tips:
            assert "type" in tip
            assert "message_en" in tip
            assert "message_hi" in tip
    
    def test_weather_forecast_mumbai(self):
        """Test weather forecast for Mumbai city"""
        response = requests.get(f"{BASE_URL}/api/weather-forecast?city=Mumbai")
        assert response.status_code == 200
        
        data = response.json()
        assert data["success"] == True
        assert data["data"]["current"]["city"] == "Mumbai"
        assert len(data["data"]["forecast"]) >= 1
    
    def test_weather_forecast_no_params(self):
        """Test weather forecast without city or coordinates returns 400"""
        response = requests.get(f"{BASE_URL}/api/weather-forecast")
        assert response.status_code == 400
        
        data = response.json()
        assert data["success"] == False
        assert "message" in data
        assert "city" in data["message"].lower() or "coordinates" in data["message"].lower()
    
    def test_weather_forecast_with_coordinates(self):
        """Test weather forecast with lat/lon coordinates"""
        # Delhi coordinates
        response = requests.get(f"{BASE_URL}/api/weather-forecast?lat=28.6139&lon=77.2090")
        assert response.status_code == 200
        
        data = response.json()
        assert data["success"] == True
        assert "current" in data["data"]
        assert "forecast" in data["data"]
    
    def test_weather_forecast_invalid_city(self):
        """Test weather forecast with invalid city name"""
        response = requests.get(f"{BASE_URL}/api/weather-forecast?city=InvalidCityXYZ123")
        # OpenWeather returns 404 for invalid city
        assert response.status_code in [400, 404, 500]


class TestCropPricesAPI:
    """Crop Market Prices endpoint tests"""
    
    def test_crop_prices_returns_12_crops(self):
        """Test crop prices returns exactly 12 crops"""
        response = requests.get(f"{BASE_URL}/api/crop-prices")
        assert response.status_code == 200
        
        data = response.json()
        assert data["success"] == True
        assert "data" in data
        
        crops = data["data"]["crops"]
        assert len(crops) == 12
    
    def test_crop_prices_structure(self):
        """Test crop prices data structure"""
        response = requests.get(f"{BASE_URL}/api/crop-prices")
        assert response.status_code == 200
        
        data = response.json()
        crops = data["data"]["crops"]
        
        for crop in crops:
            assert "id" in crop
            assert "name_en" in crop
            assert "name_hi" in crop
            assert "price" in crop
            assert "unit" in crop
            assert "change" in crop
            assert "mandi" in crop
            assert "state" in crop
            assert "lastUpdated" in crop
            
            # Validate data types
            assert isinstance(crop["id"], int)
            assert isinstance(crop["price"], int)
            assert isinstance(crop["change"], (int, float))
            assert crop["unit"] == "quintal"
    
    def test_crop_prices_has_disclaimers(self):
        """Test crop prices includes Hindi and English disclaimers"""
        response = requests.get(f"{BASE_URL}/api/crop-prices")
        assert response.status_code == 200
        
        data = response.json()
        assert "disclaimer_en" in data["data"]
        assert "disclaimer_hi" in data["data"]
        assert len(data["data"]["disclaimer_en"]) > 0
        assert len(data["data"]["disclaimer_hi"]) > 0
    
    def test_crop_prices_has_gainers_and_losers(self):
        """Test crop prices includes both gainers (positive change) and losers (negative change)"""
        response = requests.get(f"{BASE_URL}/api/crop-prices")
        assert response.status_code == 200
        
        data = response.json()
        crops = data["data"]["crops"]
        
        gainers = [c for c in crops if c["change"] > 0]
        losers = [c for c in crops if c["change"] < 0]
        
        # Should have at least some gainers and losers
        assert len(gainers) >= 1, "Should have at least one gainer"
        assert len(losers) >= 1, "Should have at least one loser"
    
    def test_crop_prices_expected_crops(self):
        """Test crop prices includes expected Indian crops"""
        response = requests.get(f"{BASE_URL}/api/crop-prices")
        assert response.status_code == 200
        
        data = response.json()
        crops = data["data"]["crops"]
        crop_names = [c["name_en"] for c in crops]
        
        expected_crops = ["Wheat", "Cotton", "Soybean", "Sugarcane", "Mustard", "Maize", "Onion", "Potato", "Tomato"]
        for expected in expected_crops:
            assert expected in crop_names, f"{expected} should be in crop list"


class TestHealthEndpoint:
    """Health check endpoint test"""
    
    def test_health_check(self):
        """Test health endpoint returns ok"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        
        data = response.json()
        assert data["status"] == "ok"


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
