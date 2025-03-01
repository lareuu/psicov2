"use server"

import { createClient } from "@/utils/supabase/server"
import { cookies } from "next/headers"

export async function registerUser(formData: { name: string; email: string; password: string }) {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  try {
    // Register the user
    const { data: user, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          name: formData.name,
        },
      },
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true, user }
  } catch (error) {
    console.error("Error registering user:", error)
    return { success: false, error: "Internal Server Error" }
  }
}

