import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Clock, AlertCircle } from "lucide-react"

export function TodayOverview() {
  return (
    <div className="grid gap-4">
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <CheckCircle className="h-5 w-5 text-green-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Próxima Cita</p>
              <p className="text-sm text-muted-foreground">Juan Pérez - 10:00</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <Clock className="h-5 w-5 text-yellow-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Tareas Pendientes</p>
              <p className="text-sm text-muted-foreground">2 informes por completar</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center space-x-4">
            <AlertCircle className="h-5 w-5 text-blue-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium">Recordatorios</p>
              <p className="text-sm text-muted-foreground">Llamar a María García</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

