"use client"

import { useState, useEffect } from "react"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { format, isSameDay } from "date-fns"
import { es } from "date-fns/locale"
import { Appointment } from "@/components/appointments/appointment" // Componente para la cita

interface AppointmentType {
  id: number
  time: string
  patient: string
  type: string
  duration: string
}

export function DayView() {
  const [date, setDate] = useState<Date>(new Date())
  const [appointments, setAppointments] = useState<AppointmentType[]>([])

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
      ]
      //Filtrar las citas para el dia seleccionado
      const filteredAppointments = mockAppointments.filter((appointment) => isSameDay(date, new Date()))
      setAppointments(filteredAppointments)
    }

    fetchAppointments()
  }, [date])

  return (
    <div className="grid gap-4 md:grid-cols-[300px_1fr]">
      <Card>
        <CardHeader>
          <CardTitle>Calendario</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={(date) => date && setDate(date)}
            locale={es}
            className="border-none shadow-none"
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Citas para el {format(date, "EEEE d 'de' MMMM, yyyy", { locale: es })}</CardTitle>
        </CardHeader>
        <CardContent className="p-2">
          <ScrollArea className="h-[600px] pr-4">
            <div className="space-y-3">
              {appointments.length > 0 ? (
                appointments.map((appointment) => <Appointment key={appointment.id} appointment={appointment} />)
              ) : (
                <p className="text-muted-foreground">No hay citas para este día.</p>
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

