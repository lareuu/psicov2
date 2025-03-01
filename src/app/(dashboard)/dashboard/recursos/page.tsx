import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ResourceList } from "@/components/resources/resource-list"
import { CreateResourceButton } from "@/components/resources/create-resource-button"
import { ResourceStats } from "@/components/resources/resource-stats"

export const metadata: Metadata = {
  title: "Recursos | PsicoGest",
  description: "Biblioteca de recursos y materiales",
}

export default function ResourcesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <DashboardHeader heading="Recursos" text="Gestiona tus recursos y materiales" />
        <CreateResourceButton />
      </div>
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="shared">Compartidos</TabsTrigger>
          <TabsTrigger value="categories">Categorías</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <ResourceStats />
          <Card>
            <CardContent className="p-6">
              <ResourceList type="all" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="shared" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <ResourceList type="shared" />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="categories" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <ResourceList type="categories" />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

