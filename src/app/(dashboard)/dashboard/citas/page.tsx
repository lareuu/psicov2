"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DayView } from "@/components/calendar/day-view"
import { WeekView } from "@/components/calendar/week-view"
import { MonthView } from "@/components/calendar/month-view"

export default function AppointmentsPage() {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="container mx-auto py-6 flex-grow">
        <Tabs defaultValue="week" className="w-full h-full">
          <TabsList className="flex justify-center">
            <TabsTrigger value="day">Diario</TabsTrigger>
            <TabsTrigger value="week">Semanal</TabsTrigger>
            <TabsTrigger value="month">Mensual</TabsTrigger>
          </TabsList>
          <div className="flex-grow">
            <TabsContent value="day" className="h-full">
              <DayView />
            </TabsContent>
            <TabsContent value="week" className="h-full">
              <WeekView />
            </TabsContent>
            <TabsContent value="month" className="h-full">
              <MonthView />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}

