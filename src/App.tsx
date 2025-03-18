import { useState } from 'react'
import RootLayout from './components/layout/RootLayout'
import ErrorBoundary from './components/ui/ErrorBoundary'
import LocationSearch from './components/weather/LocationSearch'
import CurrentWeather from './components/weather/CurrentWeather'
import WeatherTrends from './components/visualization/WeatherTrends'

function App() {
  const [selectedCity, setSelectedCity] = useState('')

  return (
    <ErrorBoundary>
      <RootLayout>
        <div className="space-y-4">
          <LocationSearch onSearch={setSelectedCity} />
          
          <div className="grid gap-4 md:grid-cols-2">
            {selectedCity && (
              <>
                <CurrentWeather city={selectedCity} />
                <div className="col-span-2">
                  <WeatherTrends city={selectedCity} />
                </div>
              </>
            )}
          </div>
        </div>
      </RootLayout>
    </ErrorBoundary>
  )
}

export default App
