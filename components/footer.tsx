import Link from "next/link"
import { Phone, Mail, MapPin, Clock, Facebook, Twitter, Instagram } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Clinic Info */}
          <div>
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Dr. Dubey&apos;s Dental Centre</h3>
            <p className="text-gray-600 mb-4">
              Providing quality dental care and facial surgery services with the latest technology and personalized
              treatment plans.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-600 hover:text-blue-800">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-800">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-blue-600 hover:text-blue-800">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-600 hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/#about" className="text-gray-600 hover:text-blue-600">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#services" className="text-gray-600 hover:text-blue-600">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/appointment" className="text-gray-600 hover:text-blue-600">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="text-gray-600 hover:text-blue-600">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <Phone size={18} className="text-blue-600 mr-2 mt-1" />
                <span className="text-gray-600">+91 8077018989</span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="text-blue-600 mr-2 mt-1" />
                <span className="text-gray-600">info@drdubey.com</span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="text-blue-600 mr-2 mt-1" />
                <span className="text-gray-600">Ground Floor, Apex Acacia Valley, D-3, opp. Hiralal Halwai, Block C, Sector 3, Vaishali, Ghaziabad, Uttar Pradesh 201019</span>
              </li>
              <li className="flex items-start">
                <Clock size={18} className="text-blue-600 mr-2 mt-1" />
                <span className="text-gray-600">Mon-Sat: 9:00 AM - 7:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 mt-8 pt-6 text-center">
          <p className="text-gray-600 text-sm">
            &copy; {new Date().getFullYear()} Dr. Dubey&apos;s Dental Implant & Facial Surgery Centre. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
