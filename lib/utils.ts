import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Authentication utilities
export function isLoggedIn(): boolean {
  if (typeof window === "undefined") return false
  return sessionStorage.getItem("isLoggedIn") === "true"
}

export function login(email: string, password: string): boolean {
  // Simple validation for demo purposes
  if (email === "admin@clinic.com" && password === "123456") {
    sessionStorage.setItem("isLoggedIn", "true")
    return true
  }
  return false
}

export function logout(): void {
  sessionStorage.removeItem("isLoggedIn")
}

// Appointment utilities
export interface Appointment {
  token: string
  name: string
  age: string
  gender: string
  phone: string
  email: string
  symptoms: string
  priority: "High" | "Medium" | "Low"
  appointmentDateTime: string
  xrayFileName: string
}

export function getAppointments(): Appointment[] {
  if (typeof window === "undefined") return []

  const appointments = localStorage.getItem("appointments")
  if (!appointments) return []

  try {
    return JSON.parse(appointments)
  } catch (error) {
    console.error("Error parsing appointments:", error)
    return []
  }
}

export function saveAppointment(appointment: Omit<Appointment, "token" | "priority">): Appointment {
  const token = generateToken()
  const priority = assignPriority(appointment.symptoms)

  const newAppointment: Appointment = {
    ...appointment,
    token,
    priority,
  }

  const appointments = getAppointments()
  appointments.push(newAppointment)

  localStorage.setItem("appointments", JSON.stringify(appointments))
  return newAppointment
}

export function clearAppointments(): void {
  localStorage.removeItem("appointments")
}

// Helper functions
export function generateToken(): string {
  return Math.floor(1000 + Math.random() * 9000).toString()
}

export function assignPriority(symptoms: string): "High" | "Medium" | "Low" {
  const symptomText = symptoms.toLowerCase()

  // High priority keywords
  const highPriorityKeywords = ["severe", "pain", "bleeding", "swelling", "emergency", "accident"]

  // Medium priority keywords
  const mediumPriorityKeywords = ["discomfort", "sensitivity", "broken", "loose", "moderate"]

  // Check for high priority symptoms
  for (const keyword of highPriorityKeywords) {
    if (symptomText.includes(keyword)) {
      return "High"
    }
  }

  // Check for medium priority symptoms
  for (const keyword of mediumPriorityKeywords) {
    if (symptomText.includes(keyword)) {
      return "Medium"
    }
  }

  // Default to low priority
  return "Low"
}

export function formatDateTime(dateTimeStr: string): string {
  const date = new Date(dateTimeStr)
  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
}
