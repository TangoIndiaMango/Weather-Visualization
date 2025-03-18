import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Skeleton from "../ui/Skeleton"

interface WeatherCardProps {
  title: string
  loading?: boolean
  children: React.ReactNode
}

const WeatherCard = ({ title, loading = false, children }: WeatherCardProps) => {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-1/3" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-24 w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}

export default WeatherCard