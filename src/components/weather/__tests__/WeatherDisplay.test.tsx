import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { getCurrentWeather } from '@/services/weatherApi'
import CurrentWeather from '../CurrentWeather'

vi.mock('@/services/weatherApi', () => ({
  getCurrentWeather: vi.fn()
}))

describe('Weather Display Tests', () => {
  const mockWeatherData = {
    name: 'London',
    main: {
      temp: 20,
      feels_like: 18,
      humidity: 65,
      pressure: 1013
    },
    weather: [
      {
        main: 'Clear',
        description: 'clear sky',
        icon: '01d'
      }
    ],
    wind: {
      speed: 5.2
    }
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('displays weather data correctly after successful API call', async () => {
    vi.mocked(getCurrentWeather).mockResolvedValueOnce(mockWeatherData)
    render(<CurrentWeather city="London" />)

    await waitFor(() => {
      expect(screen.getByText('London')).toBeInTheDocument()
      expect(screen.getByText('20°C')).toBeInTheDocument()
      expect(screen.getByText('clear sky')).toBeInTheDocument()
      expect(screen.getByText('65%')).toBeInTheDocument()
    })
  })

//   test('displays loading state before data arrives', () => {
//     vi.mocked(getCurrentWeather).mockImplementationOnce(() => 
//       new Promise((resolve) => setTimeout(() => resolve(mockWeatherData), 100))
//     )
    
//     render(<CurrentWeather city="London" />)
//     expect(screen.getByTestId('weather-loading')).toBeInTheDocument()
//   })

  test('handles API error gracefully', async () => {
    vi.mocked(getCurrentWeather).mockRejectedValueOnce(new Error('API Error'))
    render(<CurrentWeather city="London" />)

    await waitFor(() => {
      expect(screen.getByText('Failed to fetch weather data')).toBeInTheDocument()
    })
  })

  test('updates weather data when city changes', async () => {
    const { rerender } = render(<CurrentWeather city="London" />)
    
    vi.mocked(getCurrentWeather).mockResolvedValueOnce({
      ...mockWeatherData,
      name: 'Paris',
      main: { ...mockWeatherData.main, temp: 25 }
    })

    rerender(<CurrentWeather city="Paris" />)

    await waitFor(() => {
      expect(screen.getByText('Paris')).toBeInTheDocument()
      expect(screen.getByText('25°C')).toBeInTheDocument()
    })
  })

  test('does not make API call when city is empty', () => {
    render(<CurrentWeather city="" />)
    expect(getCurrentWeather).not.toHaveBeenCalled()
  })
})