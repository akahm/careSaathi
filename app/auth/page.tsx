"use client";

import React, { useState, useEffect, use } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, User, Phone, MapPin, Home, Heart, Calendar, Download } from 'lucide-react';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';
import {Sun,Moon} from "lucide-react"

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    
    password: '',
   
  });
  const router = useRouter();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
   const { email, password } = formData;

    
     if (!email || !password) {
          Swal.fire("Missing Info", "Please fill in both fields", "warning");
          return;
        }

    console.log("Submitting login:", formData);

    Swal.fire({
      title: "Logging in...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok && data.token) {
        localStorage.setItem("token", data.token);
        Swal.fire({
          icon: "success",
          title: "Login successful",
          text: "Welcome back!",
        });
        router.push("/Admin/dashboard");
      } else {
        Swal.fire({
          icon: "warning",
          title: "Login failed",
          text: data.message || "Invalid credentials",
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong. Try again later.",
      });
    }
  };





  return (
    <div className="min-h-screen flex  justify-center bg-white dark:bg-gray-900 overflow-hidden">

      {/* Left Side - Poster */}
      <div className="hidden lg:flex w-1/2 relative   ">
     
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        // style={{
        //   backgroundImage: url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=1920&q=80')
        // }}
        />
           
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-red-900/70 to-blue-900/90 " />
        
       <div className='flex justify-center content-center'>
        {/* Content Overlay */}
        <div className="relative z-10  flex  justify-center items-center text-white p-7 text-center">
          <div className=" space-y-6">
            {/* Logo/Icon */}
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart className="w-10 h-10 text-white" />
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl font-bold mb-4">
              <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Your Companion
              </span>
              <span className="block bg-gradient-to-r from-red-200 to-white bg-clip-text text-transparent">
                in Care
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl font-semibold text-blue-200 mb-4">
              "Apno ke liye apno jaisa saathi"
            </p>

            {/* Description */}
            <p className="text-lg text-white/90 leading-relaxed mb-8">
              Experience India's next-gen healthcare platform with AI-powered emergency response, verified home care, and 24/7 emotional support.
            </p>

            {/* Feature Highlights */}
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <Calendar className="w-5 h-5 text-blue-300" />
                <span className="text-white font-medium">24/7 Emergency Response</span>
              </div>
              <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-3">
                <Download className="w-5 h-5 text-red-300" />
                <span className="text-white font-medium">500+ Partner Hospitals</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
      


      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center ">
        <div className="w-full ">
           <div className='flex justify-center content-center'>
          <Card className=" w-full sm:w-4/5 md:w-2/3 lg:w-2/3 xl:w-2/3 rounded-none border-blue-100 dark:border-gray-700 shadow-2xl bg-white/95 dark:bg-gray-800/95">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-between items-center mb-4">
                <div className="mx-auto w-12 h-12 bg-gradient-to-r from-red-500 to-blue-600 rounded-full flex items-center justify-center lg:hidden">
                  <User className="w-6 h-6 text-white" />
                </div>
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors ml-auto"
                >
                  {isDarkMode ? ( <Sun className="w-4 h-4" /> ) : ( <Moon className="w-4 h-4"/> )}
                </button>
              </div>
              <CardTitle className="text-2xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                {isLogin ? 'Welcome Back' : 'Create Your Account'}
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300">
                {isLogin ? 'Sign in to your account' : 'Join our healthcare community today'}
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleLogin} className="space-y-4">


                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
                      className="pl-10 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    />

                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-700 dark:text-gray-300 font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={formData.password}
                  onChange={(e) =>
            setFormData((prev) => ({ ...prev, password: e.target.value }))
          }
                      className="pl-10 pr-10 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                      required
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>



                {isLogin && (
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
                      <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span>Remember me</span>
                    </label>
                    <a href="#" className="text-blue-600 hover:text-blue-800 hover:underline">
                      Forgot password?
                    </a>
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Login
                </Button>
              </form>

              {/* <div className="mt-6 text-center">
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
                  <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-600 hover:text-blue-800 font-semibold hover:underline"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </button>
                </p>
              </div> */}

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    className="border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors dark:bg-gray-700 dark:text-white"
                  >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    className="border-gray-300 dark:border-gray-600 hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors dark:bg-gray-700 dark:text-white"
                  >
                    <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
          </div>
        </div>
      </div>
    </div>



  );
};

export default AuthForm;