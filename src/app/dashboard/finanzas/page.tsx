import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard/header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Overview } from "@/components/dashboard/overview"
import { RegisterExpenseButton } from "@/components/finances/register-expense-button"
import { ExpensesList } from "@/components/finances/expenses-list"

export const metadata: Metadata = {
  title: "Finanzas | PsicoGest",
  description: "Análisis financiero y reportes",
}

export default function FinancePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <DashboardHeader heading="Finanzas" text="Análisis financiero y reportes" />
        <RegisterExpenseButton />
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Resumen</TabsTrigger>
          <TabsTrigger value="expenses">Gastos</TabsTrigger>
          <TabsTrigger value="reports">Informes</TabsTrigger>
          <TabsTrigger value="forecast">Previsiones</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Ingresos Totales</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€4,550</div>
                <p className="text-xs text-muted-foreground">+20.1% respecto al mes anterior</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Gastos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€1,200</div>
                <p className="text-xs text-muted-foreground">+4% respecto al mes anterior</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Beneficio Neto</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">€3,350</div>
                <p className="text-xs text-muted-foreground">+25.8% respecto al mes anterior</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Tasa de Cobro</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">98%</div>
                <p className="text-xs text-muted-foreground">+2% respecto al mes anterior</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Evolución de Ingresos</CardTitle>
            </CardHeader>
            <CardContent>
              <Overview />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="expenses" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <ExpensesList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium">Informes Financieros</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Genera informes detallados de tu actividad financiera.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="forecast" className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <div className="text-center py-8">
                <h3 className="text-lg font-medium">Previsiones Financieras</h3>
                <p className="text-sm text-muted-foreground mt-2">
                  Analiza tendencias y realiza previsiones financieras.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

