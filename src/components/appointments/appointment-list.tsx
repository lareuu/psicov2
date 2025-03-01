"use client"

import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export function AppointmentList() {
  const appointments = [
    { id: 1, name: "Appointment 1", date: "2024-01-01" },
    { id: 2, name: "Appointment 2", date: "2024-01-02" },
  ]

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-2">
        {appointments.map((appointment) => (
          <Card key={appointment.id} className="p-4">
            <div className="flex justify-between">
              <div>{appointment.name}</div>
              <div className="text-muted-foreground">{appointment.date}</div>
            </div>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}

