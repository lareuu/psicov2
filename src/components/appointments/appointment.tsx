// components/appointment.tsx
import { Card, CardContent } from "@/components/ui/card"

interface AppointmentProps {
  appointment: {
    id: number
    time: string
    patient: string
    type: string
    duration: string
  }
}

export function Appointment({ appointment }: AppointmentProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">{appointment.time}</p>
            <p className="text-sm text-muted-foreground">{appointment.patient}</p>
          </div>
          <div className="text-right">
            <p className="text-sm">{appointment.type}</p>
            <p className="text-sm text-muted-foreground">{appointment.duration}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

