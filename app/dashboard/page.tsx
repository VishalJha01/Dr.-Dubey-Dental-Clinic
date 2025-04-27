"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { LogOut, Search, ImageIcon, Filter, Trash2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { isLoggedIn, logout, getAppointments, clearAppointments, formatDateTime, type Appointment } from "@/lib/utils"

// Sample data for initial display
const sampleAppointments: Appointment[] = [
  {
    token: "1234",
    name: "Riya Sharma",
    age: "29",
    gender: "Female",
    phone: "9876543210",
    email: "riya@example.com",
    symptoms: "Severe tooth pain on the right side. Unable to eat or drink.",
    priority: "High",
    appointmentDateTime: "2025-04-30T10:30",
    xrayFileName: "knee-xray.jpeg",
  },
  {
    token: "1456",
    name: "Arjun Mehta",
    age: "34",
    gender: "Male",
    phone: "9876543211",
    email: "arjun@example.com",
    symptoms: "Jaw swelling for the past 3 days. Mild pain when chewing.",
    priority: "Medium",
    appointmentDateTime: "2025-04-30T11:30",
    xrayFileName: "spine-xray.jpeg",
  },
  {
    token: "1789",
    name: "Neha Singh",
    age: "22",
    gender: "Female",
    phone: "9876543212",
    email: "neha@example.com",
    symptoms: "Bleeding gums when brushing. No pain.",
    priority: "Low",
    appointmentDateTime: "2025-04-30T14:00",
    xrayFileName: "hand-xray.jpeg",
  },
]

// Map of xray filenames to their URLs
const xrayImages = {
  "knee-xray.jpeg": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/x1-JdoWC0B0GbWTcYl2elyCH8NVzMjQD9.jpeg",
  "leg-xray.jpeg": "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/x4-67S8tAnZ4vugkfH5YzPRbGoGk3PUmG.jpeg",
  "hand-xray.jpeg":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/x3.jpg-z6JdcawhXzogpOESdT9MvnGvuvJ2lp.jpeg",
  "spine-xray.jpeg":
    "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/x2.jpg-5LAd0812ASoDYXC3mzbXJtyhWK2qv8.jpeg",
}

export default function DashboardPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPriority, setSelectedPriority] = useState<string | null>(null)
  const [selectedXray, setSelectedXray] = useState<string | null>(null)
  const [isXrayModalOpen, setIsXrayModalOpen] = useState(false)

  // Check if user is logged in
  useEffect(() => {
    if (!isLoggedIn()) {
      router.push("/login")
    }
  }, [router])

  // Load appointments
  useEffect(() => {
    const storedAppointments = getAppointments()

    // If no stored appointments, use sample data
    if (storedAppointments.length === 0) {
      setAppointments([...sampleAppointments])
    } else {
      // Combine sample data with stored data (avoiding duplicates by token)
      const existingTokens = new Set(storedAppointments.map((a) => a.token))
      const filteredSamples = sampleAppointments.filter((a) => !existingTokens.has(a.token))

      setAppointments([...filteredSamples, ...storedAppointments])
    }
  }, [])

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const handleClearData = () => {
    clearAppointments()
    setAppointments([...sampleAppointments])

    toast({
      title: "Data Cleared",
      description: "All patient appointments have been reset to default.",
    })
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const handleFilterByPriority = (priority: string | null) => {
    setSelectedPriority(priority)
  }

  const handleViewXray = (xrayFileName: string) => {
    setSelectedXray(xrayFileName)
    setIsXrayModalOpen(true)
  }

  const closeXrayModal = () => {
    setIsXrayModalOpen(false)
    setSelectedXray(null)
  }

  // Filter appointments based on search term and priority
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.name.toLowerCase().includes(searchTerm.toLowerCase()) || appointment.token.includes(searchTerm)

    const matchesPriority = selectedPriority ? appointment.priority === selectedPriority : true

    return matchesSearch && matchesPriority
  })

  // Sort appointments by priority (High > Medium > Low)
  const sortedAppointments = [...filteredAppointments].sort((a, b) => {
    const priorityOrder = { High: 0, Medium: 1, Low: 2 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  // Count appointments by priority
  const highPriorityCount = appointments.filter((a) => a.priority === "High").length
  const mediumPriorityCount = appointments.filter((a) => a.priority === "Medium").length
  const lowPriorityCount = appointments.filter((a) => a.priority === "Low").length

  // Count today's appointments
  const today = new Date().toISOString().split("T")[0]
  const todayAppointments = appointments.filter((a) => a.appointmentDateTime.startsWith(today)).length

  // Get the URL for an xray image
  const getXrayImageUrl = (filename: string) => {
    return xrayImages[filename as keyof typeof xrayImages] || "/placeholder.svg?height=400&width=400"
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-blue-900">Doctor Dashboard</h1>
        <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
          <LogOut size={16} />
          Logout
        </Button>
      </div>

      {/* Dashboard Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="rounded-full bg-blue-100 p-3 mr-3">
              <Search className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Today's Appointments</p>
              <p className="text-2xl font-bold">{todayAppointments}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="rounded-full bg-red-100 p-3 mr-3">
              <Filter className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">High Priority</p>
              <p className="text-2xl font-bold">{highPriorityCount}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="rounded-full bg-yellow-100 p-3 mr-3">
              <Filter className="h-6 w-6 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Medium Priority</p>
              <p className="text-2xl font-bold">{mediumPriorityCount}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 flex items-center">
            <div className="rounded-full bg-green-100 p-3 mr-3">
              <Filter className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Low Priority</p>
              <p className="text-2xl font-bold">{lowPriorityCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Appointment Management</CardTitle>
          <CardDescription>
            View and manage all patient appointments. High priority patients are listed first.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                placeholder="Search by name or token..."
                value={searchTerm}
                onChange={handleSearch}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={selectedPriority === "High" ? "default" : "outline"}
                onClick={() => handleFilterByPriority(selectedPriority === "High" ? null : "High")}
                className={selectedPriority === "High" ? "bg-red-600 hover:bg-red-700" : ""}
              >
                <Filter size={16} className="mr-2" />
                High Priority
              </Button>
              <Button
                variant={selectedPriority === "Medium" ? "default" : "outline"}
                onClick={() => handleFilterByPriority(selectedPriority === "Medium" ? null : "Medium")}
                className={selectedPriority === "Medium" ? "bg-yellow-600 hover:bg-yellow-700" : ""}
              >
                <Filter size={16} className="mr-2" />
                Medium Priority
              </Button>
              <Button
                variant={selectedPriority === "Low" ? "default" : "outline"}
                onClick={() => handleFilterByPriority(selectedPriority === "Low" ? null : "Low")}
                className={selectedPriority === "Low" ? "bg-green-600 hover:bg-green-700" : ""}
              >
                <Filter size={16} className="mr-2" />
                Low Priority
              </Button>
            </div>
            <Button variant="destructive" onClick={handleClearData} className="flex items-center gap-2">
              <Trash2 size={16} />
              Clear Data
            </Button>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Token</TableHead>
                  <TableHead>Patient</TableHead>
                  <TableHead>Symptoms</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Appointment</TableHead>
                  <TableHead>X-ray</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedAppointments.length > 0 ? (
                  sortedAppointments.map((appointment) => (
                    <TableRow key={appointment.token}>
                      <TableCell className="font-medium">#{appointment.token}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{appointment.name}</div>
                          <div className="text-sm text-gray-500">
                            {appointment.age} yrs, {appointment.gender}
                          </div>
                          <div className="text-sm text-gray-500">{appointment.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-xs">
                        <div className="truncate">{appointment.symptoms}</div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            appointment.priority === "High"
                              ? "bg-red-100 text-red-800 hover:bg-red-100"
                              : appointment.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                : "bg-green-100 text-green-800 hover:bg-green-100"
                          }
                        >
                          {appointment.priority}
                        </Badge>
                      </TableCell>
                      <TableCell>{formatDateTime(appointment.appointmentDateTime)}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex items-center gap-1"
                          onClick={() => handleViewXray(appointment.xrayFileName)}
                        >
                          <ImageIcon size={14} />
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-4">
                      No appointments found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* X-ray Modal */}
      <Dialog open={isXrayModalOpen} onOpenChange={closeXrayModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>X-ray Image</DialogTitle>
          </DialogHeader>
          <div className="flex justify-center p-4">
            <div className="bg-gray-100 rounded-lg p-4 w-full">
              <div className="aspect-square w-full max-w-md mx-auto bg-black flex items-center justify-center">
                {selectedXray && (
                  <Image
                    src={getXrayImageUrl(selectedXray) || "/placeholder.svg"}
                    alt="X-ray"
                    width={400}
                    height={400}
                    className="max-h-full max-w-full object-contain"
                  />
                )}
              </div>
              <p className="text-center mt-4 text-gray-600">{selectedXray}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
