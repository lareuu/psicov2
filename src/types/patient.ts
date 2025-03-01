export interface Patient {
  id: string
  name: string
  lastname: string
  email: string
  phone: string
  active: boolean
  created_at: string
  user_id: string
}

export interface CreatePatientData {
  name: string
  lastname: string
  email: string
  phone: string
  active?: boolean
}

