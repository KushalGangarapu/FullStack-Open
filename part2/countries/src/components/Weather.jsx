import { useState, useEffect } from 'react'
import weatherService from '../services/weather'

const Weather = ({ capital, latlng }) => {
  const [weather, setWeather] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!capital) return

    weatherService
      .getWeather(capital, latlng)
      .then(data => {
        setWeather(data)
        setError(null)
      })
      .catch(err => {
        setError(err.message || 'Could not fetch weather data')
        setWeather(null)
      })
  }, [capital, latlng])

  if (error) {
    return (
      <div>
        <h3>Weather in {capital}</h3>
        <p><em>{error}</em></p>
      </div>
    )
  }

  if (!weather) {
    return (
      <div>
        <h3>Weather in {capital}</h3>
        <p>Loading weather...</p>
      </div>
    )
  }

  const iconCode = weather.weather?.[0]?.icon
  const iconUrl = iconCode
    ? `https://openweathermap.org/img/wn/${iconCode}@2x.png`
    : null
  const description = weather.weather?.[0]?.description || 'weather icon'

  return (
    <div>
      <h3>Weather in {capital}</h3>
      <p>temperature {weather.main?.temp} Celcius</p>
      {iconUrl && <img src={iconUrl} alt={description} />}
      <p>wind {weather.wind?.speed} m/s</p>
    </div>
  )
}

export default Weather
