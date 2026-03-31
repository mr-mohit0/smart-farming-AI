const axios = require('axios');
const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');

const PYTHON_PATH = '/root/.venv/bin/python3';
const AI_SERVICE_PATH = path.join(__dirname, '..', 'ai_service.py');

function callAIService(inputData) {
  return new Promise((resolve, reject) => {
    const inputJson = JSON.stringify(inputData);
    execFile(
      PYTHON_PATH,
      [AI_SERVICE_PATH, inputJson],
      {
        timeout: 60000,
        env: { ...process.env },
        maxBuffer: 1024 * 1024
      },
      (error, stdout, stderr) => {
        if (stderr) {
          console.error('AI Service stderr:', stderr.substring(0, 500));
        }
        if (error) {
          return reject(new Error(`AI Service error: ${error.message}`));
        }
        try {
          const result = JSON.parse(stdout.trim());
          if (result.error) {
            return reject(new Error(result.error));
          }
          resolve(result);
        } catch (parseErr) {
          reject(new Error(`Failed to parse AI response: ${stdout.substring(0, 200)}`));
        }
      }
    );
  });
}

async function getWeatherData(location) {
  if (!location) return null;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
    );
    return {
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      condition: response.data.weather[0].description,
      city: response.data.name
    };
  } catch (error) {
    console.error('Weather API error:', error.message);
    return null;
  }
}

function validateCropInput(body) {
  const errors = [];
  if (!body.soil || typeof body.soil !== 'string') errors.push('Soil type is required');
  if (!body.season || typeof body.season !== 'string') errors.push('Season is required');
  return errors;
}

function validateDiseaseInput(body) {
  const errors = [];
  if (!body.symptoms || typeof body.symptoms !== 'string' || body.symptoms.trim().length < 3) {
    errors.push('Symptoms description is required (at least 3 characters)');
  }
  return errors;
}

async function askAI(req, res) {
  try {
    const { type, soil, season, symptoms, location } = req.body;

    if (!type || (type !== 'crop' && type !== 'disease')) {
      return res.status(400).json({ success: false, message: 'Invalid request type. Must be "crop" or "disease".' });
    }

    // Validate inputs
    const validationErrors = type === 'crop'
      ? validateCropInput(req.body)
      : validateDiseaseInput(req.body);

    if (validationErrors.length > 0) {
      return res.status(400).json({ success: false, message: validationErrors.join(', ') });
    }

    // Fetch weather data in parallel
    const weather = await getWeatherData(location);

    const aiInput = { type, soil, season, symptoms, location, weather };

    // Attempt 1
    let result;
    try {
      result = await callAIService(aiInput);
    } catch (firstError) {
      console.error('AI Service attempt 1 failed:', firstError.message);
      // Retry once
      try {
        result = await callAIService(aiInput);
      } catch (retryError) {
        console.error('AI Service attempt 2 failed:', retryError.message);
        // Return fallback only after both attempts fail
        const fallback = type === 'crop'
          ? { crop: 'Wheat (Gehu)', reason: 'General recommendation - AI service temporarily unavailable. Wheat is a versatile crop suitable for most conditions.', tips: 'Ensure proper irrigation and use balanced fertilizers. Best planted during Rabi season.', expectedYield: 'Moderate' }
          : { disease: 'Unknown', cause: 'More detailed symptoms needed - AI service temporarily unavailable.', solution: 'Please consult a local agricultural expert for accurate diagnosis.', severity: 'Unknown' };

        return res.json({
          success: true,
          data: { ...fallback, weather },
          note: 'AI service temporarily unavailable. Showing general recommendation.',
          isRealtime: false
        });
      }
    }

    // Return real-time AI response
    res.json({
      success: true,
      data: { ...result.data, weather },
      isRealtime: true
    });

  } catch (error) {
    console.error('askAI unexpected error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

async function analyzeImage(req, res) {
  let filePath = null;

  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No image file uploaded' });
    }

    filePath = req.file.path;

    const imageData = fs.readFileSync(filePath);
    const base64Image = imageData.toString('base64');

    // Use the Google Generative AI directly for image analysis with Emergent key
    const { GoogleGenerativeAI } = require('@google/generative-ai');
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    const prompt = `Carefully analyze this plant leaf image. Identify any disease present.

Respond ONLY with this JSON format (no markdown, no code fences):
{
  "disease": "Name of the disease (or 'Healthy' if no disease)",
  "cause": "Cause of the disease",
  "solution": "Treatment and prevention measures",
  "severity": "Severity level (Mild/Moderate/Severe)",
  "confidence": "Confidence level (Low/Medium/High)"
}`;

    const result = await model.generateContent([
      prompt,
      { inlineData: { data: base64Image, mimeType: req.file.mimetype } }
    ]);

    const response = await result.response;
    const text = response.text();

    fs.unlinkSync(filePath);
    filePath = null;

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsedData = JSON.parse(jsonMatch[0]);
      return res.json({ success: true, data: parsedData, isRealtime: true });
    }

    const parsedData = JSON.parse(text);
    res.json({ success: true, data: parsedData, isRealtime: true });

  } catch (error) {
    console.error('Image Analysis Error:', error.message);

    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.json({
      success: true,
      data: {
        disease: 'Analysis failed',
        cause: 'Technical issue with image analysis service',
        solution: 'Please try again or consult a local agricultural expert.',
        severity: 'Unknown',
        confidence: 'Low'
      },
      note: 'Image analysis service temporarily unavailable',
      isRealtime: false
    });
  }
}

module.exports = { askAI, analyzeImage };
