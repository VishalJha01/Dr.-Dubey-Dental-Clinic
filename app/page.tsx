import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { SmileIcon as Tooth, Stethoscope, Scissors, Activity, ArrowRight, Phone, Mail, MapPin, Clock } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-blue-50 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
                Expert Dental Care for Your Perfect Smile
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Welcome to Dr. Dubey&apos;s Dental Implant & Facial Surgery Centre, where we provide comprehensive
                dental care with the latest technology and personalized treatment plans.
              </p>
              <Link href="/appointment">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md text-lg">
                  Book Appointment
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-full max-w-md h-80">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12-r7y1ZVpZcDxeLhISPlCIOYME20a2zi.png"
                  alt="Dental Logo"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="relative w-full max-w-md h-80 mx-auto">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/dent.jpg-GkCJv5sYdIiNMyCYUjdxVwYrkw7WZz.jpeg"
                  alt="Dental Clinic"
                  fill
                  className="object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h2 className="text-3xl font-bold text-blue-900 mb-4">About Our Clinic</h2>
              <p className="text-gray-700 mb-4">
                Dr. Dubey&apos;s Dental Implant & Facial Surgery Centre is a state-of-the-art dental facility dedicated
                to providing exceptional dental care in a comfortable and welcoming environment.
              </p>
              <p className="text-gray-700 mb-4">
                With over 15 years of experience, Dr. Dubey specializes in dental implants, facial surgery, and
                comprehensive dental treatments. Our team of skilled professionals is committed to ensuring your dental
                health and beautiful smile.
              </p>
              <div className="flex flex-wrap gap-4 mt-6">
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <Stethoscope className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-gray-800 font-medium">Expert Doctors</span>
                </div>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                    <Activity className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-gray-800 font-medium">Modern Equipment</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Our Services</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              We offer a wide range of dental services to meet all your oral health needs, from routine check-ups to
              complex surgical procedures.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Tooth className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Dental Implants</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Permanent replacement for missing teeth that look, feel, and function like natural teeth.
                </CardDescription>
                <Link href="#" className="text-blue-600 hover:text-blue-800 inline-flex items-center mt-4">
                  Learn more <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Scissors className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Facial Surgery</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Specialized surgical procedures to correct facial structure issues and improve appearance.
                </CardDescription>
                <Link href="#" className="text-blue-600 hover:text-blue-800 inline-flex items-center mt-4">
                  Learn more <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Tooth className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Root Canal Treatment</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Treatment to repair and save a badly damaged or infected tooth instead of removing it.
                </CardDescription>
                <Link href="#" className="text-blue-600 hover:text-blue-800 inline-flex items-center mt-4">
                  Learn more <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Tooth className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Cosmetic Dentistry</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Procedures aimed at improving the appearance of your teeth, gums, and smile.
                </CardDescription>
                <Link href="#" className="text-blue-600 hover:text-blue-800 inline-flex items-center mt-4">
                  Learn more <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Tooth className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Teeth Whitening</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Professional teeth whitening treatments to remove stains and discoloration.
                </CardDescription>
                <Link href="#" className="text-blue-600 hover:text-blue-800 inline-flex items-center mt-4">
                  Learn more <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Tooth className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle>Orthodontics</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Treatments to correct misaligned teeth and jaws for better function and appearance.
                </CardDescription>
                <Link href="#" className="text-blue-600 hover:text-blue-800 inline-flex items-center mt-4">
                  Learn more <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Have questions or want to schedule an appointment? Reach out to us using the information below.
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/2">
              <div className="h-80 bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224346.54004238203!2d77.0402082!3d28.5273814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x52c2b7494e204dce!2sNew%20Delhi%2C%20Delhi!5e0!3m2!1sen!2sin!4v1650000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
            <div className="md:w-1/2">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Phone className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-gray-600">+91 8077018989</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Mail className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-gray-600">info@drdubey.com</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Address</p>
                        <p className="text-gray-600">Ground Floor, Apex Acacia Valley, D-3, opp. Hiralal Halwai, Block C, Sector 3, Vaishali, Ghaziabad, Uttar Pradesh 201019</p>
                      </div>
                    </div>
                    <div className="flex items-start">
                      <Clock className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
                      <div>
                        <p className="font-medium">Working Hours</p>
                        <p className="text-gray-600">Monday - Saturday: 9:00 AM - 7:00 PM</p>
                        <p className="text-gray-600">Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
