"use server"

import { signIn } from "@/auth" // Import the auth configuration
import { AuthError } from "next-auth"
import { redirect } from "next/navigation"

export async function authenticate(prevState: string | undefined, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    })

    // Redirect to the dashboard after successful sign-in
    redirect("/dashboard")
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials."
        default:
          return "Something went wrong."
      }
    }
    throw error
  }
}

