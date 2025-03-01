"use client"

import { useState, useCallback } from "react"
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
import { Card, CardContent } from "@/components/ui/card"

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const periods = {
  week: { days: 7, label: "Esta semana" },
  month: { days: 30, label: "Últimos 30 días" },
  quarter: { days: 90, label: "Últimos 90 días" },
  year: { days: 365, label: "Últimos 12 meses" },
}

export function LineChart() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [tooltipData, setTooltipData] = useState<null | { date: string; appointments: number; income: number }>(null)

  const generateData = useCallback((days: number) => {
    return {
      labels: Array.from({ length: days }, (_, i) => {
        const d = new Date()
        d.setDate(d.getDate() - (days - i - 1))
        return d.toLocaleDateString()
      }),
      datasets: [
        {
          label: "Citas",
          data: Array.from({ length: days }, () => Math.floor(Math.random() * 10) + 1),
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
          animation: {
            duration: 1000,
            easing: "easeInOutQuart",
          },
        },
        {
          label: "Ingresos",
          data: Array.from({ length: days }, () => Math.floor(Math.random() * 1000) + 500),
          borderColor: "rgb(153, 102, 255)",
          tension: 0.1,
          animation: {
            duration: 1000,
            easing: "easeInOutQuart",
          },
        },
      ],
    }
  }, [])

  const [data, setData] = useState(generateData(periods.month.days))

  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value)
    setData(generateData(periods[value as keyof typeof periods].days))
  }

  const options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            if (context.dataset.label === "Ingresos") {
              return `${context.dataset.label}: €${context.raw}`
            }
            return `${context.dataset.label}: ${context.raw}`
          },
        },
      },
    },
    onClick: (event: any, elements: any) => {
      if (elements.length > 0) {
        const index = elements[0].index
        setTooltipData({
          date: data.labels[index],
          appointments: data.datasets[0].data[index],
          income: data.datasets[1].data[index],
        })
      }
    },
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Select value={selectedPeriod} onValueChange={handlePeriodChange}>
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

      <Line options={options} data={data} />

      {tooltipData && (
        <Card className="mt-4">
          <CardContent className="pt-6">
            <div className="space-y-2">
              <p className="font-medium">{tooltipData.date}</p>
              <p>Citas: {tooltipData.appointments}</p>
              <p>Ingresos: €{tooltipData.income}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

