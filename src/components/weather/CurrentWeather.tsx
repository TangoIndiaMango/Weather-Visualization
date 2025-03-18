import { useEffect, useState } from 'react'
import { getCurrentWeather } from '@/services/weatherApi'
import WeatherCard from './WeatherCard'

interface CurrentWeatherProps {
  city: string;
}

const CurrentWeather = ({ city }: CurrentWeatherProps) => {
  const [weather, setWeather] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        setLoading(true)
        const data = await getCurrentWeather(city)
        setWeather(data)
        setError(null)
      } catch (err) {
        setError('Failed to fetch weather data')
      } finally {
        setLoading(false)
      }
    }

    if (city) {
      fetchWeather()
    }
  }, [city])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <WeatherCard title="Current Weather" loading={loading}>
      {loading ? (
        <div data-testid="weather-loading" className="animate-pulse">
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
            <div className="grid grid-cols-2 gap-4">
              <div className="h-12 bg-gray-200 rounded"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      ) : weather && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">{weather.name}</h3>
            <img 
              src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
              className="h-16 w-16"
            />
          </div>
          <div className="grid gap-2">
            <p className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</p>
            <p className="text-muted-foreground">{weather.weather[0].description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Feels like</p>
              <p className="font-medium">{Math.round(weather.main.feels_like)}°C</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="font-medium">{weather.main.humidity}%</p>
            </div>
          </div>
        </div>
      )}
    </WeatherCard>
  )
}

export default CurrentWeather