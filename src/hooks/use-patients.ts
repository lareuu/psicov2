// src/hooks/use-patients.tsx
"use client"

import { useState, useEffect } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useAuth } from "@/lib/auth-context"

interface Patient {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  active: boolean
  created_at: string
  user_id: string
  name: string // Add name
  lastname: string // Add lastname
}

export function usePatients() {
  const [patients, setPatients] = useState<Patient[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()
  const supabase = createClientComponentClient()

  useEffect(() => {
    async function fetchPatients() {
      setLoading(true)
      try {
        if (!user) {
          console.warn("User not authenticated, skipping patient fetch.")
          setLoading(false)
          return
        }

        console.log("Current user:", {
          id: user.id,
          email: user.email,
          metadata: user.user_metadata,
        })

        const { data, error } = await supabase.from("patients").select("*").eq("user_id", user.id)

        if (error) {
          console.error("Supabase error fetching patients:", error)
          throw error
        }

        console.log("Fetched patients:", data)

        // Map the data to match the interface
        const mappedPatients =
          data?.map((patient) => {
            try {
              return {
                ...patient,
                name: patient.first_name || "N/A", // Provide a default value
                lastname: patient.last_name || "N/A", // Provide a default value
              }
            } catch (mappingError) {
              console.error("Error mapping patient:", patient, mappingError)
              return null // Return null for invalid patients
            }
          }) || []

        //Filter out any null
        const validPatients = mappedPatients.filter(Boolean) as Patient[]

        console.log("Mapped patients:", validPatients)
        setPatients(validPatients)
        setError(null)
      } catch (e) {
        console.error("Error fetching patients:", e)
        setError("Error al cargar los pacientes")
      } finally {
        setLoading(false)
      }
    }

    if (user) {
      fetchPatients()
    }
  }, [user, supabase])

  return {
    patients,
    loading,
    error,
    isAuthenticated: !!user,
  }
}

