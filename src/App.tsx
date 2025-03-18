import { useState } from 'react'
import RootLayout from './components/layout/RootLayout'
import ErrorBoundary from './components/ui/ErrorBoundary'
import LocationSearch from './components/weather/LocationSearch'
import CurrentWeather from './components/weather/CurrentWeather'

function App() {
  const [selectedCity, setSelectedCity] = useState('')

  return (
    <ErrorBoundary>
      <RootLayout>
        <div className="space-y-4">
          <LocationSearch onSearch={setSelectedCity} />
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {selectedCity && <CurrentWeather city={selectedCity} />}
            {/* Forecast component will go here */}
          </div>
        </div>
      </RootLayout>
    </ErrorBoundary>
  )
}

export default App
