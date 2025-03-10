"use client"

import React, { createContext, useState, useContext, useEffect } from "react"
import api from "../services/api"
import { useToast } from "@/components/ui/use-toast"
import { mockLogin, mockRegister, shouldUseMockApi } from "../services/mockApiService"

export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  avatar?: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: RegisterData) => Promise<boolean>;
  logout: () => void;
  useMockApi: boolean;
}

interface AuthResponse {
  token: string;
  user: User;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [useMockApi, setUseMockApi] = useState<boolean>(shouldUseMockApi())
  const { showToast } = useToast()

  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        // Try real API authentication first
        const token = localStorage.getItem("token")
        if (token) {
          api.defaults.headers.common["Authorization"] = `Bearer ${token}`
          try {
            const response = await api.get("/auth/me")
            setUser(response.data)
            return // Successfully authenticated with real backend
          } catch (error) {
            console.warn("Real authentication failed, token may be invalid", error)
            localStorage.removeItem("token")
            delete api.defaults.headers.common["Authorization"]
          }
        }

        // Only fall back to mock mode if explicitly enabled and no token exists
        if (shouldUseMockApi()) {
          setUseMockApi(true)
          const mockUserJson = localStorage.getItem("mockUser")
          if (mockUserJson) {
            setUser(JSON.parse(mockUserJson))
          }
        }
      } catch (error) {
        console.error("Authentication error:", error)
      } finally {
        setLoading(false)
      }
    }

    checkLoggedIn()
  }, [])
  
  // Check for mock mode changes but don't apply them automatically
  useEffect(() => {
    const currentMockSetting = shouldUseMockApi()
    if (useMockApi !== currentMockSetting) {
      setUseMockApi(currentMockSetting)
    }
  }, [useMockApi])

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Always try real API login first
      try {
        const response = await api.post<AuthResponse>("/auth/login", { email, password })
        const { token, user } = response.data
  
        localStorage.setItem("token", token)
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`
        setUser(user)
  
        showToast({
          title: "Login successful",
          description: "Welcome back!",
          type: "success"
        })
  
        return true
      } catch (error: unknown) {
        // If real API fails and mock is explicitly enabled, fall back to mock
        if (shouldUseMockApi()) {
          const mockResponse = await mockLogin(email, password) as AuthResponse
          const { token, user } = mockResponse
          
          localStorage.setItem("token", token)
          localStorage.setItem("mockUser", JSON.stringify(user))
          setUser(user)
          
          showToast({
            title: "Login successful (Mock)",
            description: "Welcome back! (Using simulated data)",
            type: "success"
          })
          
          return true
        }
        
        // If real API fails and mock is not enabled, show error
        throw error
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }, message?: string }
      showToast({
        title: "Login failed",
        description: err.response?.data?.message || err.message || "Invalid credentials",
        type: "error"
      })
      return false
    }
  }

  const register = async (userData: RegisterData): Promise<boolean> => {
    try {
      // Always try real API registration first
      try {
        const response = await api.post<AuthResponse>("/auth/register", userData)
        const { token, user } = response.data
  
        localStorage.setItem("token", token)
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`
        setUser(user)
  
        showToast({
          title: "Registration successful",
          description: "Your account has been created",
          type: "success"
        })
  
        return true
      } catch (error: unknown) {
        // If real API fails and mock is explicitly enabled, fall back to mock
        if (shouldUseMockApi()) {
          const mockResponse = await mockRegister(
            userData.name, 
            userData.email, 
            userData.password
          ) as AuthResponse
          
          const { token, user } = mockResponse
          
          localStorage.setItem("token", token)
          localStorage.setItem("mockUser", JSON.stringify(user))
          setUser(user)
          
          showToast({
            title: "Registration successful (Mock)",
            description: "Your account has been created (Using simulated data)",
            type: "success"
          })
          
          return true
        }
        
        // If real API fails and mock is not enabled, show error
        throw error
      }
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }, message?: string }
      showToast({
        title: "Registration failed",
        description: err.response?.data?.message || err.message || "Could not create account",
        type: "error"
      })
      return false
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("mockUser")
    delete api.defaults.headers.common["Authorization"]
    setUser(null)

    showToast({
      title: "Logged out",
      description: "You have been logged out successfully",
      type: "default"
    })
  }

  return <AuthContext.Provider value={{ user, loading, login, register, logout, useMockApi }}>{children}</AuthContext.Provider>
} 