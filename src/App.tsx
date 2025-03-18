import RootLayout from './components/layout/RootLayout'
import ErrorBoundary from './components/ui/ErrorBoundary'
import WeatherCard from './components/weather/WeatherCard'

function App() {
  return (
    <ErrorBoundary>
      <RootLayout>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <WeatherCard title="Current Weather">
            {/* Current weather content will go here */}
          </WeatherCard>
          
          <WeatherCard title="Forecast">
            {/* Forecast content will go here */}
          </WeatherCard>
          
          <WeatherCard title="Weather Stats">
            {/* Stats content will go here */}
          </WeatherCard>
        </div>
      </RootLayout>
    </ErrorBoundary>
  )
}

export default App
