// DOM Elements
document.addEventListener("DOMContentLoaded", () => {
  // Check which page we're on
  const currentPage = window.location.pathname.split("/").pop()

  // Initialize the appropriate functionality based on the current page
  if (currentPage === "appointment.html" || currentPage === "") {
    initAppointmentPage()
  } else if (currentPage === "login.html") {
    initLoginPage()
  } else if (currentPage === "dashboard.html") {
    initDashboardPage()
  }
})

// Appointment Page Functionality
function initAppointmentPage() {
  const appointmentForm = document.getElementById("appointmentForm")
  if (!appointmentForm) return

  const confirmationModalElement = document.getElementById("confirmationModal")
  if (!confirmationModalElement) return

  const confirmationModal = new bootstrap.Modal(confirmationModalElement)

  // Form Validation
  appointmentForm.addEventListener("submit", (event) => {
    event.preventDefault()

    if (!appointmentForm.checkValidity()) {
      event.stopPropagation()
      appointmentForm.classList.add("was-validated")
      return
    }

    // Get form data
    const formData = {
      token: generateToken(),
      name: document.getElementById("fullName").value,
      age: document.getElementById("age").value,
      gender: document.getElementById("gender").value,
      phone: document.getElementById("phone").value,
      email: document.getElementById("email").value,
      symptoms: document.getElementById("symptoms").value,
      priority: assignPriority(document.getElementById("symptoms").value),
      appointmentDateTime: `${document.getElementById("appointmentDate").value}T${document.getElementById("appointmentTime").value}`,
      xrayFileName:
        document.getElementById("xrayUpload").files.length > 0
          ? document.getElementById("xrayUpload").files[0].name
          : "No X-ray",
    }

    // Save appointment to localStorage
    saveAppointment(formData)

    // Show confirmation modal with token and priority
    document.getElementById("tokenNumber").textContent = `#${formData.token}`
    document.getElementById("priorityLevel").textContent = formData.priority
    document.getElementById("priorityLevel").className = `fw-bold ${getPriorityClass(formData.priority)}`

    confirmationModal.show()

    // Reset form after submission
    appointmentForm.reset()
    appointmentForm.classList.remove("was-validated")
  })
}

// Login Page Functionality
function initLoginPage() {
  const loginForm = document.getElementById("loginForm")
  if (!loginForm) return

  const loginAlert = document.getElementById("loginAlert")

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault()

    if (!loginForm.checkValidity()) {
      event.stopPropagation()
      loginForm.classList.add("was-validated")
      return
    }

    const email = document.getElementById("loginEmail").value
    const password = document.getElementById("loginPassword").value

    // Simple validation (in a real app, this would be server-side)
    if (email === "admin@clinic.com" && password === "123456") {
      // Redirect to dashboard
      window.location.href = "dashboard.html"
    } else {
      // Show error message
      loginAlert.classList.remove("d-none")
      loginAlert.querySelector("#loginAlertMessage").textContent = "Invalid email or password. Please try again."
    }
  })
}

// Dashboard Page Functionality
function initDashboardPage() {
  // Check if we're on the dashboard page
  const appointmentsTableBody = document.getElementById("appointmentsTableBody")
  if (!appointmentsTableBody) return

  // Load appointments from localStorage
  const appointments = getAppointments()

  // Add some dummy data if no appointments exist
  if (appointments.length === 0) {
    addDummyData()
  }

  // Display appointments in the table
  displayAppointments(getAppointments())

  // Update dashboard stats
  updateDashboardStats()

  // Set up event listeners for filtering
  document.getElementById("filterAll").addEventListener("click", () => {
    displayAppointments(getAppointments())
  })

  document.getElementById("filterHigh").addEventListener("click", () => {
    const filtered = getAppointments().filter((appointment) => appointment.priority === "High")
    displayAppointments(filtered)
  })

  document.getElementById("filterMedium").addEventListener("click", () => {
    const filtered = getAppointments().filter((appointment) => appointment.priority === "Medium")
    displayAppointments(filtered)
  })

  document.getElementById("filterLow").addEventListener("click", () => {
    const filtered = getAppointments().filter((appointment) => appointment.priority === "Low")
    displayAppointments(filtered)
  })

  // Search functionality
  document.getElementById("searchAppointment").addEventListener("input", (e) => {
    const searchTerm = e.target.value.toLowerCase()
    if (searchTerm.trim() === "") {
      displayAppointments(getAppointments())
    } else {
      const filtered = getAppointments().filter(
        (appointment) =>
          appointment.name.toLowerCase().includes(searchTerm) || appointment.token.toString().includes(searchTerm),
      )
      displayAppointments(filtered)
    }
  })

  // Clear data button
  document.getElementById("clearData").addEventListener("click", () => {
    if (confirm("Are you sure you want to clear all appointment data? This cannot be undone.")) {
      localStorage.removeItem("appointments")
      displayAppointments([])
      updateDashboardStats()
    }
  })

  // Logout button
  document.getElementById("logoutBtn").addEventListener("click", (e) => {
    e.preventDefault()
    window.location.href = "login.html"
  })

  // Setup X-ray modal functionality
  setupXrayModal()
}

// Setup X-ray modal functionality
function setupXrayModal() {
  // When the modal is about to be shown, update the image
  const xrayModal = document.getElementById("xrayModal")
  if (!xrayModal) return

  xrayModal.addEventListener("show.bs.modal", (event) => {
    const button = event.relatedTarget
    const xrayFileName = button.getAttribute("data-xray-filename")

    document.getElementById("xrayFileName").textContent = xrayFileName
    // In a real app, we would load the actual image here
    // For demo purposes, we're using a placeholder
    document.getElementById("xrayImage").src = "/placeholder.svg?height=400&width=400"
  })
}

// Helper Functions

// Generate a random 4-digit token
function generateToken() {
  return Math.floor(1000 + Math.random() * 9000)
}

// Assign priority based on symptoms (simple algorithm)
function assignPriority(symptoms) {
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

// Get priority badge class
function getPriorityClass(priority) {
  switch (priority) {
    case "High":
      return "text-danger"
    case "Medium":
      return "text-warning"
    case "Low":
      return "text-success"
    default:
      return ""
  }
}

// Save appointment to localStorage
function saveAppointment(appointment) {
  const appointments = getAppointments()
  appointments.push(appointment)
  localStorage.setItem("appointments", JSON.stringify(appointments))
}

// Get appointments from localStorage
function getAppointments() {
  const appointments = localStorage.getItem("appointments")
  return appointments ? JSON.parse(appointments) : []
}

// Display appointments in the table
function displayAppointments(appointments) {
  const tableBody = document.getElementById("appointmentsTableBody")
  if (!tableBody) return

  // Clear existing rows
  tableBody.innerHTML = ""

  // Sort appointments by priority (High > Medium > Low)
  appointments.sort((a, b) => {
    const priorityOrder = { High: 0, Medium: 1, Low: 2 }
    return priorityOrder[a.priority] - priorityOrder[b.priority]
  })

  // Add rows to the table
  appointments.forEach((appointment) => {
    const row = document.createElement("tr")

    // Format date and time
    const appointmentDate = new Date(appointment.appointmentDateTime)
    const formattedDate = appointmentDate.toLocaleDateString()
    const formattedTime = appointmentDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })

    // Create badge based on priority
    const priorityBadge = `<span class="badge ${
      appointment.priority === "High"
        ? "bg-danger"
        : appointment.priority === "Medium"
          ? "bg-warning text-dark"
          : "bg-success"
    }">${appointment.priority}</span>`

    // Create X-ray thumbnail or placeholder
    const xrayThumbnail =
      appointment.xrayFileName !== "No X-ray"
        ? `<img src="/placeholder.svg?height=50&width=50" alt="X-ray" class="xray-thumbnail" data-bs-toggle="modal" data-bs-target="#xrayModal" data-xray-filename="${appointment.xrayFileName}">`
        : '<span class="badge bg-secondary">No X-ray</span>'

    row.innerHTML = `
      <td>#${appointment.token}</td>
      <td>${appointment.name}</td>
      <td>${appointment.age} / ${appointment.gender}</td>
      <td>${appointment.phone}</td>
      <td>${appointment.symptoms.substring(0, 30)}${appointment.symptoms.length > 30 ? "..." : ""}</td>
      <td>${priorityBadge}</td>
      <td>${xrayThumbnail}</td>
      <td>${formattedDate}<br>${formattedTime}</td>
      <td>
        <button class="btn btn-sm btn-outline-primary me-1" title="View Details">
          <i class="bi bi-eye"></i>
        </button>
        <button class="btn btn-sm btn-outline-danger" title="Cancel Appointment">
          <i class="bi bi-x-circle"></i>
        </button>
      </td>
    `

    tableBody.appendChild(row)
  })
}

// Update dashboard stats
function updateDashboardStats() {
  const appointments = getAppointments()

  // Count today's appointments
  const today = new Date().toISOString().split("T")[0]
  const todayAppointments = appointments.filter((appointment) =>
    appointment.appointmentDateTime.startsWith(today),
  ).length

  // Count appointments by priority
  const highPriority = appointments.filter((appointment) => appointment.priority === "High").length
  const mediumPriority = appointments.filter((appointment) => appointment.priority === "Medium").length
  const lowPriority = appointments.filter((appointment) => appointment.priority === "Low").length

  // Update the dashboard stats
  const todayAppointmentsElement = document.getElementById("todayAppointments")
  const highPriorityCountElement = document.getElementById("highPriorityCount")
  const mediumPriorityCountElement = document.getElementById("mediumPriorityCount")
  const lowPriorityCountElement = document.getElementById("lowPriorityCount")

  if (todayAppointmentsElement) todayAppointmentsElement.textContent = todayAppointments
  if (highPriorityCountElement) highPriorityCountElement.textContent = highPriority
  if (mediumPriorityCountElement) mediumPriorityCountElement.textContent = mediumPriority
  if (lowPriorityCountElement) lowPriorityCountElement.textContent = lowPriority
}

// Add dummy data for demonstration
function addDummyData() {
  const dummyData = [
    {
      token: 1234,
      name: "Riya Sharma",
      age: 29,
      gender: "Female",
      phone: "9876543210",
      email: "riya@example.com",
      symptoms: "Severe tooth pain in the lower right molar",
      priority: "High",
      appointmentDateTime: getTodayDate() + "T10:30",
      xrayFileName: "riya-xray.png",
    },
    {
      token: 1456,
      name: "Arjun Mehta",
      age: 34,
      gender: "Male",
      phone: "9876543211",
      email: "arjun@example.com",
      symptoms: "Jaw swelling and moderate pain when chewing",
      priority: "Medium",
      appointmentDateTime: getTodayDate() + "T11:45",
      xrayFileName: "arjun-xray.png",
    },
    {
      token: 1789,
      name: "Neha Singh",
      age: 22,
      gender: "Female",
      phone: "9876543212",
      email: "neha@example.com",
      symptoms: "Bleeding gums during brushing",
      priority: "Low",
      appointmentDateTime: getTodayDate() + "T14:15",
      xrayFileName: "No X-ray",
    },
  ]

  localStorage.setItem("appointments", JSON.stringify(dummyData))
}

// Get today's date in YYYY-MM-DD format
function getTodayDate() {
  const today = new Date()
  return today.toISOString().split("T")[0]
}
