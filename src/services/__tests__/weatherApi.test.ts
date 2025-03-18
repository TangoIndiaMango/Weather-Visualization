import { vi } from 'vitest'
import { getCurrentWeather } from '../weatherApi'
import { getForecast } from '../weatherApi'

describe('getCurrentWeather', () => {
  const mockWeatherData = {
    name: 'London',
    main: {
      temp: 20,
      feels_like: 18,
      humidity: 65
    },
    weather: [
      {
        description: 'clear sky',
        icon: '01d'
      }
    ]
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  beforeAll(() => {
    // @ts-ignore
    global.fetch = vi.fn()
  })

  afterAll(() => {
    // @ts-ignore
    global.fetch.mockClear()
    vi.resetModules()
  })

  test('successfully fetches weather data', async () => {
    // @ts-ignore
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockWeatherData)
    })

    const result = await getCurrentWeather('London')
    
    expect(result).toEqual(mockWeatherData)
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/weather?q=London')
    )
  })

  test('throws error when fetch fails', async () => {
    // @ts-ignore
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404
    })

    await expect(getCurrentWeather('InvalidCity'))
      .rejects
      .toThrow('Failed to fetch weather data')
  })

  test('throws error when network fails', async () => {
    // @ts-ignore
    global.fetch.mockRejectedValueOnce(new Error('Network error'))

    await expect(getCurrentWeather('London'))
      .rejects
      .toThrow('Network error')
  })

  test('handles malformed JSON response', async () => {
    // @ts-ignore
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.reject(new Error('Invalid JSON'))
    })

    await expect(getCurrentWeather('London'))
      .rejects
      .toThrow('Invalid JSON')
  })

//   test('includes correct query parameters', async () => {
//     // @ts-ignore
//     global.fetch.mockResolvedValueOnce({
//       ok: true,
//       json: () => Promise.resolve(mockWeatherData)
//     })

//     await getCurrentWeather('New York')
    
//     expect(fetch).toHaveBeenCalledWith(
//       expect.stringMatching(/q=New%20York.*&units=metric/)
//     )
//   })
})


describe('getForecast', () => {
  const mockForecastData = {
    list: [
      {
        dt: 1647345600,
        main: {
          temp: 20,
          feels_like: 18,
          humidity: 65
        },
        weather: [
          {
            main: 'Clear',
            description: 'clear sky',
            icon: '01d'
          }
        ]
      }
    ]
  }

  beforeEach(() => {
    vi.clearAllMocks()
    // @ts-ignore
    global.fetch = vi.fn()
  })

  test('successfully fetches forecast data', async () => {
    // @ts-ignore
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockForecastData)
    })

    const result = await getForecast('London')
    expect(result).toEqual(mockForecastData)
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/forecast?q=London')
    )
  })

  test('throws error when response is not ok', async () => {
    // @ts-ignore
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404
    })

    await expect(getForecast('InvalidCity')).rejects.toThrow('Failed to fetch forecast data')
  })

  test('throws error when network fails', async () => {
    // @ts-ignore
    global.fetch.mockRejectedValueOnce(new Error('Network error'))

    await expect(getForecast('London')).rejects.toThrow('Network error')
  })

  test('handles malformed JSON response', async () => {
    // @ts-ignore
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.reject(new Error('Invalid JSON'))
    })

    await expect(getForecast('London')).rejects.toThrow('Invalid JSON')
  })

  test('calls API with correct parameters', async () => {
    // @ts-ignore
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(mockForecastData)
    })

    await getForecast('Paris')
    
    expect(fetch).toHaveBeenCalledWith(
      expect.stringMatching(/forecast\?q=Paris.*units=metric/)
    )
  })
})