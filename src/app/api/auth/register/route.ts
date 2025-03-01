import { NextResponse } from "next/server"
import { getSupabaseAdmin } from "@/lib/supabase"
import { hash } from "bcryptjs"

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json()
    const supabase = getSupabaseAdmin()

    // 1. Verificar si el usuario ya existe
    const { data: existingUser } = await supabase.from("users").select("*").eq("email", email).single()

    if (existingUser) {
      return NextResponse.json({ success: false, error: "El usuario ya existe" }, { status: 400 })
    }

    // 2. Crear usuario en Supabase Auth
    const hashedPassword = await hash(password, 12)
    const { data: authUser, error: authError } = await supabase.auth.admin.createUser({
      email,
      password: hashedPassword,
      email_confirm: true,
      user_metadata: { name },
    })

    if (authError) {
      console.error("Error creating auth user:", authError)
      return NextResponse.json({ success: false, error: authError.message }, { status: 400 })
    }

    if (!authUser.user) {
      return NextResponse.json({ success: false, error: "Error al crear el usuario" }, { status: 500 })
    }

    // 3. Crear perfil en la tabla users
    const { error: profileError } = await supabase.from("users").insert([
      {
        id: authUser.user.id,
        email: authUser.user.email,
        name,
        created_at: new Date().toISOString(),
      },
    ])

    if (profileError) {
      // Si falla la creación del perfil, eliminar el usuario de auth
      await supabase.auth.admin.deleteUser(authUser.user.id)
      console.error("Error creating user profile:", profileError)
      return NextResponse.json({ success: false, error: "Error al crear el perfil de usuario" }, { status: 500 })
    }

    return NextResponse.json(
      {
        success: true,
        message: "Usuario creado exitosamente",
        user: {
          id: authUser.user.id,
          email: authUser.user.email,
          name,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ success: false, error: "Error al procesar la solicitud" }, { status: 500 })
  }
}

