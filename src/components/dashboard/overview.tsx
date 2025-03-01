"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Ene",
    total: 14,
  },
  {
    name: "Feb",
    total: 12,
  },
  {
    name: "Mar",
    total: 16,
  },
  {
    name: "Abr",
    total: 18,
  },
  {
    name: "May",
    total: 22,
  },
  {
    name: "Jun",
    total: 20,
  },
  {
    name: "Jul",
    total: 15,
  },
  {
    name: "Ago",
    total: 18,
  },
  {
    name: "Sep",
    total: 20,
  },
  {
    name: "Oct",
    total: 22,
  },
  {
    name: "Nov",
    total: 18,
  },
  {
    name: "Dic",
    total: 16,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Bar dataKey="total" fill="currentColor" radius={[4, 4, 0, 0]} className="fill-primary" />
      </BarChart>
    </ResponsiveContainer>
  )
}

