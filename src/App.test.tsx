import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import App from './App'

// Mock child components
vi.mock('./components/layout/RootLayout', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

vi.mock('./components/ui/ErrorBoundary', () => ({
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}))

vi.mock('./components/weather/LocationSearch', () => ({
  default: ({ onSearch }: { onSearch: (city: string) => void }) => (
    <input
      data-testid="city-search"
      onChange={(e) => onSearch(e.target.value)}
    />
  )
}))

vi.mock('./components/weather/CurrentWeather', () => ({
  default: ({ city }: { city: string }) => (
    <div data-testid="weather-display">Weather for {city}</div>
  )
}))

describe('App Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  test('renders without crashing', () => {
    render(<App />)
    expect(screen.getByTestId('city-search')).toBeInTheDocument()
  })

  test('does not show weather initially', () => {
    render(<App />)
    expect(screen.queryByTestId('weather-display')).not.toBeInTheDocument()
  })

  test('shows weather when city is selected', () => {
    render(<App />)
    const search = screen.getByTestId('city-search')
    fireEvent.change(search, { target: { value: 'London' } })
    expect(screen.getByText('Weather for London')).toBeInTheDocument()
  })

  test('updates weather display when city changes', () => {
    render(<App />)
    const search = screen.getByTestId('city-search')
    
    fireEvent.change(search, { target: { value: 'London' } })
    expect(screen.getByText('Weather for London')).toBeInTheDocument()
    
    fireEvent.change(search, { target: { value: 'Paris' } })
    expect(screen.getByText('Weather for Paris')).toBeInTheDocument()
  })
})