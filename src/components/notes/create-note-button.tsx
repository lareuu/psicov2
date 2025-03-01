"use client"

import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function CreateNoteButton() {
  return (
    <Button>
      <Plus className="mr-2 h-4 w-4" />
      Nueva Nota
    </Button>
  )
}

