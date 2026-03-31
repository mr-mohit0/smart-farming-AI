"""
Test suite for AI Service API endpoints - Testing Gemini AI via Emergent LLM key integration
Tests: POST /api/ask-ai for crop and disease recommendations with real-time AI responses
"""
import pytest
import requests
import os
import time

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthCheck:
    """Health check endpoint tests"""
    
    def test_health_endpoint(self):
        """Test GET /api/health returns ok status"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data.get("status") == "ok"
        print("✅ Health check passed")


class TestCropRecommendation:
    """Crop recommendation AI endpoint tests"""
    
    def test_crop_recommendation_realtime(self):
        """Test POST /api/ask-ai with type=crop returns real-time AI response"""
        payload = {
            "type": "crop",
            "soil": "loamy",
            "season": "summer"
        }
        response = requests.post(f"{BASE_URL}/api/ask-ai", json=payload, timeout=60)
        assert response.status_code == 200
        
        data = response.json()
        assert data.get("success") == True
        assert data.get("isRealtime") == True, "Expected isRealtime=true for real AI response"
        
        # Validate response structure
        result = data.get("data", {})
        assert "crop" in result, "Response should contain 'crop' field"
        assert "reason" in result, "Response should contain 'reason' field"
        assert "tips" in result, "Response should contain 'tips' field"
        assert "expectedYield" in result, "Response should contain 'expectedYield' field"
        
        # Validate content is meaningful (not generic fallback)
        assert len(result["crop"]) > 3, "Crop name should be meaningful"
        assert len(result["reason"]) > 20, "Reason should be detailed"
        assert len(result["tips"]) > 20, "Tips should be detailed"
        
        # Should NOT be the fallback "Wheat (Gehu)" generic response
        assert "AI service temporarily unavailable" not in result.get("reason", "")
        
        print(f"✅ Crop recommendation (loamy/summer): {result['crop']}")
        print(f"   Reason: {result['reason'][:100]}...")
    
    def test_crop_recommendation_with_location(self):
        """Test POST /api/ask-ai with location returns weather data"""
        payload = {
            "type": "crop",
            "soil": "clay",
            "season": "winter",
            "location": "Delhi"
        }
        response = requests.post(f"{BASE_URL}/api/ask-ai", json=payload, timeout=60)
        assert response.status_code == 200
        
        data = response.json()
        assert data.get("success") == True
        assert data.get("isRealtime") == True
        
        result = data.get("data", {})
        assert "crop" in result
        
        # Weather should be included when location is provided
        weather = result.get("weather")
        if weather:
            assert "temperature" in weather
            assert "humidity" in weather
            print(f"✅ Weather data included: {weather.get('temperature')}°C, {weather.get('humidity')}% humidity")
        else:
            print("⚠️ Weather data not returned (API may have failed)")
        
        print(f"✅ Crop recommendation (clay/winter/Delhi): {result['crop']}")
    
    def test_crop_recommendation_sandy_rainy(self):
        """Test crop recommendation for sandy soil in rainy season"""
        payload = {
            "type": "crop",
            "soil": "sandy",
            "season": "rainy"
        }
        response = requests.post(f"{BASE_URL}/api/ask-ai", json=payload, timeout=60)
        assert response.status_code == 200
        
        data = response.json()
        assert data.get("success") == True
        assert data.get("isRealtime") == True
        
        result = data.get("data", {})
        assert "crop" in result
        assert len(result["crop"]) > 3
        
        print(f"✅ Crop recommendation (sandy/rainy): {result['crop']}")
    
    def test_crop_missing_soil_validation(self):
        """Test POST /api/ask-ai returns error for missing soil"""
        payload = {
            "type": "crop",
            "season": "summer"
        }
        response = requests.post(f"{BASE_URL}/api/ask-ai", json=payload, timeout=30)
        assert response.status_code == 400
        
        data = response.json()
        assert data.get("success") == False
        assert "soil" in data.get("message", "").lower() or "required" in data.get("message", "").lower()
        
        print(f"✅ Validation error for missing soil: {data.get('message')}")
    
    def test_crop_missing_season_validation(self):
        """Test POST /api/ask-ai returns error for missing season"""
        payload = {
            "type": "crop",
            "soil": "loamy"
        }
        response = requests.post(f"{BASE_URL}/api/ask-ai", json=payload, timeout=30)
        assert response.status_code == 400
        
        data = response.json()
        assert data.get("success") == False
        assert "season" in data.get("message", "").lower() or "required" in data.get("message", "").lower()
        
        print(f"✅ Validation error for missing season: {data.get('message')}")


class TestDiseaseDetection:
    """Disease detection AI endpoint tests"""
    
    def test_disease_detection_realtime(self):
        """Test POST /api/ask-ai with type=disease returns real-time AI response"""
        payload = {
            "type": "disease",
            "symptoms": "yellow leaves with brown spots, wilting stems"
        }
        response = requests.post(f"{BASE_URL}/api/ask-ai", json=payload, timeout=60)
        assert response.status_code == 200
        
        data = response.json()
        assert data.get("success") == True
        assert data.get("isRealtime") == True, "Expected isRealtime=true for real AI response"
        
        # Validate response structure
        result = data.get("data", {})
        assert "disease" in result, "Response should contain 'disease' field"
        assert "cause" in result, "Response should contain 'cause' field"
        assert "solution" in result, "Response should contain 'solution' field"
        assert "severity" in result, "Response should contain 'severity' field"
        
        # Validate content is meaningful
        assert len(result["disease"]) > 3, "Disease name should be meaningful"
        assert len(result["solution"]) > 20, "Solution should be detailed"
        
        # Should NOT be the fallback response
        assert "AI service temporarily unavailable" not in result.get("cause", "")
        
        print(f"✅ Disease detection: {result['disease']}")
        print(f"   Severity: {result['severity']}")
        print(f"   Solution: {result['solution'][:100]}...")
    
    def test_disease_detection_different_symptoms(self):
        """Test disease detection with different symptoms"""
        payload = {
            "type": "disease",
            "symptoms": "white powdery coating on leaves, stunted growth"
        }
        response = requests.post(f"{BASE_URL}/api/ask-ai", json=payload, timeout=60)
        assert response.status_code == 200
        
        data = response.json()
        assert data.get("success") == True
        assert data.get("isRealtime") == True
        
        result = data.get("data", {})
        assert "disease" in result
        assert "solution" in result
        
        print(f"✅ Disease detection (powdery symptoms): {result['disease']}")
    
    def test_disease_missing_symptoms_validation(self):
        """Test POST /api/ask-ai returns error for missing symptoms"""
        payload = {
            "type": "disease"
        }
        response = requests.post(f"{BASE_URL}/api/ask-ai", json=payload, timeout=30)
        assert response.status_code == 400
        
        data = response.json()
        assert data.get("success") == False
        assert "symptoms" in data.get("message", "").lower() or "required" in data.get("message", "").lower()
        
        print(f"✅ Validation error for missing symptoms: {data.get('message')}")
    
    def test_disease_short_symptoms_validation(self):
        """Test POST /api/ask-ai returns error for too short symptoms"""
        payload = {
            "type": "disease",
            "symptoms": "ab"  # Less than 3 characters
        }
        response = requests.post(f"{BASE_URL}/api/ask-ai", json=payload, timeout=30)
        assert response.status_code == 400
        
        data = response.json()
        assert data.get("success") == False
        
        print(f"✅ Validation error for short symptoms: {data.get('message')}")


class TestInvalidRequests:
    """Invalid request handling tests"""
    
    def test_invalid_type(self):
        """Test POST /api/ask-ai returns 400 for invalid type"""
        payload = {
            "type": "invalid_type",
            "soil": "loamy"
        }
        response = requests.post(f"{BASE_URL}/api/ask-ai", json=payload, timeout=30)
        assert response.status_code == 400
        
        data = response.json()
        assert data.get("success") == False
        assert "type" in data.get("message", "").lower() or "invalid" in data.get("message", "").lower()
        
        print(f"✅ Invalid type error: {data.get('message')}")
    
    def test_missing_type(self):
        """Test POST /api/ask-ai returns 400 for missing type"""
        payload = {
            "soil": "loamy",
            "season": "summer"
        }
        response = requests.post(f"{BASE_URL}/api/ask-ai", json=payload, timeout=30)
        assert response.status_code == 400
        
        data = response.json()
        assert data.get("success") == False
        
        print(f"✅ Missing type error: {data.get('message')}")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
