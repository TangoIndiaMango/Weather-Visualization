import { useEffect, useState } from 'react'
import { getForecast } from '@/services/weatherApi'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'
import WeatherCard from '../weather/WeatherCard'

interface WeatherTrendsProps {
  city: string
}

interface ForecastDataPoint {
  date: string
  temperature: number
  humidity: number
}

const WeatherTrends = ({ city }: WeatherTrendsProps) => {
  const [data, setData] = useState<ForecastDataPoint[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        setLoading(true)
        const forecast = await getForecast(city)
        const processedData = forecast.list
          .slice(0, 15) // Get 15 days of data
          .map(item => ({
            date: new Date(item.dt * 1000).toLocaleDateString(),
            temperature: Math.round(item.main.temp),
            humidity: item.main.humidity
          }))
        setData(processedData)
        setError(null)
      } catch (err) {
        setError('Failed to fetch forecast data')
      } finally {
        setLoading(false)
      }
    }

    if (city) {
      fetchForecastData()
    }
  }, [city])

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  return (
    <WeatherCard title="Weather Trends" loading={loading}>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="date" 
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="temperature"
              stroke="#8884d8"
              name="Temperature (°C)"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="humidity"
              stroke="#82ca9d"
              name="Humidity (%)"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </WeatherCard>
  )
}

export default WeatherTrends