"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter, usePathname } from "next/navigation"
import { isLoggedIn, login, logout } from "@/lib/utils"

interface AuthContextType {
  isAuthenticated: boolean
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Check authentication status on mount and when pathname changes
  useEffect(() => {
    const authStatus = isLoggedIn()
    setIsAuthenticated(authStatus)

    // Redirect if accessing protected routes while not authenticated
    if (!authStatus && pathname === "/dashboard") {
      router.push("/login")
    }
  }, [pathname, router])

  const handleLogin = (email: string, password: string) => {
    const success = login(email, password)
    if (success) {
      setIsAuthenticated(true)
    }
    return success
  }

  const handleLogout = () => {
    logout()
    setIsAuthenticated(false)
    router.push("/login")
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login: handleLogin,
        logout: handleLogout,
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
