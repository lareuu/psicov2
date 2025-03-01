import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/header"
import { PatientList } from "@/components/patients/patient-list"
import { CreatePatientButton } from "@/components/patients/create-patient-button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PatientStats } from "@/components/patients/patient-stats"

export const metadata: Metadata = {
  title: "Pacientes | PsicoGest",
  description: "Gestión de pacientes",
}

export default function PatientsPage() {
  return (
    <div className="flex flex-col gap-6 w-full max-w-screen-xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <DashboardHeader heading="Pacientes" text="Gestiona tus pacientes y sus historiales" />
        <CreatePatientButton />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="active" className="space-y-4 w-full">
        <TabsList className="w-full flex border-b bg-gray-100 rounded-lg shadow-md">
          <TabsTrigger value="active" className="flex-1 text-center py-2">
            Activos
          </TabsTrigger>
          <TabsTrigger value="inactive" className="flex-1 text-center py-2">
            Inactivos
          </TabsTrigger>
          <TabsTrigger value="all" className="flex-1 text-center py-2">
            Todos
          </TabsTrigger>
        </TabsList>

        {/* Contenido de cada tab */}
        <TabsContent value="active" className="w-full">
          <PatientStats />
          <Card className="w-full shadow-lg">
            <CardContent className="p-6">
              <PatientList status="active" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive" className="w-full">
          <Card className="w-full shadow-lg">
            <CardContent className="p-6">
              <PatientList status="inactive" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="all" className="w-full">
          <Card className="w-full shadow-lg">
            <CardContent className="p-6">
              <PatientList status="all" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

