import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NotesList } from "@/components/notes/notes-list"
import { CreateNoteButton } from "@/components/notes/create-note-button"
import { NoteTemplates } from "@/components/notes/note-templates"

export const metadata: Metadata = {
  title: "Notas Clínicas | PsicoGest",
  description: "Gestión de notas clínicas",
}

export default function NotesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <DashboardHeader heading="Notas Clínicas" text="Gestiona tus notas y registros clínicos" />
        <CreateNoteButton />
      </div>
      <Tabs defaultValue="recent" className="space-y-4">
        <TabsList>
          <TabsTrigger value="recent">Recientes</TabsTrigger>
          <TabsTrigger value="templates">Plantillas</TabsTrigger>
          <TabsTrigger value="archived">Archivadas</TabsTrigger>
        </TabsList>
        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <NotesList type="recent" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="templates" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <NoteTemplates />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="archived" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <NotesList type="archived" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

