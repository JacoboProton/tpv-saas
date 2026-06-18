"use client"

import { createAuthClient } from "better-auth/react"

const authClient = createAuthClient()

export default function SignOutButton() {
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          window.location.href = "/login"
        }
      }
    })
  }

  return (
    <button
      onClick={handleSignOut}
      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-sm font-medium"
    >
      Cerrar Sesión
    </button>
  )
}
