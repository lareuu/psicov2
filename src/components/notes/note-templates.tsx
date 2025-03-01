"use client"

import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export function NoteTemplates() {
  const templates = [
    { id: 1, name: "Primera Sesión", description: "Template para primera consulta" },
    { id: 2, name: "Seguimiento", description: "Template para sesiones de seguimiento" },
    { id: 3, name: "Evaluación", description: "Template para evaluación psicológica" },
  ]

  return (
    <ScrollArea className="h-[300px]">
      <div className="space-y-4">
        {templates.map((template) => (
          <Card key={template.id} className="p-4">
            <h3 className="font-medium">{template.name}</h3>
            <p className="text-sm text-muted-foreground">{template.description}</p>
          </Card>
        ))}
      </div>
    </ScrollArea>
  )
}

