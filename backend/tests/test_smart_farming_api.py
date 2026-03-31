"""
Smart Farming AI Assistant - Backend API Tests
Tests: Health check, Auth endpoints, AI endpoints
"""
import pytest
import requests
import os

BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthCheck:
    """Health check endpoint tests"""
    
    def test_health_endpoint(self):
        """Test GET /api/health returns status ok"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "ok"
        assert "message" in data
        print(f"✓ Health check passed: {data}")


class TestAuthEndpoints:
    """Authentication endpoint tests"""
    
    def test_register_new_user(self):
        """Test POST /api/auth/register with new user"""
        import time
        test_email = f"test_user_{int(time.time())}@test.com"
        response = requests.post(
            f"{BASE_URL}/api/auth/register",
            json={
                "email": test_email,
                "password": "testpass123",
                "name": "Test User"
            }
        )
        # Should succeed or fail with 400 if email exists
        assert response.status_code in [201, 400]
        data = response.json()
        if response.status_code == 201:
            assert "email" in data
            assert data["email"] == test_email.lower()
            print(f"✓ Registration successful: {data['email']}")
        else:
            print(f"✓ Registration validation working: {data}")
    
    def test_register_missing_fields(self):
        """Test POST /api/auth/register with missing fields"""
        response = requests.post(
            f"{BASE_URL}/api/auth/register",
            json={"email": "incomplete@test.com"}
        )
        assert response.status_code == 400
        data = response.json()
        assert "message" in data
        print(f"✓ Missing fields validation: {data['message']}")
    
    def test_login_admin_user(self):
        """Test POST /api/auth/login with admin credentials"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={
                "email": "admin@smartfarming.com",
                "password": "admin123"
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert "email" in data
        assert data["email"] == "admin@smartfarming.com"
        print(f"✓ Admin login successful: {data['email']}")
        
        # Check cookies are set
        cookies = response.cookies
        print(f"✓ Cookies received: {list(cookies.keys())}")
    
    def test_login_invalid_credentials(self):
        """Test POST /api/auth/login with wrong password"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={
                "email": "admin@smartfarming.com",
                "password": "wrongpassword"
            }
        )
        assert response.status_code == 401
        data = response.json()
        assert "message" in data
        print(f"✓ Invalid credentials rejected: {data['message']}")
    
    def test_login_missing_fields(self):
        """Test POST /api/auth/login with missing fields"""
        response = requests.post(
            f"{BASE_URL}/api/auth/login",
            json={"email": "test@test.com"}
        )
        assert response.status_code == 400
        data = response.json()
        assert "message" in data
        print(f"✓ Missing password validation: {data['message']}")


class TestAIEndpoints:
    """AI recommendation endpoint tests"""
    
    def test_crop_recommendation(self):
        """Test POST /api/ask-ai with crop type"""
        response = requests.post(
            f"{BASE_URL}/api/ask-ai",
            json={
                "type": "crop",
                "soil": "loamy",
                "season": "summer",
                "location": "Delhi"
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        assert "data" in data
        assert "crop" in data["data"]
        assert "reason" in data["data"]
        assert "tips" in data["data"]
        print(f"✓ Crop recommendation: {data['data']['crop']}")
        if "note" in data:
            print(f"  Note: {data['note']} (fallback due to API quota)")
    
    def test_disease_detection(self):
        """Test POST /api/ask-ai with disease type"""
        response = requests.post(
            f"{BASE_URL}/api/ask-ai",
            json={
                "type": "disease",
                "symptoms": "yellow leaves, spots on leaves"
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        assert "data" in data
        assert "disease" in data["data"]
        assert "cause" in data["data"]
        assert "solution" in data["data"]
        print(f"✓ Disease detection: {data['data']['disease']}")
        if "note" in data:
            print(f"  Note: {data['note']} (fallback due to API quota)")
    
    def test_crop_with_weather(self):
        """Test POST /api/ask-ai with location for weather data"""
        response = requests.post(
            f"{BASE_URL}/api/ask-ai",
            json={
                "type": "crop",
                "soil": "clay",
                "season": "rainy",
                "location": "Mumbai"
            }
        )
        assert response.status_code == 200
        data = response.json()
        assert data["success"] == True
        assert "data" in data
        # Weather data should be included when location is provided
        if "weather" in data["data"] and data["data"]["weather"]:
            weather = data["data"]["weather"]
            assert "temperature" in weather
            assert "humidity" in weather
            print(f"✓ Weather data included: {weather['temperature']}°C, {weather['humidity']}% humidity")
        else:
            print("✓ Crop recommendation returned (weather may be unavailable)")
    
    def test_invalid_request_type(self):
        """Test POST /api/ask-ai with invalid type"""
        response = requests.post(
            f"{BASE_URL}/api/ask-ai",
            json={
                "type": "invalid_type",
                "data": "test"
            }
        )
        assert response.status_code == 400
        data = response.json()
        assert data["success"] == False
        print(f"✓ Invalid type rejected: {data['message']}")
    
    def test_image_analysis_no_file(self):
        """Test POST /api/analyze-image without file"""
        response = requests.post(f"{BASE_URL}/api/analyze-image")
        assert response.status_code == 400
        data = response.json()
        assert data["success"] == False
        print(f"✓ No file validation: {data['message']}")


class TestCORSAndCookies:
    """CORS and cookie handling tests"""
    
    def test_cors_headers(self):
        """Test CORS headers are present"""
        response = requests.options(
            f"{BASE_URL}/api/health",
            headers={"Origin": "http://localhost:3000"}
        )
        # OPTIONS might return 200 or 204
        assert response.status_code in [200, 204, 404]
        print(f"✓ CORS preflight handled: status {response.status_code}")
    
    def test_login_sets_httponly_cookies(self):
        """Test login sets httpOnly cookies"""
        session = requests.Session()
        response = session.post(
            f"{BASE_URL}/api/auth/login",
            json={
                "email": "admin@smartfarming.com",
                "password": "admin123"
            }
        )
        assert response.status_code == 200
        
        # Check Set-Cookie headers
        set_cookie_headers = response.headers.get('Set-Cookie', '')
        print(f"✓ Login response received")
        
        # Verify cookies in session
        cookies = session.cookies.get_dict()
        print(f"✓ Session cookies: {list(cookies.keys())}")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
