#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime

class SmartFarmingAPITester:
    def __init__(self, base_url="https://crop-guidance-hub.preview.emergentagent.com"):
        self.base_url = base_url
        self.session = requests.Session()
        self.tests_run = 0
        self.tests_passed = 0
        self.user_data = None

    def run_test(self, name, method, endpoint, expected_status, data=None, files=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'} if not files else {}
        
        self.tests_run += 1
        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = self.session.get(url, headers=headers)
            elif method == 'POST':
                if files:
                    response = self.session.post(url, files=files)
                else:
                    response = self.session.post(url, json=data, headers=headers)
            elif method == 'DELETE':
                response = self.session.delete(url, headers=headers)

            success = response.status_code == expected_status
            if success:
                self.tests_passed += 1
                print(f"✅ Passed - Status: {response.status_code}")
                try:
                    response_data = response.json()
                    print(f"   Response: {json.dumps(response_data, indent=2)[:200]}...")
                except:
                    print(f"   Response: {response.text[:200]}...")
            else:
                print(f"❌ Failed - Expected {expected_status}, got {response.status_code}")
                print(f"   Response: {response.text[:300]}...")

            return success, response.json() if response.text and response.text.strip() else {}

        except Exception as e:
            print(f"❌ Failed - Error: {str(e)}")
            return False, {}

    def test_health_check(self):
        """Test health endpoint"""
        success, response = self.run_test("Health Check", "GET", "api/health", 200)
        return success, response

    def test_register(self):
        """Test user registration"""
        test_user_data = {
            "email": f"test_user_{datetime.now().strftime('%H%M%S')}@test.com",
            "password": "TestPass123!",
            "name": "Test Farmer"
        }
        
        success, response = self.run_test(
            "User Registration",
            "POST",
            "api/auth/register",
            201,
            data=test_user_data
        )
        
        if success:
            self.user_data = response
            
        return success

    def test_login_admin(self):
        """Test admin login"""
        admin_data = {
            "email": "admin@smartfarming.com",
            "password": "admin123"
        }
        
        success, response = self.run_test(
            "Admin Login",
            "POST",
            "api/auth/login",
            200,
            data=admin_data
        )
        
        if success:
            self.user_data = response
            
        return success

    def test_get_me(self):
        """Test get current user"""
        success, response = self.run_test("Get Current User", "GET", "api/auth/me", 200)
        return success, response

    def test_crop_recommendation(self):
        """Test crop recommendation AI"""
        crop_data = {
            "type": "crop",
            "soil": "loamy",
            "season": "winter",
            "location": "Delhi"
        }
        
        success, response = self.run_test(
            "Crop Recommendation",
            "POST",
            "api/ask-ai",
            200,
            data=crop_data
        )
        return success, response

    def test_disease_detection(self):
        """Test disease detection AI"""
        disease_data = {
            "type": "disease",
            "symptoms": "yellow leaves, brown spots, wilting"
        }
        
        success, response = self.run_test(
            "Disease Detection",
            "POST",
            "api/ask-ai",
            200,
            data=disease_data
        )
        return success, response

    def test_image_analysis_no_file(self):
        """Test image analysis without file (should fail)"""
        success, response = self.run_test(
            "Image Analysis (No File)",
            "POST",
            "api/analyze-image",
            400
        )
        return success, response

    def test_logout(self):
        """Test logout"""
        success, response = self.run_test("Logout", "POST", "api/auth/logout", 200)
        return success, response

    def run_all_tests(self):
        """Run all tests in sequence"""
        print("🚀 Starting Smart Farming AI Assistant API Tests")
        print("=" * 60)
        
        # Test health check first
        health_result = self.test_health_check()
        if not health_result[0]:
            print("❌ Health check failed, stopping tests")
            return False
            
        # Test authentication flow
        print("\n📋 Testing Authentication Flow...")
        register_result = self.test_register()
        if not register_result[0]:
            print("⚠️  Registration failed, trying admin login...")
            login_result = self.test_login_admin()
            if not login_result[0]:
                print("❌ Both registration and admin login failed")
                return False
        
        # Test protected endpoint
        me_result = self.test_get_me()
        if not me_result[0]:
            print("❌ Get current user failed")
            
        # Test AI endpoints
        print("\n🤖 Testing AI Endpoints...")
        self.test_crop_recommendation()
        self.test_disease_detection()
        self.test_image_analysis_no_file()
        
        # Test logout
        print("\n🚪 Testing Logout...")
        self.test_logout()
        
        return True

def main():
    tester = SmartFarmingAPITester()
    
    try:
        tester.run_all_tests()
    except KeyboardInterrupt:
        print("\n⏹️  Tests interrupted by user")
    except Exception as e:
        print(f"\n💥 Unexpected error: {str(e)}")
    
    # Print final results
    print("\n" + "=" * 60)
    print(f"📊 Final Results: {tester.tests_passed}/{tester.tests_run} tests passed")
    
    if tester.tests_passed == tester.tests_run:
        print("🎉 All tests passed!")
        return 0
    else:
        print(f"⚠️  {tester.tests_run - tester.tests_passed} tests failed")
        return 1

if __name__ == "__main__":
    sys.exit(main())