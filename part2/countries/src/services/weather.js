import axios from 'axios'

const apiKey = import.meta.env.VITE_SOME_KEY

const getWeather = (capital, latlng) => {
  if (!apiKey) {
    return Promise.reject(new Error('API key not found. Set VITE_SOME_KEY in .env'))
  }

  let url = ''
  if (latlng && latlng.length === 2) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&units=metric&appid=${apiKey}`
  } else {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(capital)}&units=metric&appid=${apiKey}`
  }

  const request = axios.get(url)
  return request.then(response => response.data)
}

export default { getWeather }
