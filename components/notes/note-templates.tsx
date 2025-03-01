"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

const templates = [
  {
    id: 1,
    title: "Primera Visita",
    description: "Plantilla para la primera sesión con un nuevo paciente",
    sections: ["Motivo de consulta", "Historia clínica", "Evaluación inicial", "Plan de tratamiento"],
  },
  {
    id: 2,
    title: "Seguimiento",
    description: "Plantilla para sesiones de seguimiento",
    sections: ["Evolución", "Objetivos trabajados", "Tareas", "Próximos pasos"],
  },
  {
    id: 3,
    title: "Evaluación Trimestral",
    description: "Plantilla para evaluaciones periódicas",
    sections: ["Progreso", "Objetivos alcanzados", "Áreas de mejora", "Ajustes al tratamiento"],
  },
  {
    id: 4,
    title: "Informe de Alta",
    description: "Plantilla para informes de alta",
    sections: ["Resumen del tratamiento", "Objetivos alcanzados", "Recomendaciones", "Seguimiento"],
  },
]

export function NoteTemplates() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <Card className="border-2 border-dashed">
        <CardHeader className="items-center text-center">
          <CardTitle>Nueva Plantilla</CardTitle>
          <CardDescription>Crea una plantilla personalizada</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center p-6">
          <Button variant="ghost" className="h-20 w-20 rounded-full">
            <Plus className="h-10 w-10" />
          </Button>
        </CardContent>
      </Card>
      {templates.map((template) => (
        <Card key={template.id} className="cursor-pointer hover:bg-accent">
          <CardHeader>
            <CardTitle>{template.title}</CardTitle>
            <CardDescription>{template.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {template.sections.map((section, index) => (
                <div key={index} className="text-sm">
                  • {section}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

