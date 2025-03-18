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
        // Process only unique dates to avoid duplicates
        const uniqueData = forecast.list.reduce((acc: ForecastDataPoint[], item) => {
          const date = new Date(item.dt * 1000).toLocaleDateString()
          if (!acc.find(d => d.date === date)) {
            acc.push({
              date,
              temperature: Math.round(item.main.temp),
              humidity: item.main.humidity
            })
          }
          return acc
        }, []).slice(0, 15) // Get first 15 days

        setData(uniqueData)
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

  return (
    <WeatherCard title="Weather Trends" loading={loading}>
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="h-[400px] w-full" data-testid="weather-trends-chart">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 25 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  angle={-45}
                  textAnchor="end"
                  height={60}
                  tick={{ fontSize: 12 }}
                />
                <YAxis
                  yAxisId="left"
                  label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  label={{ value: 'Humidity (%)', angle: 90, position: 'insideRight' }}
                />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="temperature"
                  stroke="#8884d8"
                  name="Temperature (°C)"
                  dot={false}
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="humidity"
                  stroke="#82ca9d"
                  name="Humidity (%)"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No data available
            </div>
          )}
        </div>
      )}
    </WeatherCard>
  )
}

export default WeatherTrends