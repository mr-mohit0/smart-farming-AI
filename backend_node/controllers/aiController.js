const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');
const fs = require('fs');
const path = require('path');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function getWeatherData(location) {
  if (!location) return null;
  
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.OPENWEATHER_API_KEY}&units=metric`
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

function buildPrompt(type, data, weather) {
  let basePrompt = '';
  
  if (type === 'crop') {
    basePrompt = `आप भारतीय किसानों के लिए एक कृषि विशेषज्ञ हैं। निम्नलिखित जानकारी के आधार पर सर्वोत्तम फसल की सिफारिश करें:\n\n`;
    basePrompt += `मिट्टी का प्रकार: ${data.soil || 'नहीं दिया गया'}\n`;
    basePrompt += `मौसम: ${data.season || 'नहीं दिया गया'}\n`;
    if (data.location) basePrompt += `स्थान: ${data.location}\n`;
    
    if (weather) {
      basePrompt += `\nवर्तमान मौसम:\n`;
      basePrompt += `तापमान: ${weather.temperature}°C\n`;
      basePrompt += `आर्द्रता: ${weather.humidity}%\n`;
      basePrompt += `स्थिति: ${weather.condition}\n`;
    }
    
    basePrompt += `\nकृपया निम्नलिखित JSON प्रारूप में उत्तर दें:\n{\n  "crop": "फसल का नाम",\n  "reason": "इस फसल की सिफारिश का कारण",\n  "tips": "खेती के लिए महत्वपूर्ण सुझाव",\n  "expectedYield": "अपेक्षित उपज की जानकारी"\n}\n\nकेवल JSON में उत्तर दें, कोई अतिरिक्त टेक्स्ट न जोड़ें।`;
  } else if (type === 'disease') {
    basePrompt = `आप एक पौधों की बीमारी विशेषज्ञ हैं। निम्नलिखित लक्षणों के आधार पर पौधे की बीमारी की पहचान करें और उपचार बताएं:\n\n`;
    basePrompt += `लक्षण: ${data.symptoms}\n`;
    
    basePrompt += `\nकृपया निम्नलिखित JSON प्रारूप में उत्तर दें:\n{\n  "disease": "बीमारी का नाम",\n  "cause": "बीमारी का कारण",\n  "solution": "उपचार और रोकथाम के उपाय",\n  "severity": "गंभीरता का स्तर (हल्का/मध्यम/गंभीर)"\n}\n\nकेवल JSON में उत्तर दें, कोई अतिरिक्त टेक्स्ट न जोड़ें।`;
  }
  
  return basePrompt;
}

function parseAIResponse(text) {
  try {
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    return JSON.parse(text);
  } catch (error) {
    console.error('JSON parse error:', error);
    return null;
  }
}

async function askAI(req, res) {
  try {
    const { type, soil, season, symptoms, location } = req.body;
    
    if (!type || (type !== 'crop' && type !== 'disease')) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid request type' 
      });
    }
    
    const weather = await getWeatherData(location);
    
    const prompt = buildPrompt(type, { soil, season, symptoms, location }, weather);
    
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const parsedData = parseAIResponse(text);
    
    if (!parsedData) {
      const fallback = type === 'crop' 
        ? { crop: 'गेहूं', reason: 'सामान्य सिफारिश', tips: 'उचित सिंचाई और उर्वरक का उपयोग करें', expectedYield: 'मध्यम' }
        : { disease: 'अज्ञात', cause: 'अधिक जानकारी की आवश्यकता', solution: 'स्थानीय कृषि विशेषज्ञ से परामर्श करें', severity: 'अज्ञात' };
      
      return res.json({
        success: true,
        data: { ...fallback, weather },
        note: 'AI response parsing failed, showing fallback'
      });
    }
    
    res.json({
      success: true,
      data: { ...parsedData, weather }
    });
    
  } catch (error) {
    console.error('AI Error:', error);
    
    const weather = await getWeatherData(req.body.location).catch(() => null);
    
    const fallback = req.body.type === 'crop'
      ? { crop: 'गेहूं', reason: 'सामान्य सिफारिश', tips: 'उचित सिंचाई और उर्वरक का उपयोग करें', expectedYield: 'मध्यम' }
      : { disease: 'अज्ञात', cause: 'अधिक जानकारी की आवश्यकता', solution: 'स्थानीय कृषि विशेषज्ञ से परामर्श करें', severity: 'अज्ञात' };
    
    res.json({
      success: true,
      data: { ...fallback, weather },
      note: 'Using fallback due to AI error'
    });
  }
}

async function analyzeImage(req, res) {
  let filePath = null;
  
  try {
    if (!req.file) {
      return res.status(400).json({ 
        success: false, 
        message: 'No image file uploaded' 
      });
    }
    
    filePath = req.file.path;
    
    const imageData = fs.readFileSync(filePath);
    const base64Image = imageData.toString('base64');
    
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    
    const prompt = `इस पौधे की पत्ती की छवि का सावधानीपूर्वक विश्लेषण करें। यदि कोई बीमारी मौजूद है तो उसकी पहचान करें।\n\nनिम्नलिखित JSON प्रारूप में उत्तर प्रदान करें:\n{\n  "disease": "बीमारी का नाम (या 'स्वस्थ' यदि कोई बीमारी नहीं)",\n  "cause": "बीमारी का कारण",\n  "solution": "उपचार और रोकथाम के उपाय",\n  "severity": "गंभीरता का स्तर (हल्का/मध्यम/गंभीर)",\n  "confidence": "विश्लेषण में विश्वास का स्तर (कम/मध्यम/उच्च)"\n}\n\nकेवल JSON में उत्तर दें।`;
    
    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Image,
          mimeType: req.file.mimetype
        }
      }
    ]);
    
    const response = await result.response;
    const text = response.text();
    
    const parsedData = parseAIResponse(text);
    
    fs.unlinkSync(filePath);
    
    if (!parsedData) {
      return res.json({
        success: true,
        data: {
          disease: 'विश्लेषण अधूरा',
          cause: 'छवि स्पष्ट नहीं है',
          solution: 'बेहतर गुणवत्ता वाली छवि अपलोड करें या विशेषज्ञ से परामर्श करें',
          severity: 'अज्ञात',
          confidence: 'कम'
        },
        note: 'AI response parsing failed'
      });
    }
    
    res.json({
      success: true,
      data: parsedData
    });
    
  } catch (error) {
    console.error('Image Analysis Error:', error);
    
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
    
    res.json({
      success: true,
      data: {
        disease: 'विश्लेषण विफल',
        cause: 'तकनीकी समस्या',
        solution: 'कृपया पुनः प्रयास करें या स्थानीय विशेषज्ञ से संपर्क करें',
        severity: 'अज्ञात',
        confidence: 'कम'
      },
      note: 'Using fallback due to error'
    });
  }
}

module.exports = { askAI, analyzeImage };