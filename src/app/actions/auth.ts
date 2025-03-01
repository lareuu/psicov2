"use server"

import { getSupabaseAdmin } from "@/lib/supabase/supabase-admin"
import { hash } from "bcryptjs"
import { cookies } from "next/headers"

export async function register(formData: {
  name: string
  email: string
  password: string
}): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = getSupabaseAdmin()

    // 1. Verificar si el usuario ya existe
    const { data: existingUser } = await supabase.from("users").select("*").eq("email", formData.email).single()

    if (existingUser) {
      return { success: false, error: "El usuario ya existe" }
    }

    // 2. Crear usuario en Supabase Auth
    const hashedPassword = await hash(formData.password, 12)
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email: formData.email,
      password: hashedPassword,
      email_confirm: true,
      user_metadata: { name: formData.name },
    })

    if (authError || !authUser.user) {
      console.error("Error creating auth user:", authError)
      return { success: false, error: authError?.message || "Error al crear el usuario" }
    }

    // 3. Crear perfil en la tabla users
    const { error: profileError } = await supabase.from("users").insert([
      {
        id: authUser.user.id,
        email: authUser.user.email,
        name: formData.name,
        created_at: new Date().toISOString(),
      },
    ])

    if (profileError) {
      // Si falla la creación del perfil, eliminar el usuario de auth
      await supabase.auth.admin.deleteUser(authUser.user.id)
      console.error("Error creating user profile:", profileError)
      return { success: false, error: "Error al crear el perfil de usuario" }
    }

    // 4. Iniciar sesión automáticamente
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })

    if (signInError) {
      return { success: false, error: "Error al iniciar sesión automáticamente" }
    }

    // 5. Establecer la cookie de sesión
    const cookieStore = cookies()
    cookieStore.set("session", JSON.stringify(signInData), {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 semana
    })

    return { success: true }
  } catch (error) {
    console.error("Registration error:", error)
    return { success: false, error: "Error al procesar la solicitud" }
  }
}

export async function login(formData: {
  email: string
  password: string
}): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = getSupabaseAdmin()

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email,
      password: formData.password,
    })

    if (error || !data.user) {
      return { success: false, error: "Credenciales inválidas" }
    }

    // Establecer la cookie de sesión
    const cookieStore = cookies()
    cookieStore.set("session", JSON.stringify(data), {
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 semana
    })

    return { success: true }
  } catch (error) {
    console.error("Login error:", error)
    return { success: false, error: "Error en la autenticación" }
  }
}

