"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, Clock, Heart, Send, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import Navbar from "@/components/ui/navbar"
import Swal from "sweetalert2"
export default function ContactPage() {
  const contactMethods = [
    {
      icon: Phone,
      title: "Emergency Hotline",
      description: "24/7 emergency support",
      contact: "1800-CARE-911",
      color: "red",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Support",
      description: "Quick responses via WhatsApp",
      contact: "+91 70849 10836",
      color: "green",
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "General inquiries and support",
      contact: "hello@caresaathi.com",
      color: "blue",
    },
    {
      icon: MapPin,
      title: "Head Office",
      description: "Visit our main office",
      contact: "Chinhat, Faizabad road Lucknow Uttar Pradesh Pincode 226028",
      color: "purple",
    },
  ]

  interface ContactFormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    service: string;
    message: string;
  }

  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    Swal.fire({
      title: "Sending...",
      text: "Please wait while we submit your message.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Message Sent",
          text: data.message || "Thank you for contacting us. We will get back to you soon!",
        });

        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          service: "",
          message: "",
        });

      } else if (res.status === 409) {
        Swal.fire({
          icon: "warning",
          title: "Already Registered",
          text: data.message || "This email is already registered with us.",
        });

      } else {
        throw new Error(data.error || "Something went wrong");
      }

    } catch (err: any) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.message || "Something went wrong. Please try again later.",
      });
    }
  };



  return (
    <>
      <Navbar />
      <div className="pt-[0px] min-h-screen transition-colors duration-300 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200/50 dark:border-slate-700/50">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-red-600/5"></div>
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center max-w-4xl mx-auto space-y-8"
            >
              <Badge className="bg-gradient-to-r from-blue-900 to-red-900 text-white border-0 px-4 py-2">
                📞 Get in Touch
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-800 to-red-600 bg-clip-text text-transparent">
                Contact CareSaathi
              </h1>
              <p className="text-sm sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                We're here to help 24/7. Whether it's an emergency or a simple
                question, our care team is always ready to assist you and your
                family.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Emergency Banner */}
        <section className="py-5 bg-gradient-to-r from-red-500 to-red-600 text-white">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Medical Emergency?</h3>
                  <p className="text-red-100">
                    Call our emergency hotline immediately
                  </p>
                </div>
              </div>
              <Button size="lg" className="bg-white text-red-600 hover:bg-red-50">
                <Phone className="w-5 h-5 mr-2" />
                Launching Soon
              </Button>
            </div>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-800 to-red-600 bg-clip-text text-transparent mb-4 sm:mb-6">
                How to Reach Us
              </h2>
              <p className="text-sm sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                Multiple ways to connect with our care team. Choose what works
                best for you.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactMethods.map((method, index) => (
                <motion.div
                  key={method.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="text-center h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white dark:bg-slate-800/50 group cursor-pointer">
                    <CardHeader className="space-y-4">
                      <div
                        className={`w-16 h-16 bg-gradient-to-br ${method.color === "red"
                            ? "from-red-500 to-red-600"
                            : method.color === "green"
                              ? "from-green-500 to-green-600"
                              : method.color === "blue"
                                ? "from-blue-500 to-blue-600"
                                : "from-purple-500 to-purple-600"
                          } rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform`}
                      >
                        <method.icon className="w-8 h-8 text-white" />
                      </div>
                      <CardTitle className="text-xl font-bold text-slate-800 dark:text-slate-200">
                        {method.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-slate-600 dark:text-slate-400">
                        {method.description}
                      </p>
                      <p className="font-semibold text-slate-800 dark:text-slate-200">
                        {method.contact}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>


          </div>
        </section>

        {/* Contact Form */}
        <section id="contact-form" className="py-5 bg-gradient-to-br">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-start">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div>
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-800 to-red-600 bg-clip-text text-transparent mb-6">
                    Send us a Message
                  </h2>
                  <p className="text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
                    Have a question about our services? Want to schedule a
                    consultation? Fill out the form and we'll get back to you
                    within 24 hours.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <Clock className="w-6 h-6 text-blue-500" />
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                        Response Time
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400">
                        Within 24 hours for general inquiries
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Heart className="w-6 h-6 text-red-500" />
                    <div>
                      <h4 className="font-semibold text-slate-800 dark:text-slate-200">
                        Care Team
                      </h4>
                      <p className="text-slate-600 dark:text-slate-400">
                        Dedicated support specialists
                      </p>
                    </div>
                  </div>
                </div>

                <div className="container mx-auto px-4">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center max-w-3xl mx-auto"
                  >
                    <h5 className="text-xl font-bold bg-gradient-to-r from-blue-800 to-red-600 bg-clip-text text-transparent mb-8">
                      Office Hours
                    </h5>
                    <div className="grid md:grid-cols-2 gap-8">
                      <Card className="bg-white dark:bg-slate-800/50 shadow-lg border-0">
                        <CardContent className="p-6 text-center">
                          <Clock className="w-12 h-12 text-blue-500 mx-auto mb-1" />
                          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">
                            General Support
                          </h3>
                          <p className="text-slate-600 dark:text-slate-400">
                            Mon-Fri: 9:00 AM - 6:00 PM
                          </p>
                          <p className="text-slate-600 dark:text-slate-400">
                            Sat: 10:00 AM - 4:00 PM
                          </p>
                        </CardContent>
                      </Card>
                      <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg border-0">
                        <CardContent className="p-6 text-center">
                          <Phone className="w-12 h-12 text-white mx-auto mb-2" />
                          <h3 className="text-lg font-bold mb-2">
                            Emergency Support
                          </h3>
                          <p>24/7 Available</p>
                          <p>365 Days a Year</p>
                        </CardContent>
                      </Card>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="dark:bg-slate-800/50 shadow-2xl border-0">
                  <CardContent className="p-8">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            First Name
                          </label>
                          <Input
                            placeholder="Enter your first name"
                            value={formData.firstName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                firstName: e.target.value,
                              })
                            }
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">
                            Last Name
                          </label>
                          <Input
                            placeholder="Enter your last name"
                            value={formData.lastName}
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                lastName: e.target.value,
                              })
                            }
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Email
                        </label>
                        <Input
                          type="email"
                          placeholder="Enter your email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              email: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Mobile No.
                        </label>
                        <Input
                          type="tel"
                          placeholder="Enter your Mobile number"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              phone: e.target.value,
                            })
                          }
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Service Interest
                        </label>
                        <select
                          value={formData.service}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              service: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">Select a service</option>
                          <option>Emergency Response</option>
                          <option>Home Care</option>
                          <option>Doctor Consultation</option>
                          <option>Post-Surgery Care</option>
                          <option>Emotional Support</option>
                          <option>Hospital Bed Booking</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Message
                        </label>
                        <Textarea
                          placeholder="Tell us how we can help you..."
                          rows={4}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              message: e.target.value,
                            })
                          }
                        />
                      </div>
                      <Button className="w-full bg-gradient-to-r from-blue-500 to-red-500 text-white hover:from-blue-600 hover:to-red-600 py-3">
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

      </div>
    </>
  )
}
