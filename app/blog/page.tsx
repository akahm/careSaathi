"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Calendar, User, ArrowRight, Search, Tag, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import Navbar from "@/components/ui/navbar"

export default function BlogPage() {
  const [darkMode, setDarkMode] = useState(false)

  const blogPosts = [
    {
      id: 1,
      title: "10 Essential Health Tips for Elderly Care at Home",
      excerpt:
        "Learn the most important practices for maintaining health and safety when caring for elderly family members at home.",
      author: "Dr. Priya Sharma",
      date: "December 15, 2024",
      readTime: "5 min read",
      category: "Elderly Care",
      image: "/placeholder.svg?height=200&width=400",
      featured: true,
    },
    {
      id: 2,
      title: "Understanding Emergency Response: What to Do in Medical Crises",
      excerpt: "A comprehensive guide to handling medical emergencies and when to seek immediate professional help.",
      author: "Dr. Rajesh Kumar",
      date: "December 12, 2024",
      readTime: "7 min read",
      category: "Emergency Care",
      image: "/placeholder.svg?height=200&width=400",
      featured: false,
    },
    {
      id: 3,
      title: "Mental Health Support for Caregivers: Preventing Burnout",
      excerpt:
        "Caring for others can be emotionally demanding. Here's how to maintain your mental health while providing care.",
      author: "Dr. Anita Verma",
      date: "December 10, 2024",
      readTime: "6 min read",
      category: "Mental Health",
      image: "/placeholder.svg?height=200&width=400",
      featured: false,
    },
    {
      id: 4,
      title: "Technology in Healthcare: How AI is Transforming Patient Care",
      excerpt:
        "Explore how artificial intelligence and technology are revolutionizing healthcare delivery and patient outcomes.",
      author: "Tech Team",
      date: "December 8, 2024",
      readTime: "8 min read",
      category: "Technology",
      image: "/placeholder.svg?height=200&width=400",
      featured: false,
    },
    {
      id: 5,
      title: "Nutrition Guidelines for Post-Surgery Recovery",
      excerpt:
        "Proper nutrition plays a crucial role in recovery. Learn what foods promote healing and which to avoid.",
      author: "Dr. Meera Patel",
      date: "December 5, 2024",
      readTime: "4 min read",
      category: "Recovery",
      image: "/placeholder.svg?height=200&width=400",
      featured: false,
    },
    {
      id: 6,
      title: "Building a Support Network for Chronic Illness Management",
      excerpt: "Managing chronic conditions requires a strong support system. Here's how to build and maintain one.",
      author: "Dr. Suresh Gupta",
      date: "December 3, 2024",
      readTime: "6 min read",
      category: "Chronic Care",
      image: "/placeholder.svg?height=200&width=400",
      featured: false,
    },
  ]

  const categories = [
    "All",
    "Elderly Care",
    "Emergency Care",
    "Mental Health",
    "Technology",
    "Recovery",
    "Chronic Care",
  ]

  return (
    <>
    <Navbar/>
    <div
      className={` pt-[72px] min-h-screen transition-colors duration-300 ${darkMode ? "dark bg-slate-900" : "bg-gradient-to-br  bg-white/95 dark:bg-slate-900/95"}`}
    >
      {/* Header */}
      

      {/* Hero Section */}
      <section className="py-12 sm:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-red-600/5"></div>
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-4xl mx-auto space-y-6 sm:space-y-8"
          >
            <Badge className="bg-gradient-to-r from-blue-100 to-red-100 text-blue-800 border-0 px-4 py-2 text-sm">
              📚 Health & Care Blog
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold bg-gradient-to-r from-blue-800 to-red-600 bg-clip-text text-transparent">
              Health Insights & Care Tips
            </h1>
            <p className="text-sm sm:text-lg lg:text-xl text-slate-600 dark:text-slate-300 leading-relaxed">
              Expert advice, health tips, and insights from our medical professionals to help you provide the best care
              for your loved ones.
            </p>
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  placeholder="Search articles..."
                  className="pl-12 py-3 text-sm sm:text-base border-2 border-slate-200 dark:border-slate-600 focus:border-blue-500"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 sm:gap-4 justify-center">
            {categories.map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Button
                  variant={category === "All" ? "default" : "outline"}
                  size="sm"
                  className={`text-xs sm:text-sm ${
                    category === "All"
                      ? "bg-gradient-to-r from-blue-500 to-red-500 text-white"
                      : "border-slate-300 dark:border-slate-600"
                  }`}
                >
                  <Tag className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                  {category}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8 sm:mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6 sm:mb-8">
              Featured Article
            </h2>
            <Card className="overflow-hidden shadow-2xl border-0 bg-white dark:bg-slate-800">
              <div className="grid lg:grid-cols-2 gap-0">
                <div className="relative h-64 sm:h-80 lg:h-full">
                  <img
                    src={blogPosts[0].image || "/placeholder.svg"}
                    alt={blogPosts[0].title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-red-500 text-white text-xs">Featured</Badge>
                </div>
                <div className="p-6 sm:p-8 flex flex-col justify-center">
                  <Badge variant="outline" className="w-fit mb-4 text-xs">
                    {blogPosts[0].category}
                  </Badge>
                  <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-4">
                    {blogPosts[0].title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-6 leading-relaxed">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-slate-500" />
                        <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                          {blogPosts[0].author}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                          {blogPosts[0].date}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4 text-slate-500" />
                      <span className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
                        {blogPosts[0].readTime}
                      </span>
                    </div>
                  </div>
                  <Button className="bg-gradient-to-r from-blue-500 to-red-500 text-white w-fit text-sm">
                    Read Full Article
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200 mb-6 sm:mb-8">
              Latest Articles
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {blogPosts.slice(1).map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 bg-white dark:bg-slate-800 overflow-hidden">
                  <div className="relative h-48 sm:h-56">
                    <img
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                    <Badge className="absolute top-3 left-3 bg-white/90 text-slate-700 text-xs">{post.category}</Badge>
                  </div>
                  <CardContent className="p-4 sm:p-6">
                    <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-200 mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <User className="w-3 h-3 sm:w-4 sm:h-4 text-slate-500" />
                        <span className="text-xs text-slate-600 dark:text-slate-400">{post.author}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-slate-500" />
                        <span className="text-xs text-slate-600 dark:text-slate-400">{post.readTime}</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-slate-500">{post.date}</span>
                      <Button variant="link" className="p-0 text-blue-600 hover:text-blue-700 text-xs sm:text-sm">
                        Read More <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-12 sm:py-20 bg-gradient-to-r from-blue-500 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto space-y-6 sm:space-y-8"
          >
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Stay Updated with Health Tips</h2>
            <p className="text-sm sm:text-lg lg:text-xl text-blue-100">
              Subscribe to our newsletter for the latest health insights, care tips, and medical updates delivered to
              your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Input
                placeholder="Enter your email"
                className="bg-white/10 border-white/20 text-white placeholder-white/70 text-sm sm:text-base"
              />
              <Button className="bg-white text-blue-600 hover:bg-blue-50 px-6 py-2 text-sm sm:text-base">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
    </>
  )
}
