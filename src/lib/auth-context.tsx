"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: any; success?: boolean }>
  signUp: (email: string, password: string, name: string) => Promise<{ error?: any; success?: boolean }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClientComponentClient()
  const router = useRouter() // Inicializa el useRouter

  useEffect(() => {
    // Check active sessions and sets the user
    const initializeAuth = async () => {
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          console.error("Error in getSession:", error)
          setLoading(false)
          return
        }

        if (session?.user) {
          // Fetch additional user data from the users table
          const { data: userData, error: userError } = await supabase
            .from("users")
            .select("*")
            .eq("id", session.user.id)
            .single()

          if (userData && !userError) {
            // Merge user profile data with auth metadata
            setUser({
              ...session.user,
              user_metadata: {
                ...session.user.user_metadata,
                name: userData.name,
              },
            })
          } else {
            setUser(session.user)
          }
        }
        setLoading(false)
      } catch (error) {
        console.error("Error initializing auth:", error)
        setLoading(false)
      }
    }

    initializeAuth()

    // Listen for changes on auth state
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        // Fetch additional user data when auth state changes
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("id", session.user.id)
          .single()

        if (userData && !userError) {
          setUser({
            ...session.user,
            user_metadata: {
              ...session.user.user_metadata,
              name: userData.name,
            },
          })
        } else {
          setUser(session.user)
        }
      } else {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      // Fetch user profile data after successful sign in
      if (data.user) {
        const { data: userData, error: userError } = await supabase
          .from("users")
          .select("*")
          .eq("id", data.user.id)
          .single()

        if (userData && !userError) {
          const userWithProfile = {
            ...data.user,
            user_metadata: {
              ...data.user.user_metadata,
              name: userData.name,
            },
          }
          setUser(userWithProfile)
          router.refresh() // Refresca la ruta del lado del servidor
        }
      }

      return { success: true }
    } catch (error) {
      console.error("Sign in error:", error)
      return { error }
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      // First, sign up the user
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name, // Store name in user_metadata
          },
        },
      })

      if (signUpError) throw signUpError

      // Then, store additional user data
      if (data.user) {
        const { error: profileError } = await supabase.from("users").insert([
          {
            id: data.user.id,
            name,
            email,
          },
        ])

        if (profileError) throw profileError

        // Update local user state with metadata
        const userWithProfile = {
          ...data.user,
          user_metadata: {
            ...data.user.user_metadata,
            name,
          },
        }
        setUser(userWithProfile)
        router.refresh() // Refresca la ruta del lado del servidor
      }

      return { success: true }
    } catch (error) {
      console.error("Sign up error:", error)
      return { error }
    }
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    setUser(null)
    //router.push("/login")
    router.refresh()
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

