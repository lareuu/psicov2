"use client"

import { Doughnut } from "react-chartjs-2"
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

ChartJS.register(ArcElement, Tooltip, Legend)

const data = {
  labels: ["Confirmadas", "Pendientes", "Canceladas"],
  datasets: [
    {
      data: [12, 3, 1],
      backgroundColor: ["rgba(75, 192, 192, 0.2)", "rgba(255, 206, 86, 0.2)", "rgba(255, 99, 132, 0.2)"],
      borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 206, 86, 1)", "rgba(255, 99, 132, 1)"],
      borderWidth: 1,
    },
  ],
}

export function WeeklyStatus() {
  return (
    <div className="h-[300px] flex items-center justify-center">
      <Doughnut data={data} options={{ maintainAspectRatio: false }} />
    </div>
  )
}

