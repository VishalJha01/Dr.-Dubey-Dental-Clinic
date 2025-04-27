"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { saveAppointment } from "@/lib/utils"

export default function AppointmentPage() {
  const { toast } = useToast()
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    phone: "",
    email: "",
    symptoms: "",
    appointmentDateTime: "",
    xrayFile: null as File | null,
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [tokenNumber, setTokenNumber] = useState("")
  const [priority, setPriority] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      })
    }
  }

  const handleGenderChange = (value: string) => {
    setFormData({
      ...formData,
      gender: value,
    })

    // Clear error when user selects
    if (formErrors.gender) {
      setFormErrors({
        ...formErrors,
        gender: "",
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        xrayFile: e.target.files[0],
      })

      // Clear error when user uploads
      if (formErrors.xrayFile) {
        setFormErrors({
          ...formErrors,
          xrayFile: "",
        })
      }
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.fullName.trim()) errors.fullName = "Full name is required"
    if (!formData.age.trim()) errors.age = "Age is required"
    if (!formData.gender) errors.gender = "Gender is required"
    if (!formData.phone.trim()) errors.phone = "Phone number is required"
    if (!formData.email.trim()) errors.email = "Email is required"
    if (!formData.symptoms.trim()) errors.symptoms = "Symptoms description is required"
    if (!formData.appointmentDateTime) errors.appointmentDateTime = "Appointment date and time is required"
    if (!formData.xrayFile) errors.xrayFile = "X-ray upload is required"

    return errors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const errors = validateForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors)

      toast({
        title: "Form Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })

      return
    }

    // Save appointment
    const appointment = saveAppointment({
      name: formData.fullName,
      age: formData.age,
      gender: formData.gender,
      phone: formData.phone,
      email: formData.email,
      symptoms: formData.symptoms,
      appointmentDateTime: formData.appointmentDateTime,
      xrayFileName: formData.xrayFile ? formData.xrayFile.name : "no-xray.jpg",
    })

    // Update state to show success message
    setTokenNumber(appointment.token)
    setPriority(appointment.priority)
    setIsSubmitted(true)

    toast({
      title: "Appointment Booked Successfully!",
      description: `Your token number is #${appointment.token}`,
    })

    // Reset form after submission
    if (formRef.current) {
      formRef.current.reset()
    }

    setFormData({
      fullName: "",
      age: "",
      gender: "",
      phone: "",
      email: "",
      symptoms: "",
      appointmentDateTime: "",
      xrayFile: null,
    })
  }

  return (
    <div className="container mx-auto px-4 py-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-blue-900 mb-6 text-center">Book Your Appointment</h1>
        <p className="text-gray-700 mb-8 text-center">
          Fill out the form below to schedule an appointment with Dr. Dubey. Please provide all required information.
        </p>

        {isSubmitted ? (
          <Alert className="bg-green-50 border-green-200 mb-6">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
            <AlertTitle className="text-green-800 text-lg">Appointment Booked Successfully!</AlertTitle>
            <AlertDescription className="text-green-700">
              <p className="mb-2">Thank you for booking an appointment with Dr. Dubey&apos;s Dental Centre.</p>
              <p className="mb-2">
                <strong>Your Token Number:</strong> #{tokenNumber}
              </p>
              <p className="mb-2">
                <strong>Priority Level:</strong> {priority}
              </p>
              <p>
                We will contact you shortly to confirm your appointment. Please arrive 15 minutes before your scheduled
                time.
              </p>
            </AlertDescription>
          </Alert>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Appointment Form</CardTitle>
              <CardDescription>Please fill in all the required information to book your appointment.</CardDescription>
            </CardHeader>
            <CardContent>
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={formErrors.fullName ? "border-red-500" : ""}
                    />
                    {formErrors.fullName && <p className="text-red-500 text-sm">{formErrors.fullName}</p>}
                  </div>

                  {/* Age */}
                  <div className="space-y-2">
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      name="age"
                      type="number"
                      value={formData.age}
                      onChange={handleInputChange}
                      className={formErrors.age ? "border-red-500" : ""}
                    />
                    {formErrors.age && <p className="text-red-500 text-sm">{formErrors.age}</p>}
                  </div>

                  {/* Gender */}
                  <div className="space-y-2">
                    <Label>Gender *</Label>
                    <RadioGroup value={formData.gender} onValueChange={handleGenderChange} className="flex space-x-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Male" id="male" />
                        <Label htmlFor="male">Male</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Female" id="female" />
                        <Label htmlFor="female">Female</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                    {formErrors.gender && <p className="text-red-500 text-sm">{formErrors.gender}</p>}
                  </div>

                  {/* Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={formErrors.phone ? "border-red-500" : ""}
                    />
                    {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={formErrors.email ? "border-red-500" : ""}
                    />
                    {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                  </div>

                  {/* Appointment Date & Time */}
                  <div className="space-y-2">
                    <Label htmlFor="appointmentDateTime">Preferred Date & Time *</Label>
                    <Input
                      id="appointmentDateTime"
                      name="appointmentDateTime"
                      type="datetime-local"
                      value={formData.appointmentDateTime}
                      onChange={handleInputChange}
                      className={formErrors.appointmentDateTime ? "border-red-500" : ""}
                    />
                    {formErrors.appointmentDateTime && (
                      <p className="text-red-500 text-sm">{formErrors.appointmentDateTime}</p>
                    )}
                  </div>
                </div>

                {/* Symptoms */}
                <div className="space-y-2">
                  <Label htmlFor="symptoms">Symptom Description *</Label>
                  <Textarea
                    id="symptoms"
                    name="symptoms"
                    rows={4}
                    value={formData.symptoms}
                    onChange={handleInputChange}
                    className={formErrors.symptoms ? "border-red-500" : ""}
                    placeholder="Please describe your symptoms in detail..."
                  />
                  {formErrors.symptoms && <p className="text-red-500 text-sm">{formErrors.symptoms}</p>}
                </div>

                {/* X-ray Upload */}
                <div className="space-y-2">
                  <Label htmlFor="xrayFile">Upload X-ray (if available) *</Label>
                  <Input
                    id="xrayFile"
                    name="xrayFile"
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={handleFileChange}
                    className={formErrors.xrayFile ? "border-red-500" : ""}
                  />
                  {formErrors.xrayFile && <p className="text-red-500 text-sm">{formErrors.xrayFile}</p>}
                  <p className="text-sm text-gray-500">Accepted formats: JPG, JPEG, PNG</p>
                </div>

                {/* Consultation Fee */}
                <div className="bg-blue-50 p-4 rounded-md">
                  <p className="font-medium text-blue-800">Consultation Fee: ₹299</p>
                  <p className="text-sm text-gray-600">The fee is payable at the clinic during your appointment.</p>
                </div>

                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                  Book Appointment
                </Button>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
