"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export function NotesList() {
  // Sample data - replace with real data
  const notes = [
    { id: 1, title: "Sesión inicial", date: "2024-02-28", patient: "Juan Pérez" },
    { id: 2, title: "Seguimiento", date: "2024-02-27", patient: "María García" },
    // Add more sample notes as needed
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notas Recientes</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {notes.map((note) => (
              <div key={note.id} className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-medium">{note.title}</h4>
                  <p className="text-sm text-muted-foreground">{note.patient}</p>
                </div>
                <p className="text-sm text-muted-foreground">{note.date}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

