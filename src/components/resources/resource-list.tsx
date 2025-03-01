"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export function ResourceList() {
  // Sample data - replace with real data
  const resources = [
    { id: 1, title: "Guía de ejercicios", type: "PDF", date: "2024-02-28" },
    { id: 2, title: "Material de relajación", type: "Audio", date: "2024-02-27" },
    // Add more sample resources as needed
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recursos Disponibles</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {resources.map((resource) => (
              <div key={resource.id} className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">{resource.title}</h4>
                  <p className="text-sm text-muted-foreground">{resource.type}</p>
                </div>
                <p className="text-sm text-muted-foreground">{resource.date}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

