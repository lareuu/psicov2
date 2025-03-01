"use client"

import { useState } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { es } from "date-fns/locale"

export function MonthView() {
  const [date, setDate] = useState<Date>(new Date())

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Calendario Mensual</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(date) => date && setDate(date)}
          locale={es}
          className="rounded-md border-none shadow-none"
        />
      </CardContent>
    </Card>
  )
}

