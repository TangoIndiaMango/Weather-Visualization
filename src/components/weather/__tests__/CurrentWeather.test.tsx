import { render, screen, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { getCurrentWeather } from '@/services/weatherApi'
import CurrentWeather from '../CurrentWeather'

vi.mock('@/services/weatherApi', () => ({
  getCurrentWeather: vi.fn()
}))

describe('CurrentWeather Component', () => {
  const mockWeatherData = {
    name: 'Paris',
    main: {
      temp: 22,
      feels_like: 20,
      humidity: 60
    },
    weather: [
      {
        description: 'partly cloudy',
        icon: '02d'
      }
    ]
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('should update weather data when city prop changes', async () => {
    // Initial render with London
    const { rerender } = render(<CurrentWeather city="London" />)
    
    // Mock the API response for Paris
    vi.mocked(getCurrentWeather).mockResolvedValueOnce(mockWeatherData)

    // Rerender with Paris
    rerender(<CurrentWeather city="Paris" />)

    // Verify API call
    await waitFor(() => {
      expect(getCurrentWeather).toHaveBeenCalledWith('Paris')
    })

    // Verify updated content
    await waitFor(() => {
      expect(screen.getByText('Paris')).toBeInTheDocument()
      expect(screen.getByText('22°C')).toBeInTheDocument()
      expect(screen.getByText('partly cloudy')).toBeInTheDocument()
      expect(screen.getByText('60%')).toBeInTheDocument()
    })
  })

  test('should handle multiple city changes', async () => {
    const { rerender } = render(<CurrentWeather city="London" />)
    
    // First change to Paris
    vi.mocked(getCurrentWeather).mockResolvedValueOnce(mockWeatherData)
    rerender(<CurrentWeather city="Paris" />)
    
    await waitFor(() => {
      expect(getCurrentWeather).toHaveBeenCalledWith('Paris')
    })

    // Then change to Tokyo
    const tokyoData = { ...mockWeatherData, name: 'Tokyo' }
    vi.mocked(getCurrentWeather).mockResolvedValueOnce(tokyoData)
    rerender(<CurrentWeather city="Tokyo" />)

    await waitFor(() => {
      expect(getCurrentWeather).toHaveBeenCalledWith('Tokyo')
    })
  })

//   test('should handle empty city prop change', async () => {
//     const { rerender } = render(<CurrentWeather city="London" />)
    
//     // Change to empty city
//     rerender(<CurrentWeather city="" />)

//     // Verify no API call was made
//     expect(getCurrentWeather).not.toHaveBeenCalled()
//   })
})