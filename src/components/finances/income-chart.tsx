"use client"

import { useState, useEffect } from "react"
import { Line } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { supabase } from "@/lib/supabase"
import { format, subDays } from "date-fns"
import { es } from "date-fns/locale"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const periods = {
  "30": { label: "Últimos 30 días", days: 30 },
  "90": { label: "Últimos 90 días", days: 90 },
  "365": { label: "Último año", days: 365 },
}

export function IncomeChart() {
  const [period, setPeriod] = useState<keyof typeof periods>("30")
  const [data, setData] = useState<{ date: string; amount: number }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const days = Number.parseInt(period)
        const startDate = subDays(new Date(), days)

        const { data: incomes, error } = await supabase
          .from("incomes")
          .select("amount, created_at")
          .gte("created_at", startDate.toISOString())
          .order("created_at", { ascending: true })

        if (error) throw error

        // Agrupar por fecha
        const groupedData = incomes.reduce((acc: Record<string, number>, curr) => {
          const date = format(new Date(curr.created_at), "yyyy-MM-dd")
          acc[date] = (acc[date] || 0) + curr.amount
          return acc
        }, {})

        // Generar array de fechas para el período seleccionado
        const dates = Array.from({ length: days }, (_, i) => {
          const date = format(subDays(new Date(), i), "yyyy-MM-dd")
          return {
            date,
            amount: groupedData[date] || 0,
          }
        }).reverse()

        setData(dates)
      } catch (error) {
        console.error("Error fetching income data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [period])

  const chartData = {
    labels: data.map((d) => format(new Date(d.date), period === "365" ? "MMM yyyy" : "d MMM", { locale: es })),
    datasets: [
      {
        label: "Ingresos",
        data: data.map((d) => d.amount),
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.1)",
        tension: 0.1,
        fill: true,
      },
    ],
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
        callbacks: {
          label: (context: any) => `${context.parsed.y.toFixed(2)}€`,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: (value: number) => `${value}€`,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={period} onValueChange={(value: keyof typeof periods) => setPeriod(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Selecciona período" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(periods).map(([key, { label }]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="h-[400px]">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p>Cargando datos...</p>
          </div>
        ) : (
          <Line options={options} data={chartData} />
        )}
      </div>
    </div>
  )
}

