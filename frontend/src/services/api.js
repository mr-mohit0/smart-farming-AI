import axios from 'axios';

const API_URL = process.env.REACT_APP_BACKEND_URL;

export const askAI = async (type, data) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/ask-ai`,
      { type, ...data },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const analyzeImage = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);

    const response = await axios.post(
      `${API_URL}/api/analyze-image`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || error.message;
  }
};

export const getWeather = async (city) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e742c4876673632c3ed939eb2c29134a&units=metric`
    );
    return {
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      condition: response.data.weather[0].description,
      city: response.data.name
    };
  } catch (error) {
    console.error('Weather error:', error);
    return null;
  }
};
