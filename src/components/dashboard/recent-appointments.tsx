import { Avatar } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const appointments = [
  {
    id: 1,
    name: "Juan Diaz",
    time: "10:00 - 11:00",
    type: "Primera visita",
    status: "Confirmada",
    avatar: "/avatars/01.png",
  },
  {
    id: 2,
    name: "Laura Martinez",
    time: "11:30 - 12:30",
    type: "Seguimiento",
    status: "Confirmada",
    avatar: "/avatars/02.png",
  },
  {
    id: 3,
    name: "Carlos Garcia",
    time: "14:00 - 15:00",
    type: "Terapia familiar",
    status: "Pendiente",
    avatar: "/avatars/03.png",
  },
  {
    id: 4,
    name: "Maria Rodriguez",
    time: "16:30 - 17:30",
    type: "Seguimiento",
    status: "Confirmada",
    avatar: "/avatars/04.png",
  },
  {
    id: 5,
    name: "Pablo López",
    time: "18:00 - 19:00",
    type: "Primera visita",
    status: "Pendiente",
    avatar: "/avatars/05.png",
  },
]

export function RecentAppointments() {
  return (
    <div className="space-y-8">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="flex items-center">
          <Avatar className="h-9 w-9">
            <div className="flex h-full w-full items-center justify-center rounded-full bg-primary">
              {appointment.name.charAt(0)}
            </div>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{appointment.name}</p>
            <p className="text-sm text-muted-foreground">
              {appointment.time} | {appointment.type}
            </p>
          </div>
          <div className="ml-auto">
            <Badge variant={appointment.status === "Confirmada" ? "default" : "secondary"}>{appointment.status}</Badge>
          </div>
        </div>
      ))}
    </div>
  )
}

