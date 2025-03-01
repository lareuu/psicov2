"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { addDays, format, startOfWeek, isSameDay } from "date-fns"
import { es } from "date-fns/locale"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useEffect } from "react"
import { Appointment } from "@/components/appointments/appointment"

interface AppointmentType {
  id: number
  time: string
  patient: string
  type: string
  duration: string
}

export function WeekView() {
  const [weekStart, setWeekStart] = useState(startOfWeek(new Date(), { locale: es }))
  const [appointments, setAppointments] = useState<AppointmentType[]>([])
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i))

  useEffect(() => {
    // Simula la obtención de citas desde una API o base de datos
    const fetchAppointments = async () => {
      //Simula una espera
      await new Promise((resolve) => setTimeout(resolve, 300))
      const mockAppointments: AppointmentType[] = [
        { id: 1, time: "09:00", patient: "Juan Pérez", type: "Primera consulta", duration: "50 min" },
        { id: 2, time: "10:00", patient: "María García", type: "Seguimiento", duration: "50 min" },
        { id: 3, time: "11:30", patient: "Carlos Rodríguez", type: "Terapia", duration: "50 min" },
        { id: 4, time: "14:00", patient: "Ana López", type: "Consulta general", duration: "50 min" },
        { id: 5, time: "16:00", patient: "Pedro Ramírez", type: "Revisión", duration: "50 min" },
        { id: 6, time: "10:00", patient: "Juan Perez", type: "Consulta", duration: "50 min" },
        { id: 7, time: "11:00", patient: "Maria Gonzales", type: "Seguimiento", duration: "50 min" },
      ]
      //Filtrar las citas para la semana seleccionada
      const filteredAppointments = mockAppointments.filter((appointment) =>
        weekDays.some((day) => isSameDay(day, new Date())),
      )
      setAppointments(filteredAppointments)
    }

    fetchAppointments()
  }, [weekStart, weekDays])

  const navigateWeek = (direction: "prev" | "next") => {
    setWeekStart((current) => addDays(current, direction === "next" ? 7 : -7))
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Semana del {format(weekStart, "d 'de' MMMM", { locale: es })}</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" onClick={() => navigateWeek("prev")}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={() => navigateWeek("next")}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-2">
        <ScrollArea className="h-[600px]">
          <div className="grid grid-cols-7 gap-3">
            {weekDays.map((day) => {
              //Filtrar las citas por dia
              const dayAppointments = appointments.filter((appointment) => isSameDay(day, new Date()))
              return (
                <div key={day.toString()} className="text-center">
                  <div className="sticky top-0 bg-background p-2">
                    <p className="font-medium">{format(day, "EEEE", { locale: es })}</p>
                    <p className="text-sm text-muted-foreground">{format(day, "d MMM", { locale: es })}</p>
                  </div>
                  <div className="space-y-2 p-2">
                    {dayAppointments.length > 0 ? (
                      dayAppointments.map((appointment) => (
                        <Appointment key={appointment.id} appointment={appointment} />
                      ))
                    ) : (
                      <Card>
                        <CardContent className="p-2">
                          <p className="text-sm text-muted-foreground">Sin citas</p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

