"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  Home,
  Heart,
  Calendar,
  Download,
  Building2,
  Loader2,
} from "lucide-react";


// Debounce utility
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

const AuthForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
    state: "",
    city: "",
    address: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
    state: "",
    city: "",
    address: "",
  });

  const [stateSuggestions, setStateSuggestions] = useState<string[]>([]);
  const [citySuggestions, setCitySuggestions] = useState<string[]>([]);
  const [showStateDropdown, setShowStateDropdown] = useState(false);
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [activeStateIndex, setActiveStateIndex] = useState(-1);
  const [activeCityIndex, setActiveCityIndex] = useState(-1);
  const [isStateLoading, setIsStateLoading] = useState(false);
  const [isCityLoading, setIsCityLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const stateDropdownRef = useRef<HTMLDivElement>(null);
  const cityDropdownRef = useRef<HTMLDivElement>(null);

  const searchStates = useCallback(async (query: string): Promise<string[]> => {
    if (!query.trim()) {
      return [];
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/states?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch states");
      }
      const data = await response.json();
      return data.map((item: { name: string }) => item.name);
    } catch (error) {
      console.error("Error fetching states:", error);
      return [];
    }
  }, []);

  const searchCities = useCallback(async (query: string): Promise<string[]> => {
    if (!query.trim()) {
      return [];
    }

    try {
      const response = await fetch(
        `http://localhost:5000/api/cities?q=${encodeURIComponent(query)}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch cities");
      }
      const data = await response.json();
      return data.map((item: { name: string }) => item.name);
    } catch (error) {
      console.error("Error fetching cities:", error);
      return [];
    }
  }, []);

  const handleStateInput = useCallback(
    async (value: string) => {
      if (value.trim()) {
        setIsStateLoading(true);
        try {
          const suggestions = await searchStates(value);
          setStateSuggestions(suggestions);
          setShowStateDropdown(suggestions.length > 0);
          setActiveStateIndex(-1);
        } catch (error) {
          console.error("Error searching states:", error);
          setStateSuggestions([]);
          setShowStateDropdown(false);
        } finally {
          setIsStateLoading(false);
        }
      } else {
        setStateSuggestions([]);
        setShowStateDropdown(false);
        setActiveStateIndex(-1);
        setIsStateLoading(false);
      }
    },
    [searchStates]
  );

  const handleCityInput = useCallback(
    async (value: string) => {
      if (value.trim()) {
        setIsCityLoading(true);
        try {
          const suggestions = await searchCities(value);
          setCitySuggestions(suggestions);
          setShowCityDropdown(suggestions.length > 0);
          setActiveCityIndex(-1);
        } catch (error) {
          console.error("Error searching cities:", error);
          setCitySuggestions([]);
          setShowCityDropdown(false);
        } finally {
          setIsCityLoading(false);
        }
      } else {
        setCitySuggestions([]);
        setShowCityDropdown(false);
        setActiveCityIndex(-1);
        setIsCityLoading(false);
      }
    },
    [searchCities]
  );

  // Validation rules
  const validateField = (name: string, value: string) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (!value.trim()) {
          error = "Please enter your full name.";
        } else if (!/^[a-zA-Z\s]+$/.test(value)) {
          error = "Please enter your full name.";
        }
        break;

      case "contact":
        if (!value.trim()) {
          error = "Please enter a valid 10-digit phone number.";
        } else if (!/^\d{10}$/.test(value.replace(/\D/g, ""))) {
          error = "Please enter a valid 10-digit phone number.";
        }
        break;

      case "state":
        if (!value.trim()) {
          error = "Please select your state.";
        }
        break;

      case "city":
        if (!value.trim()) {
          error = "Please select your city.";
        }
        break;

      case "address":
        if (!value.trim()) {
          error = "Please enter your full address.";
        } else if (value.length > 250) {
          error = "Address must be at most 250 characters long.";
        }
        break;

      case "email":
        if (!value.trim()) {
          error = "Please enter a valid email address.";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = "Please enter a valid email address.";
        }
        break;

      case "password":
        if (!value) {
          error =
            "Password must be at least 8 characters long and contain an uppercase letter, number(0-9) and a special character";
        } else if (
          value.length < 8 ||
          !/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(value)
        ) {
          error =
            "Password must be at least 8 characters long and contain an uppercase letter and a number.";
        }
        break;

      case "confirmPassword":
        if (!value) {
          error = "Please confirm your password.";
        } else if (value !== formData.password) {
          error = "Passwords do not match.";
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Real-time validation on change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Update form data
    setFormData({
      ...formData,
      [name]: value,
    });

    // Real-time validation - validate as user types
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // Debounced values for autocomplete
  const debouncedStateValue = useDebounce(formData.state, 300);
  const debouncedCityValue = useDebounce(formData.city, 300);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        stateDropdownRef.current &&
        !stateDropdownRef.current.contains(event.target as Node)
      ) {
        setShowStateDropdown(false);
        setActiveStateIndex(-1);
      }
      if (
        cityDropdownRef.current &&
        !cityDropdownRef.current.contains(event.target as Node)
      ) {
        setShowCityDropdown(false);
        setActiveCityIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Watch form values for autocomplete with debouncing
  useEffect(() => {
    handleStateInput(debouncedStateValue);
  }, [debouncedStateValue, handleStateInput]);

  useEffect(() => {
    handleCityInput(debouncedCityValue);
  }, [debouncedCityValue, handleCityInput]);

  // Auto-dismiss success messages after 5 seconds
  useEffect(() => {
    if (submitMessage?.type === "success") {
      const timer = setTimeout(() => {
        setSubmitMessage(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [submitMessage]);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors = {
      fullName: validateField("fullName", formData.fullName),
      email: validateField("email", formData.email),
      contact: validateField("contact", formData.contact),
      password: validateField("password", formData.password),
      confirmPassword: validateField(
        "confirmPassword",
        formData.confirmPassword
      ),
      state: validateField("state", formData.state),
      city: validateField("city", formData.city),
      address: validateField("address", formData.address),
    };

    setErrors(newErrors);

    // Check if there are any errors
    const hasErrors = Object.values(newErrors).some((error) => error !== "");

    if (!hasErrors) {
      setIsLoading(true);

      try {
        // Create FormData object
        const formDataToSend = new FormData();
        formDataToSend.append("fullname", formData.fullName);
        formDataToSend.append("contact", formData.contact);
        formDataToSend.append("state", formData.state);
        formDataToSend.append("city", formData.city);
        formDataToSend.append("password", formData.password);
        formDataToSend.append("email", formData.email);
        formDataToSend.append("address", formData.address);

        console.log("Sending FormData:"); // Debug log
        for (let [key, value] of formDataToSend.entries()) {
          console.log(key, value);
        }

        const response = await fetch(
          "http://localhost:5000/api/register/user",
          {
            method: "POST",
            body: formDataToSend,
          }
        );

        const data = await response.json();

        if (response.ok) {
          if (data.data?.token) {
            localStorage.setItem("authToken", data.data.token);
            localStorage.setItem("refreshToken", data.data.refreshToken);
            localStorage.setItem("user", JSON.stringify(data.data.user));
          }

          // Success response
          setSubmitMessage({
            type: "success",
            text: "Account created successfully! Welcome to CareSaathi.",
          });

          // Clear form data
          setFormData({
            fullName: "",
            email: "",
            contact: "",
            password: "",
            confirmPassword: "",
            state: "",
            city: "",
            address: "",
          });

          // Redirect to dashboard after successful signup
          setTimeout(() => {
            window.location.href = "/dashboard";
          }, 2000);
        } else if (response.status === 409) {
          setSubmitMessage({
            type: "error",
            text: "User already exists. Please sign in to your account.",
          });
        } else if (response.status === 400) {
          setSubmitMessage({
            type: "error",
            text:
              data.message || "Please fill in all required fields correctly.",
          });
        } else {
          setSubmitMessage({
            type: "error",
            text: data.message || "Registration failed. Please try again.",
          });
        }
      } catch (error) {
        console.error("Registration error:", error);
        setSubmitMessage({
          type: "error",
          text: "Network error occurred. Please check your connection and try again.",
        });
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("Form has validation errors:", newErrors);
      setSubmitMessage({
        type: "error",
        text: "Please fix the errors above and try again.",
      });
    }
  };

  return (
    <div className="h-screen flex bg-white dark:bg-gray-900 overflow-hidden">
      {/* Error/Success Toast at Top */}
      {submitMessage && (
        <div
          className={`fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full mx-4 p-4 rounded-lg shadow-lg border transition-all duration-300 ${
            submitMessage.type === "success"
              ? "bg-green-50 text-green-800 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800"
              : "bg-red-50 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {submitMessage.type === "success" ? (
                <svg
                  className="w-5 h-5 text-green-600 dark:text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5 text-red-600 dark:text-red-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
              <span className="text-sm font-medium">{submitMessage.text}</span>
            </div>
            <button
              onClick={() => setSubmitMessage(null)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              title="Close notification"
              aria-label="Close notification"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Left Side - Poster */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{
            backgroundImage: `url('/webposter1.png')`,
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-red-900/70 to-blue-900/90" />

        {/* Content Overlay - Shifted towards center */}
        <div className="relative z-10 flex flex-col justify-center text-white w-full pl-16 pr-4">
          <div className="max-w-lg space-y-4 text-center">
            {/* Logo/Icon - Smaller and more compact */}
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <Heart className="w-10 h-10 text-white" />
            </div>

            {/* Main Heading */}
            <h1 className="text-3xl font-bold mb-3">
              <span className="block bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                Your Companion
              </span>
              <span className="block bg-gradient-to-r from-red-200 to-white bg-clip-text text-transparent">
                in Care
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg font-semibold text-blue-200 mb-3">
              "Apno ke liye apno jaisa saathi"
            </p>

            {/* Description */}
            <p className="text-base text-white/90 leading-relaxed mb-6">
              Experience India's next-gen healthcare platform with AI-powered
              emergency response, verified home care, and 24/7 emotional
              support.
            </p>

            {/* Feature Highlights */}
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-2">
                <Calendar className="w-4 h-4 text-blue-300" />
                <span className="text-white font-medium text-sm">
                  24/7 Emergency Response
                </span>
              </div>
              <div className="flex items-center justify-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-2">
                <Download className="w-4 h-4 text-red-300" />
                <span className="text-white font-medium text-sm">
                  500+ Partner Hospitals
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center h-screen p-1 xs:p-2 sm:p-4 bg-white dark:bg-gray-900">
        <div className="w-full max-w-lg">
          <Card className="border-0 ring-1 ring-gray-200 dark:ring-gray-600 shadow-md bg-white/98 dark:bg-gray-800/98">
            <CardHeader className="text-center pb-0.5 xs:pb-1 sm:pb-2 px-1.5 xs:px-2 sm:px-6 pt-1.5 xs:pt-2 sm:pt-6">
              <div className="flex justify-between items-center mb-0.5 xs:mb-1 sm:mb-1.5">
                <button
                  onClick={() => (window.location.href = "/")}
                  className="p-0.5 xs:p-1 sm:p-1.5 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors flex items-center space-x-1"
                  title="Go back to home"
                >
                  <svg
                    className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  <span className="text-xs font-medium hidden sm:inline">
                    Back
                  </span>
                </button>
                <div className="mx-auto w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 bg-gradient-to-r from-red-500 to-blue-600 rounded-full flex items-center justify-center lg:hidden">
                  <User className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 text-white" />
                </div>
                <button
                  onClick={toggleDarkMode}
                  className="p-0.5 xs:p-1 sm:p-1.5 rounded-full bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors text-xs sm:text-sm"
                  title="Toggle dark mode"
                >
                  {isDarkMode ? "☀" : "🌙"}
                </button>
              </div>
              <CardTitle className="text-base xs:text-lg sm:text-xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                Create Your Account
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-300 text-xs hidden xs:block">
                Join our healthcare community today
              </CardDescription>
            </CardHeader>

            <CardContent className="px-1.5 xs:px-2 sm:px-3 pb-1.5 xs:pb-2 sm:pb-3">
              <form
                onSubmit={handleSubmit}
                className="space-y-1 xs:space-y-1.5 sm:space-y-2"
              >
                {/* Full Name and Contact Number - Side by side on large screens */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 xs:gap-1.5 sm:gap-2">
                  <div className="space-y-0.5 sm:space-y-1">
                    <Label
                      htmlFor="fullName"
                      className="text-gray-700 dark:text-gray-300 font-medium text-xs"
                    >
                      Full Name
                    </Label>
                    <div className="relative">
                      <User className="absolute left-1.5 sm:left-2 top-1.5 xs:top-2 sm:top-2.5 h-2.5 w-2.5 xs:h-3 xs:w-3 text-gray-400" />
                      <Input
                        id="fullName"
                        name="fullName"
                        type="text"
                        placeholder="Enter your full name"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        className={`pl-5 xs:pl-6 sm:pl-7 h-7 xs:h-8 sm:h-9 text-xs border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                          errors.fullName
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                        required
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-0.5 sm:space-y-1">
                    <Label
                      htmlFor="contact"
                      className="text-gray-700 dark:text-gray-300 font-medium text-xs"
                    >
                      Contact Number
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-1.5 sm:left-2 top-1.5 xs:top-2 sm:top-2.5 h-2.5 w-2.5 xs:h-3 xs:w-3 text-gray-400" />
                      <Input
                        id="contact"
                        name="contact"
                        type="tel"
                        placeholder="Enter your phone number"
                        value={formData.contact}
                        onChange={handleInputChange}
                        className={`pl-5 xs:pl-6 sm:pl-7 h-7 xs:h-8 sm:h-9 text-xs border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                          errors.contact
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                        required
                      />
                    </div>
                    {errors.contact && (
                      <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">
                        {errors.contact}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-0.5 sm:space-y-1 w-4/4">
                  <Label
                    htmlFor="email"
                    className="text-gray-700 dark:text-gray-300 font-medium text-xs"
                  >
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-1.5 sm:left-2 top-1.5 xs:top-2 sm:top-2.5 h-2.5 w-2.5 xs:h-3 xs:w-3 text-gray-400" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`pl-5 xs:pl-6 sm:pl-7 h-7 xs:h-8 sm:h-9 text-xs border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                        errors.email
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Password and Confirm Password - Side by side on large screens */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-1 xs:gap-1.5 sm:gap-2">
                  <div className="space-y-0.5 sm:space-y-1">
                    <Label
                      htmlFor="password"
                      className="text-gray-700 dark:text-gray-300 font-medium text-xs"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-1.5 sm:left-2 top-1.5 xs:top-2 sm:top-2.5 h-2.5 w-2.5 xs:h-3 xs:w-3 text-gray-400" />
                      <Input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`pl-5 xs:pl-6 sm:pl-7 pr-5 xs:pr-6 sm:pr-7 h-7 xs:h-8 sm:h-9 text-xs border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                          errors.password
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-1.5 sm:right-2 top-1.5 xs:top-2 sm:top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showPassword ? (
                          <EyeOff className="h-2.5 w-2.5 xs:h-3 xs:w-3" />
                        ) : (
                          <Eye className="h-2.5 w-2.5 xs:h-3 xs:w-3" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <div className="space-y-0.5 sm:space-y-1">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-gray-700 dark:text-gray-300 font-medium text-xs"
                    >
                      Confirm Password
                    </Label>
                    <div className="relative">
                      <Lock className="absolute left-1.5 sm:left-2 top-1.5 xs:top-2 sm:top-2.5 h-2.5 w-2.5 xs:h-3 xs:w-3 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`pl-5 xs:pl-6 sm:pl-7 pr-5 xs:pr-6 sm:pr-7 h-7 xs:h-8 sm:h-9 text-xs border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                          errors.confirmPassword
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                        required
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-1.5 sm:right-2 top-1.5 xs:top-2 sm:top-2.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-2.5 w-2.5 xs:h-3 xs:w-3" />
                        ) : (
                          <Eye className="h-2.5 w-2.5 xs:h-3 xs:w-3" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                </div>

                {/* State and City - Side by side */}
                <div className="grid grid-cols-2 gap-0.5 xs:gap-1 sm:gap-1.5">
                  <div className="space-y-0.5 sm:space-y-1">
                    <Label
                      htmlFor="state"
                      className="text-gray-700 dark:text-gray-300 font-medium text-xs"
                    >
                      State
                    </Label>
                    <div className="relative" ref={stateDropdownRef}>
                      <MapPin className="absolute left-1.5 sm:left-2 top-1.5 xs:top-2 sm:top-2.5 h-2.5 w-2.5 xs:h-3 xs:w-3 text-gray-400 z-10" />
                      {isStateLoading && (
                        <Loader2 className="absolute right-1.5 sm:right-2 top-1.5 xs:top-2 sm:top-2.5 h-2.5 w-2.5 xs:h-3 xs:w-3 text-gray-400 animate-spin z-10" />
                      )}
                      <Input
                        id="state"
                        name="state"
                        type="text"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleInputChange}
                        className={`pl-5 xs:pl-6 sm:pl-7 ${
                          isStateLoading ? "pr-5 xs:pr-6 sm:pr-7" : ""
                        } h-7 xs:h-8 sm:h-9 text-xs border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                          errors.state
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                        onFocus={() => {
                          if (formData.state.trim()) {
                            setShowStateDropdown(stateSuggestions.length > 0);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Escape") {
                            setShowStateDropdown(false);
                            setActiveStateIndex(-1);
                          } else if (e.key === "ArrowDown") {
                            e.preventDefault();
                            if (showStateDropdown) {
                              setActiveStateIndex((prev) =>
                                prev < stateSuggestions.length - 1
                                  ? prev + 1
                                  : 0
                              );
                            }
                          } else if (e.key === "ArrowUp") {
                            e.preventDefault();
                            if (showStateDropdown) {
                              setActiveStateIndex((prev) =>
                                prev > 0
                                  ? prev - 1
                                  : stateSuggestions.length - 1
                              );
                            }
                          } else if (e.key === "Enter") {
                            e.preventDefault();
                            if (showStateDropdown && activeStateIndex >= 0) {
                              setFormData({
                                ...formData,
                                state: stateSuggestions[activeStateIndex],
                              });
                              setShowStateDropdown(false);
                              setActiveStateIndex(-1);
                            }
                          }
                        }}
                        autoComplete="off"
                        required
                      />
                      {showStateDropdown && stateSuggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-48 overflow-y-auto z-50 mt-1">
                          {stateSuggestions.map((suggestion, index) => (
                            <div
                              key={index}
                              className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
                                index === activeStateIndex
                                  ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
                              }`}
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  state: suggestion,
                                });
                                setShowStateDropdown(false);
                                setActiveStateIndex(-1);
                              }}
                              onMouseEnter={() => setActiveStateIndex(index)}
                            >
                              {suggestion}
                            </div>
                          ))}
                        </div>
                      )}
                      {showStateDropdown &&
                        stateSuggestions.length === 0 &&
                        !isStateLoading &&
                        formData.state.trim() && (
                          <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-50 mt-1">
                            <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                              No results found
                            </div>
                          </div>
                        )}
                    </div>
                    {errors.state && (
                      <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">
                        {errors.state}
                      </p>
                    )}
                  </div>

                  <div className="space-y-0.5 sm:space-y-1">
                    <Label
                      htmlFor="city"
                      className="text-gray-700 dark:text-gray-300 font-medium text-xs"
                    >
                      City
                    </Label>
                    <div className="relative" ref={cityDropdownRef}>
                      <Building2 className="absolute left-1.5 sm:left-2 top-1.5 xs:top-2 sm:top-2.5 h-2.5 w-2.5 xs:h-3 xs:w-3 text-gray-400 z-10" />
                      {isCityLoading && (
                        <Loader2 className="absolute right-1.5 sm:right-2 top-1.5 xs:top-2 sm:top-2.5 h-2.5 w-2.5 xs:h-3 xs:w-3 text-gray-400 animate-spin z-10" />
                      )}
                      <Input
                        id="city"
                        name="city"
                        type="text"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleInputChange}
                        className={`pl-5 xs:pl-6 sm:pl-7 ${
                          isCityLoading ? "pr-5 xs:pr-6 sm:pr-7" : ""
                        } h-7 xs:h-8 sm:h-9 text-xs border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                          errors.city
                            ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                        onFocus={() => {
                          if (formData.city.trim()) {
                            setShowCityDropdown(citySuggestions.length > 0);
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Escape") {
                            setShowCityDropdown(false);
                            setActiveCityIndex(-1);
                          } else if (e.key === "ArrowDown") {
                            e.preventDefault();
                            if (showCityDropdown) {
                              setActiveCityIndex((prev) =>
                                prev < citySuggestions.length - 1 ? prev + 1 : 0
                              );
                            }
                          } else if (e.key === "ArrowUp") {
                            e.preventDefault();
                            if (showCityDropdown) {
                              setActiveCityIndex((prev) =>
                                prev > 0 ? prev - 1 : citySuggestions.length - 1
                              );
                            }
                          } else if (e.key === "Enter") {
                            e.preventDefault();
                            if (showCityDropdown && activeCityIndex >= 0) {
                              setFormData({
                                ...formData,
                                city: citySuggestions[activeCityIndex],
                              });
                              setShowCityDropdown(false);
                              setActiveCityIndex(-1);
                            }
                          }
                        }}
                        autoComplete="off"
                        required
                      />
                      {showCityDropdown && citySuggestions.length > 0 && (
                        <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg max-h-48 overflow-y-auto z-50 mt-1">
                          {citySuggestions.map((suggestion, index) => (
                            <div
                              key={index}
                              className={`px-3 py-2 text-sm cursor-pointer transition-colors ${
                                index === activeCityIndex
                                  ? "bg-blue-100 dark:bg-blue-900 text-blue-900 dark:text-blue-100"
                                  : "hover:bg-gray-100 dark:hover:bg-gray-700"
                              }`}
                              onClick={() => {
                                setFormData({
                                  ...formData,
                                  city: suggestion,
                                });
                                setShowCityDropdown(false);
                                setActiveCityIndex(-1);
                              }}
                              onMouseEnter={() => setActiveCityIndex(index)}
                            >
                              {suggestion}
                            </div>
                          ))}
                        </div>
                      )}
                      {showCityDropdown &&
                        citySuggestions.length === 0 &&
                        !isCityLoading &&
                        formData.city.trim() && (
                          <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-50 mt-1">
                            <div className="px-3 py-2 text-sm text-gray-500 dark:text-gray-400">
                              No results found
                            </div>
                          </div>
                        )}
                    </div>
                    {errors.city && (
                      <p className="text-xs text-red-600 dark:text-red-400 mt-0.5">
                        {errors.city}
                      </p>
                    )}
                  </div>
                </div>

                {/* Address - Full width */}
                <div className="space-y-0.5 sm:space-y-1">
                  <Label
                    htmlFor="address"
                    className="text-gray-700 dark:text-gray-300 font-medium text-xs"
                  >
                    Address
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-1.5 sm:left-2 top-1.5 xs:top-2 sm:top-2.5 h-2.5 w-2.5 xs:h-3 xs:w-3 text-gray-400" />
                    <Input
                      id="address"
                      name="address"
                      type="text"
                      placeholder="Enter your full address"
                      value={formData.address}
                      onChange={handleInputChange}
                      maxLength={250}
                      className={`pl-5 xs:pl-6 sm:pl-7 h-7 xs:h-8 sm:h-9 text-xs border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${
                        errors.address
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : ""
                      }`}
                      required
                    />
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      {errors.address && (
                        <p className="text-xs text-red-600 dark:text-red-400">
                          {errors.address}
                        </p>
                      )}
                    </div>
                    <p
                      className={`text-xs ${
                        formData.address.length > 250
                          ? "text-red-600 dark:text-red-400"
                          : formData.address.length > 200
                          ? "text-yellow-600 dark:text-yellow-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {formData.address.length}/250
                    </p>
                  </div>
                </div>

                {/* Terms and Policy Checkbox */}
                <div className="flex items-start justify-center space-x-1.5 xs:space-x-2 sm:space-x-3 mb-1.5 xs:mb-2 sm:mb-4 px-0.5 xs:px-1 sm:px-2">
                  <div className="relative flex items-center">
                    <input
                      type="checkbox"
                      id="acceptTerms"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="sr-only peer"
                    />
                    <label
                      htmlFor="acceptTerms"
                      className="relative flex items-center justify-center w-5 h-5 xs:w-6 xs:h-6 sm:w-7 sm:h-7 bg-transparent border-2 border-gray-300 dark:border-gray-500 rounded-md cursor-pointer transition-all duration-200 hover:border-blue-500 dark:hover:border-blue-400 peer-checked:border-blue-500 dark:peer-checked:border-blue-400 peer-focus:ring-2 peer-focus:ring-blue-500/20 dark:peer-focus:ring-blue-400/20"
                    >
                      <svg
                        className={`w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-blue-500 dark:text-white transition-opacity duration-200 ${
                          acceptTerms ? "opacity-100" : "opacity-0"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </label>
                  </div>
                  <label
                    htmlFor="acceptTerms"
                    className="text-xs font-medium text-gray-700 dark:text-gray-300 leading-relaxed cursor-pointer flex-1"
                  >
                    I agree to{" "}
                    <a
                      href="/terms"
                      target="_blank"
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline decoration-1 underline-offset-2 hover:decoration-2 transition-all duration-200"
                    >
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a
                      href="/privacy"
                      target="_blank"
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline decoration-1 underline-offset-2 hover:decoration-2 transition-all duration-200"
                    >
                      Privacy Policy
                    </a>{" "}
                    of CareSaathi
                  </label>
                </div>

                <div className="flex justify-center w-full">
                  <Button
                    type="submit"
                    disabled={isLoading || !acceptTerms}
                    className="w-1/2 bg-gradient-to-r from-red-500 to-blue-600 hover:from-red-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white py-1 sm:py-1.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg text-xs h-7 sm:h-8"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                        Creating Account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </Button>
                </div>

                {/* Sign In Link */}
                <div className="text-center mt-1 sm:mt-2">
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Already have an account?{" "}
                    <a
                      href="/auth"
                      className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-medium underline decoration-1 underline-offset-2 hover:decoration-2 transition-all duration-200"
                    >
                      Sign In
                    </a>
                  </p>
                </div>
              </form>

              <div className="mt-2 sm:mt-3">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                  </div>
                  <div className="relative flex justify-center text-xs">
                    <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-1.5 sm:mt-2 flex justify-center">
                  <div className="grid grid-cols-2 gap-1 sm:gap-1.5 w-3/4">
                    <Button
                      variant="outline"
                      className="border-gray-300 dark:border-gray-600 hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors dark:bg-gray-700 dark:text-white text-xs py-0.5 sm:py-1 h-7 sm:h-9"
                    >
                      <svg className="w-3 h-3 mr-1" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                        />
                      </svg>
                      Google
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gray-300 dark:border-gray-600 hover:border-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors dark:bg-gray-700 dark:text-white text-xs py-0.5 sm:py-1 h-7 sm:h-9"
                    >
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="#1877F2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                      Facebook
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
