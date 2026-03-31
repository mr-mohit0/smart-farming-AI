# Smart Farming AI Assistant - PRD

## Original Problem Statement
Build a full-stack web application "Smart Farming AI Assistant" using React.js (Frontend) and Node.js/Express (Backend). The application helps farmers by providing AI-based crop recommendations, plant disease detection (text and image-based), and Hindi/English support.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Framer Motion, shadcn/ui
- **Backend**: Node.js/Express (at /app/backend_node/)
- **Database**: MongoDB
- **Integrations**: Google Gemini API (gemini-2.0-flash), OpenWeather API
- **Auth**: JWT with httpOnly cookies

## Architecture
- Frontend runs on port 3000 (supervisor: frontend)
- Backend runs on port 8001 (supervisor: nodejs_backend)
- MongoDB on default port
- Kubernetes ingress routes /api/* to backend

## Implemented Features (All Complete)
1. Responsive Navbar with Logo, Language Toggle (Hindi/English), Login/Signup, Dark Mode
2. Modern Hero Section with glassmorphism, animations, and interactive mockups
3. Dashboard with Crop Form, Disease Form, Image Upload, Result Card, History
4. Result Card with ChatGPT-like streaming/typing animation and Voice Output (TTS)
5. Educational Content Section with 4 tabs (Soil Types, Soil Erosion, Pesticides, Crop Diseases) with images
6. **Weather Forecast Dashboard** - 5-day forecast, current weather, auto-detect + manual city search, farming tips
7. **Crop Market Prices** - 12 Indian crops from major mandis, filter (All/Gainers/Losers), sort, refresh
8. Full Hindi/English bilingual support across all components
9. Dark mode toggle with proper styling on all components
10. JWT authentication (register, login, logout)
11. AI crop recommendations via Gemini API (with fallback mechanism)
12. AI disease detection via text symptoms (Gemini API)
13. AI image analysis for plant disease detection (Gemini Vision)
14. OpenWeather API integration for location-based weather data
15. About section, Features page, Health Resources page, Footer
16. Back to Top button

## API Endpoints
- `GET /api/health` - Health check
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user
- `POST /api/ask-ai` - AI crop/disease recommendations
- `POST /api/analyze-image` - Image-based disease detection
- `GET /api/weather-forecast` - 5-day weather forecast with tips (params: city or lat+lon)
- `GET /api/crop-prices` - Crop market prices (MOCKED static data with random variation)

## Known Limitations
- Gemini API free tier quota may be exceeded; fallback mechanism handles this gracefully
- Crop market prices use MOCKED static dataset (not real-time mandi API)

## Testing Status (March 31, 2026)
- Iteration 2: Backend 100% (13/13), Frontend 100%
- Iteration 3: Backend 100% (11/11), Frontend 100% (Weather + Prices features)
- Test reports: /app/test_reports/iteration_2.json, /app/test_reports/iteration_3.json

## Future/Backlog
- Real ML-based plant disease detection model
- Real-time mandi price API integration
- Mobile app version
