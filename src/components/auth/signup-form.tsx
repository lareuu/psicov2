"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

export default function SignUpForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const { signUp, signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // First attempt to sign up
      const { error: signUpError, success: signUpSuccess } = await signUp(email, password, name)

      if (signUpError) {
        console.error("Sign up error:", signUpError)
        toast({
          title: "Error al crear la cuenta",
          description: signUpError.message,
          variant: "destructive",
        })
        return
      }

      if (signUpSuccess) {
        // Show success message
        toast({
          title: "¡Cuenta creada con éxito!",
          description: "Iniciando sesión...",
        })

        // Attempt to sign in immediately after successful signup
        const { error: signInError, success: signInSuccess } = await signIn(email, password)

        if (signInError) {
          console.error("Auto-login error:", signInError)
          toast({
            title: "Error al iniciar sesión",
            description:
              "Cuenta creada pero no se pudo iniciar sesión automáticamente. Por favor, inténtalo manualmente.",
            variant: "destructive",
          })
          router.push("/login")
          return
        }

        if (signInSuccess) {
          // If everything is successful, redirect to dashboard
          toast({
            title: "¡Bienvenido!",
            description: "Has iniciado sesión correctamente.",
          })
          router.push("/dashboard")
          router.refresh()
        }
      }
    } catch (error) {
      console.error("Signup process error:", error)
      toast({
        title: "Error",
        description: "Ocurrió un error inesperado. Por favor, inténtalo de nuevo.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Crear una cuenta</CardTitle>
        <CardDescription>Introduce tus datos para crear una nueva cuenta</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo</Label>
            <Input
              id="name"
              placeholder="Juan Pérez"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Contraseña</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              minLength={8}
            />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                <span>Creando cuenta...</span>
              </div>
            ) : (
              "Crear cuenta"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

