import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import WeatherTrends from '../WeatherTrends'
import { getForecast } from '@/services/weatherApi'

vi.mock('@/services/weatherApi', () => ({
  getForecast: vi.fn()
}))

describe('WeatherTrends Component', () => {
  const mockForecastData = {
    list: [
      {
        dt: 1647345600,
        main: {
          temp: 20,
          humidity: 65
        }
      }
    ]
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders chart when data is available', async () => {
    vi.mocked(getForecast).mockResolvedValueOnce(mockForecastData)
    render(<WeatherTrends city="London" />)
    
    await waitFor(() => {
      expect(screen.getByTestId('weather-trends-chart')).toBeInTheDocument()
    })
  })
})