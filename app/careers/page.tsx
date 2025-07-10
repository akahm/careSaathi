"use client";

import { useState, FormEvent, ComponentType } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  Users,
  Heart,
  ArrowRight,
  Briefcase,
  GraduationCap,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/ui/navbar";

// Define interfaces for props and data structures
interface Job {
  id: string;
  title: string;
  department: string;
  location:string;
  type: string;
  experience: string;
  description: string;
  requirements: string[];
  featured: boolean;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
  jobTitle: string;
  darkMode: boolean;
}

interface Benefit {
  icon: ComponentType<any>;
  title: string;
  description: string;
}

function Modal({ isOpen, onClose, onSubmit, jobTitle, darkMode }: ModalProps) {
  if (!isOpen) return null;

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSubmit(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className={`p-8 rounded-lg shadow-lg w-full max-w-md ${darkMode ? 'bg-slate-800 text-white' : 'bg-white text-black'}`}>
        <h2 className="text-2xl font-bold mb-4">Apply for {jobTitle}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 font-medium">Full Name</label>
            <input type="text" id="name" name="name" className={`w-full p-2 border rounded ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-gray-300'}`} required />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-medium">Email</label>
            <input type="email" id="email" name="email" className={`w-full p-2 border rounded ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-gray-300'}`} required />
          </div>
          <div className="mb-4">
            <label htmlFor="resume" className="block mb-2 font-medium">Resume (URL)</label>
            <input type="url" id="resume" name="resume" className={`w-full p-2 border rounded ${darkMode ? 'bg-slate-700 border-slate-600' : 'bg-white border-gray-300'}`} placeholder="https://linkedin.com/in/yourprofile" required />
          </div>
          <div className="flex justify-end space-x-4 mt-6">
            <Button type="button" onClick={onClose} variant="ghost">Cancel</Button>
            <Button type="submit">Submit Application</Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function CareersPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [darkMode, setDarkMode] = useState(false); // Kept for modal styling consistency

  const jobOpenings: Job[] = [
    {
      id: "1",
      title: "Senior Nurse - Home Care",
      department: "Healthcare",
      location: "Mumbai, Delhi, Bangalore",
      type: "Full-time",
      experience: "3-5 years",
      description: "Provide compassionate home nursing care for elderly patients with chronic conditions.",
      requirements: [
        "BSc Nursing degree",
        "Valid nursing license",
        "3+ years experience",
        "Excellent communication skills",
      ],
      featured: true,
    },
  ];

  const benefits: Benefit[] = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health insurance for you and your family, mental health support, and wellness programs.",
    },
  ];

  const handleApplyClick = (job: Job) => {
    setSelectedJob(job);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedJob(null);
  };

  const handleFormSubmit = (formData: FormData) => {
    const data = Object.fromEntries(formData.entries());
    console.log("Form submitted:", data);
    if (selectedJob) {
        alert(`Application for ${selectedJob.title} submitted successfully!`);
    }
    handleModalClose();
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<{ [key: string]: string }>({
    department: "All",
    location: "All",
    type: "All",
  });

  const handleFilterChange = (value: string, key: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filteredJobs = jobOpenings
    .filter(job =>
      (filters.department === 'All' || job.department === filters.department) &&
      (filters.location === 'All' || job.location.includes(filters.location)) &&
      (filters.type === 'All' || job.type === filters.type)
    )
    .filter(job =>
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-50 text-black'}`}>
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <section className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500">
              Find Your Calling with CareSaathi
            </h1>
            <p className="text-lg max-w-3xl mx-auto text-slate-600 dark:text-slate-300">
              Join our mission to provide compassionate and professional home healthcare. We're looking for talented individuals who are passionate about making a difference.
            </p>
        </section>

        <section className="mb-12 p-6 bg-white dark:bg-slate-800 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <input
                    type="text"
                    placeholder="Search by keyword..."
                    className="md:col-span-2 p-3 border rounded-md dark:bg-slate-700 dark:border-slate-600"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
        </section>

        <section>
            <h2 className="text-3xl font-bold mb-8 text-center">Current Openings</h2>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job) => (
                <Card key={job.id} className={`flex flex-col ${darkMode ? 'bg-slate-800' : 'bg-white'} shadow-lg hover:shadow-xl transition-shadow duration-300`}>
                  <CardHeader>
                    <CardTitle className="text-blue-600 dark:text-blue-400">{job.title}</CardTitle>
                    <div className="flex flex-wrap gap-2 text-sm mt-2">
                        <Badge variant={job.featured ? "default" : "secondary"}>{job.type}</Badge>
                        <Badge variant="outline">{job.department}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-4">
                        <MapPin className="w-4 h-4 mr-2" /> {job.location}
                    </div>
                    <p className="mb-4">{job.description}</p>
                    <h4 className="font-semibold mb-2">Requirements:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1">
                        {job.requirements.map((req, i) => <li key={i}>{req}</li>)}
                    </ul>
                  </CardContent>
                  <div className="p-6 pt-0">
                    <Button onClick={() => handleApplyClick(job)} className="w-full">
                        Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
            {filteredJobs.length === 0 && (
                <p className="text-center text-slate-500 dark:text-slate-400 mt-8">No matching job openings found. Please try different filters.</p>
            )}
        </section>
      </main>
      {selectedJob && (
        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          onSubmit={handleFormSubmit}
          jobTitle={selectedJob.title}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}