"use client"

import * as React from "react"
import {
  addDays,
  format,
  startOfToday,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  isSameMonth,
  isSameDay,
} from "date-fns"
import { es } from "date-fns/locale"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const appointments = [
  {
    id: 1,
    title: "Juan Pérez - Primera visita",
    date: new Date(2024, 1, 28, 10, 0),
    duration: 60,
    type: "first-visit",
    status: "confirmed",
  },
  {
    id: 2,
    title: "María García - Seguimiento",
    date: new Date(2024, 1, 28, 11, 30),
    duration: 45,
    type: "follow-up",
    status: "confirmed",
  },
  {
    id: 3,
    title: "Carlos Rodríguez - Terapia",
    date: new Date(2024, 1, 28, 15, 0),
    duration: 60,
    type: "therapy",
    status: "pending",
  },
]

export function Calendar() {
  const [selectedDate, setSelectedDate] = React.useState<Date>(startOfToday())
  const [view, setView] = React.useState<"day" | "week" | "month">("week")

  const timeSlots = Array.from({ length: 24 }, (_, i) => i)

  const getDayAppointments = (date: Date) => {
    return appointments.filter((app) => isSameDay(app.date, date))
  }

  const renderDayView = () => {
    const dayAppointments = getDayAppointments(selectedDate)

    return (
      <div className="flex flex-col gap-2">
        <div className="text-lg font-medium mb-4">{format(selectedDate, "EEEE, d 'de' MMMM", { locale: es })}</div>
        <div className="grid grid-cols-[100px_1fr] gap-4">
          {timeSlots.map((hour) => (
            <React.Fragment key={hour}>
              <div className="text-sm text-muted-foreground text-right pr-4">{`${hour}:00`}</div>
              <div className="min-h-[60px] border-t relative">
                {dayAppointments
                  .filter((app) => app.date.getHours() === hour)
                  .map((appointment) => (
                    <Button
                      key={appointment.id}
                      variant="outline"
                      className={cn(
                        "absolute w-full h-[58px] -mt-[1px]",
                        appointment.status === "confirmed" ? "border-primary" : "border-muted",
                      )}
                    >
                      <div className="flex flex-col items-start">
                        <div className="text-sm font-medium">{format(appointment.date, "HH:mm")}</div>
                        <div className="text-xs">{appointment.title}</div>
                      </div>
                    </Button>
                  ))}
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    )
  }

  const renderWeekView = () => {
    const start = startOfWeek(selectedDate, { locale: es })
    const end = endOfWeek(selectedDate, { locale: es })
    const days = eachDayOfInterval({ start, end })

    return (
      <div className="grid grid-cols-7 gap-4">
        {days.map((day) => {
          const dayAppointments = getDayAppointments(day)

          return (
            <div key={day.toString()} className="flex flex-col gap-2">
              <div className="text-sm font-medium">{format(day, "EEEE d", { locale: es })}</div>
              <div className="flex flex-col gap-2">
                {dayAppointments.map((appointment) => (
                  <Button
                    key={appointment.id}
                    variant="outline"
                    className={cn(
                      "h-auto justify-start px-2 py-1 text-left",
                      appointment.status === "confirmed" ? "border-primary" : "border-muted",
                    )}
                  >
                    <div className="flex flex-col gap-1">
                      <div className="text-sm font-medium">{format(appointment.date, "HH:mm")}</div>
                      <div className="text-xs">{appointment.title}</div>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderMonthView = () => {
    const start = startOfMonth(selectedDate)
    const end = endOfMonth(selectedDate)
    const days = eachDayOfInterval({ start, end })

    return (
      <div className="grid grid-cols-7 gap-1">
        {["L", "M", "X", "J", "V", "S", "D"].map((day) => (
          <div key={day} className="text-sm font-medium text-center py-2">
            {day}
          </div>
        ))}
        {days.map((day) => {
          const dayAppointments = getDayAppointments(day)
          const isCurrentMonth = isSameMonth(day, selectedDate)

          return (
            <Button
              key={day.toString()}
              variant="ghost"
              className={cn(
                "h-auto aspect-square flex flex-col items-center justify-start p-2",
                !isCurrentMonth && "text-muted-foreground",
                isSameDay(day, new Date()) && "bg-accent",
              )}
              onClick={() => {
                setSelectedDate(day)
                setView("day")
              }}
            >
              <span className="text-sm">{format(day, "d")}</span>
              {dayAppointments.length > 0 && <div className="mt-1 w-2 h-2 rounded-full bg-primary" />}
            </Button>
          )
        })}
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Select value={view} onValueChange={(value: "day" | "week" | "month") => setView(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecciona una vista" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Vista diaria</SelectItem>
              <SelectItem value="week">Vista semanal</SelectItem>
              <SelectItem value="month">Vista mensual</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setSelectedDate(startOfToday())}>
            Hoy
          </Button>
          <Button variant="outline" size="sm" onClick={() => setSelectedDate(addDays(selectedDate, -1))}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={() => setSelectedDate(addDays(selectedDate, 1))}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      {view === "day" && renderDayView()}
      {view === "week" && renderWeekView()}
      {view === "month" && renderMonthView()}
    </div>
  )
}

