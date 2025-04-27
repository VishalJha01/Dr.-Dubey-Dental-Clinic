"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X } from "lucide-react"
import { useAuth } from "@/components/auth-provider"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated, logout } = useAuth()

  // Function to check if a link is active
  const isActive = (path: string) => {
    if (path === "/") return pathname === path
    return pathname.startsWith(path)
  }

  return (
    <nav className="bg-white shadow-md fixed top-0 w-full z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                <span className="text-white font-bold text-lg">DD</span>
              </div>
              <span className="text-xl font-semibold text-blue-800 hidden md:block">
                Dr. Dubey&apos;s Dental Centre
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              href="/"
              className={`px-3 py-2 rounded-md ${isActive("/") ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"}`}
            >
              Home
            </Link>
            <Link href="/#about" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
              About
            </Link>
            <Link href="/#services" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
              Services
            </Link>
            <Link
              href="/appointment"
              className={`px-3 py-2 rounded-md ${isActive("/appointment") ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"}`}
            >
              Book Appointment
            </Link>
            <Link href="/#contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md">
              Contact
            </Link>

            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className={`px-3 py-2 rounded-md ${isActive("/dashboard") ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"}`}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => logout()}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className={`bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 ${isActive("/login") ? "bg-blue-700" : ""}`}
              >
                Doctor Login
              </Link>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700 hover:text-blue-600 focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
              <Link
                href="/"
                className={`block px-3 py-2 rounded-md ${isActive("/") ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"}`}
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/#about"
                className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link
                href="/#services"
                className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/appointment"
                className={`block px-3 py-2 rounded-md ${isActive("/appointment") ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"}`}
                onClick={() => setIsOpen(false)}
              >
                Book Appointment
              </Link>
              <Link
                href="/#contact"
                className="block text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>

              {isAuthenticated ? (
                <>
                  <Link
                    href="/dashboard"
                    className={`block px-3 py-2 rounded-md ${isActive("/dashboard") ? "text-blue-600 font-medium" : "text-gray-700 hover:text-blue-600"}`}
                    onClick={() => setIsOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      logout()
                      setIsOpen(false)
                    }}
                    className="block w-full text-left bg-red-600 text-white px-3 py-2 rounded-md hover:bg-red-700 transition duration-300"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className={`block bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition duration-300 ${isActive("/login") ? "bg-blue-700" : ""}`}
                  onClick={() => setIsOpen(false)}
                >
                  Doctor Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
