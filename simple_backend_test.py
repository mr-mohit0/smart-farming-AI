#!/usr/bin/env python3

import requests
import sys
import json

def test_backend_apis():
    base_url = "https://crop-guidance-hub.preview.emergentagent.com"
    session = requests.Session()
    
    print("🚀 Testing Smart Farming AI Assistant Backend APIs")
    print("=" * 60)
    
    results = {
        "passed": 0,
        "total": 0,
        "details": []
    }
    
    # Test 1: Health Check
    print("\n1. Testing Health Check...")
    try:
        response = session.get(f"{base_url}/api/health")
        if response.status_code == 200:
            print("✅ Health check passed")
            results["passed"] += 1
            results["details"].append({"test": "Health Check", "status": "PASS", "response": response.json()})
        else:
            print(f"❌ Health check failed: {response.status_code}")
            results["details"].append({"test": "Health Check", "status": "FAIL", "error": f"Status {response.status_code}"})
    except Exception as e:
        print(f"❌ Health check error: {e}")
        results["details"].append({"test": "Health Check", "status": "ERROR", "error": str(e)})
    results["total"] += 1
    
    # Test 2: User Registration
    print("\n2. Testing User Registration...")
    try:
        user_data = {
            "email": "test_farmer@test.com",
            "password": "TestPass123!",
            "name": "Test Farmer"
        }
        response = session.post(f"{base_url}/api/auth/register", json=user_data)
        if response.status_code == 201:
            print("✅ Registration passed")
            results["passed"] += 1
            results["details"].append({"test": "Registration", "status": "PASS", "response": response.json()})
        else:
            print(f"❌ Registration failed: {response.status_code} - {response.text}")
            results["details"].append({"test": "Registration", "status": "FAIL", "error": f"Status {response.status_code}"})
    except Exception as e:
        print(f"❌ Registration error: {e}")
        results["details"].append({"test": "Registration", "status": "ERROR", "error": str(e)})
    results["total"] += 1
    
    # Test 3: Admin Login
    print("\n3. Testing Admin Login...")
    try:
        admin_data = {
            "email": "admin@smartfarming.com",
            "password": "admin123"
        }
        response = session.post(f"{base_url}/api/auth/login", json=admin_data)
        if response.status_code == 200:
            print("✅ Admin login passed")
            results["passed"] += 1
            results["details"].append({"test": "Admin Login", "status": "PASS", "response": response.json()})
        else:
            print(f"❌ Admin login failed: {response.status_code} - {response.text}")
            results["details"].append({"test": "Admin Login", "status": "FAIL", "error": f"Status {response.status_code}"})
    except Exception as e:
        print(f"❌ Admin login error: {e}")
        results["details"].append({"test": "Admin Login", "status": "ERROR", "error": str(e)})
    results["total"] += 1
    
    # Test 4: Crop Recommendation
    print("\n4. Testing Crop Recommendation...")
    try:
        crop_data = {
            "type": "crop",
            "soil": "loamy",
            "season": "winter",
            "location": "Delhi"
        }
        response = session.post(f"{base_url}/api/ask-ai", json=crop_data)
        if response.status_code == 200:
            print("✅ Crop recommendation passed")
            results["passed"] += 1
            results["details"].append({"test": "Crop Recommendation", "status": "PASS", "response": response.json()})
        else:
            print(f"❌ Crop recommendation failed: {response.status_code} - {response.text}")
            results["details"].append({"test": "Crop Recommendation", "status": "FAIL", "error": f"Status {response.status_code}"})
    except Exception as e:
        print(f"❌ Crop recommendation error: {e}")
        results["details"].append({"test": "Crop Recommendation", "status": "ERROR", "error": str(e)})
    results["total"] += 1
    
    # Test 5: Disease Detection
    print("\n5. Testing Disease Detection...")
    try:
        disease_data = {
            "type": "disease",
            "symptoms": "yellow leaves, brown spots, wilting"
        }
        response = session.post(f"{base_url}/api/ask-ai", json=disease_data)
        if response.status_code == 200:
            print("✅ Disease detection passed")
            results["passed"] += 1
            results["details"].append({"test": "Disease Detection", "status": "PASS", "response": response.json()})
        else:
            print(f"❌ Disease detection failed: {response.status_code} - {response.text}")
            results["details"].append({"test": "Disease Detection", "status": "FAIL", "error": f"Status {response.status_code}"})
    except Exception as e:
        print(f"❌ Disease detection error: {e}")
        results["details"].append({"test": "Disease Detection", "status": "ERROR", "error": str(e)})
    results["total"] += 1
    
    # Test 6: Image Analysis (no file - should fail)
    print("\n6. Testing Image Analysis (no file)...")
    try:
        response = session.post(f"{base_url}/api/analyze-image")
        if response.status_code == 400:
            print("✅ Image analysis validation passed (correctly rejected no file)")
            results["passed"] += 1
            results["details"].append({"test": "Image Analysis Validation", "status": "PASS", "response": "Correctly rejected no file"})
        else:
            print(f"❌ Image analysis validation failed: {response.status_code} - {response.text}")
            results["details"].append({"test": "Image Analysis Validation", "status": "FAIL", "error": f"Status {response.status_code}"})
    except Exception as e:
        print(f"❌ Image analysis error: {e}")
        results["details"].append({"test": "Image Analysis Validation", "status": "ERROR", "error": str(e)})
    results["total"] += 1
    
    # Print summary
    print("\n" + "=" * 60)
    print(f"📊 Backend API Test Results: {results['passed']}/{results['total']} tests passed")
    
    return results

if __name__ == "__main__":
    results = test_backend_apis()
    sys.exit(0 if results["passed"] == results["total"] else 1)