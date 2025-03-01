"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { DashboardHeader } from "@/components/dashboard/header"
import { DateRangePicker } from "@/components/dashboard/date-range-picker"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Users,
  Calendar,
  DollarSign,
  Activity,
  Settings,
  Clock,
  Smile,
  TrendingUp,
  AlertCircle,
  Heart,
  MessageSquare,
  ListChecks,
  FileText,
} from "lucide-react"
import { Widget } from "@/components/dashboard/widget"
import { LineChart } from "@/components/dashboard/line-chart"
import { WeeklyStatus } from "@/components/dashboard/weekly-status"
import { TodayOverview } from "@/components/dashboard/today-overview"
import { useAuth } from "@/lib/auth-context"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger, // Asegúrate de que SheetTrigger esté importado aquí
} from "@/components/ui/sheet"

interface CardType {
  id: string
  title: string
  icon: React.ComponentType<any>
  gradient: string
}

const allCards: CardType[] = [
  { id: "stats-1", title: "Pacientes Totales", icon: Users, gradient: "from-blue-50 to-purple-50" },
  { id: "stats-2", title: "Citas Este Mes", icon: Calendar, gradient: "from-indigo-50 to-blue-50" },
  { id: "stats-3", title: "Ingresos", icon: DollarSign, gradient: "from-purple-50 to-pink-50" },
  { id: "stats-4", title: "Tasa de Asistencia", icon: Activity, gradient: "from-pink-50 to-rose-50" },
  { id: "stats-5", title: "Feedback Promedio", icon: Heart, gradient: "from-green-50 to-teal-50" },
  { id: "stats-6", title: "Nuevos Mensajes", icon: MessageSquare, gradient: "from-yellow-50 to-orange-50" },
  { id: "stats-7", title: "Tareas Pendientes", icon: ListChecks, gradient: "from-sky-50 to-blue-50" },
  { id: "stats-8", title: "Artículos Publicados", icon: FileText, gradient: "from-stone-50 to-zinc-50" },
]

interface MetricValuesType {
  [key: string]: { value: number | string; trend?: number }
}

export default function DashboardPage() {
  const { user, isLoading } = useAuth()

  const [isCustomizing, setIsCustomizing] = useState(false)
  const [selectedCards, setSelectedCards] = useState(allCards.map((card) => card.id))
  const [metricValues, setMetricValues] = useState<MetricValuesType>({})
  const [loading, setIsLoading] = useState(true)

  const fetchMetricValues = useCallback(async () => {
    setIsLoading(true)

    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setMetricValues({
        "stats-1": { value: 150, trend: 5 },
        "stats-2": { value: 90, trend: -2 },
        "stats-3": { value: 22000, trend: 10 },
        "stats-4": { value: 95, trend: 1 },
        "stats-5": { value: 4.8, trend: 0.5 },
        "stats-6": { value: 12, trend: 3 },
        "stats-7": { value: 5, trend: -1 },
        "stats-8": { value: 3, trend: 1 },
      })
    } catch (error) {
      console.error("Error fetching metric values:", error)
    } finally {
      setIsLoading(false)
    }
  }, [setIsLoading])

  useEffect(() => {
    if (!isLoading && user) {
      fetchMetricValues()
    }
  }, [isLoading, user, fetchMetricValues])

  const handleCardToggle = (cardId: string) => {
    setSelectedCards((prevSelectedCards) => {
      if (prevSelectedCards.includes(cardId)) {
        return prevSelectedCards.filter((id) => id !== cardId)
      } else {
        return [...prevSelectedCards, cardId]
      }
    })
  }

  const calculateTrendIcon = (trend: number | undefined) => {
    if (trend === undefined) return null

    if (trend > 0) {
      return <TrendingUp className="h-4 w-4 ml-1 text-green-500" />
    } else if (trend < 0) {
      return <TrendingUp className="h-4 w-4 ml-1 text-red-500 rotate-180" />
    } else {
      return null
    }
  }

  if (isLoading) {
    return (
      <div className="flex-1 p-6 bg-white">
        <div className="flex items-center justify-between mb-6">
          <Skeleton className="h-8 w-[200px]" />
        </div>
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-[120px] w-full" />
          ))}
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="flex-1 p-6 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <DashboardHeader heading="Dashboard" text={`Bienvenido, ${user?.name || "Usuario"}`} />
        <div className="flex items-center gap-4">
          <DateRangePicker />
          {/* Botón de Personalizar */}
          <Sheet open={isCustomizing} onOpenChange={setIsCustomizing} style={{ zIndex: 1000 }}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                style={{ width: "auto", height: "auto" }}
                onClick={() => setIsCustomizing((prev) => !prev)}
              >
                <Settings className="h-4 w-4 mr-2" />
                Personalizar
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Personalizar Dashboard</SheetTitle>
                <SheetDescription>Selecciona las tarjetas que quieres ver.</SheetDescription>
              </SheetHeader>
              <ScrollArea className="h-[calc(100vh-100px)]">
                <div className="grid gap-4 py-4">
                  {allCards.map((card) => (
                    <div key={card.id} className="flex items-center justify-between space-x-2">
                      <Label
                        htmlFor={card.id}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {card.title}
                      </Label>
                      <Switch
                        id={card.id}
                        checked={selectedCards.includes(card.id)}
                        onCheckedChange={() => handleCardToggle(card.id)}
                      />
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Tarjetas de métricas */}
      <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {selectedCards.map((cardId) => {
          const card = allCards.find((c) => c.id === cardId)
          if (!card) return null

          const metricData = metricValues[card.id]
          const metricValue = metricData ? metricData.value : "N/A"
          const metricTrend = metricData ? metricData.trend : undefined

          return (
            <Widget key={card.id} id={card.id}>
              <Card className={`bg-gradient-to-br ${card.gradient} shadow-lg`}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                  <card.icon className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {loading ? (
                    <Skeleton className="h-8 w-20" />
                  ) : (
                    <>
                      <div className="text-2xl font-bold">{metricValue}</div>
                      {metricTrend !== undefined && (
                        <p className="text-xs text-muted-foreground">
                          {metricTrend > 0 ? "+" : ""}
                          {metricTrend}% desde el último mes
                          {calculateTrendIcon(metricTrend)}
                        </p>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>
            </Widget>
          )
        })}
      </div>

      {/* Sección de Gráficos y Estado Semanal */}
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-2 mt-6">
        <Widget id="chart" className="lg:col-span-8">
          <Card className="h-full shadow-lg min-h-[420px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Evolución de Citas e Ingresos</CardTitle>
                <TrendingUp className="h-6 w-6 text-blue-500" />
              </div>
            </CardHeader>
            <CardContent className="h-[380px]">
              <LineChart />
            </CardContent>
          </Card>
        </Widget>

        <Widget id="weeklyStatus" className="lg:col-span-4">
          <Card className="h-full shadow-lg min-h-[420px]">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold">Estado de tu Semana</CardTitle>
                <Clock className="h-6 w-6 text-green-500" />
              </div>
            </CardHeader>
            <CardContent>
              <WeeklyStatus />
              <div className="mt-6">
                <div className="flex items-center gap-3">
                  <Smile className="h-5 w-5 text-green-500" />
                  <p className="text-sm text-muted-foreground">
                    Cumplimiento: <span className="font-semibold">95%</span>
                  </p>
                </div>
                <div className="flex items-center gap-3 mt-2">
                  <AlertCircle className="h-5 w-5 text-red-500" />
                  <p className="text-sm text-muted-foreground">
                    Cancelaciones: <span className="font-semibold">2</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Widget>
      </div>

      {/* Sección Hoy en tu Consulta */}
      <Widget id="todayOverview">
        <Card className="shadow-lg min-h-[350px] mt-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-semibold">Hoy en tu Consulta</CardTitle>
              <Calendar className="h-6 w-6 text-purple-500" />
            </div>
          </CardHeader>
          <CardContent>
            <TodayOverview />
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Próxima cita: <span className="font-semibold">Juan Díaz a las 10:00</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </Widget>
    </div>
  )
}

