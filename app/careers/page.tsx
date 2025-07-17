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
  Search,
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
  // This prop is still needed for the modal as it's a portal.
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
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 backdrop-blur-sm">
      <div className={`p-8 rounded-lg shadow-2xl w-full max-w-md border ${darkMode ? 'bg-slate-900 border-slate-700' : 'bg-white border-slate-200'}`}>
        <h2 className="text-2xl font-bold mb-4">Apply for {jobTitle}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block mb-2 font-medium text-slate-700 dark:text-slate-300">Full Name</label>
            <input type="text" id="name" name="name" className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600" required />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-medium text-slate-700 dark:text-slate-300">Email</label>
            <input type="email" id="email" name="email" className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600" required />
          </div>
          <div className="mb-4">
            <label htmlFor="resume" className="block mb-2 font-medium text-slate-700 dark:text-slate-300">Resume (URL)</label>
            <input type="url" id="resume" name="resume" className="w-full p-2 border rounded bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-600" placeholder="https://linkedin.com/in/yourprofile" required />
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
  // This state is only to correctly theme the Modal, which is a portal.
  const [isDarkModeForModal, setIsDarkModeForModal] = useState(false);

  const jobOpenings: Job[] = [
    { id: "1", title: "Senior Nurse - Home Care", department: "Healthcare", location: "Mumbai, Delhi, Bangalore", type: "Full-time", experience: "3-5 years", description: "Provide compassionate home nursing care for elderly patients with chronic conditions.", requirements: ["BSc Nursing degree", "Valid nursing license", "3+ years experience", "Excellent communication skills"], featured: true, },
    { id: "2", title: "Physiotherapist - Rehabilitation", department: "Therapy", location: "Pune", type: "Part-time", experience: "2+ years", description: "Develop and implement physiotherapy programs for post-operative patients at home.", requirements: ["Bachelor's in Physiotherapy (BPT)", "Strong clinical assessment skills", "Experience in neuro-rehabilitation"], featured: false, },
  ];

  const benefits: Benefit[] = [
    { icon: Heart, title: "Health & Wellness", description: "Comprehensive health insurance for you and your family, mental health support, and wellness programs.", },
  ];

  const handleApplyClick = (job: Job) => {
    // Check the global theme when the modal is opened
    setIsDarkModeForModal(document.documentElement.classList.contains('dark'));
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
    // This div correctly uses the global theme. No local state needed.
    <div className="bg-slate-50 dark:bg-slate-950">
      <Navbar />
      <main className="container mx-auto px-4 pt-32 pb-24">
        <section className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500 pb-2">
              Find Your Calling with CareSaathi
            </h1>
            <p className="text-lg max-w-3xl mx-auto text-slate-600 dark:text-slate-400">
              Join our mission to provide compassionate and professional home healthcare. We're looking for talented individuals who are passionate about making a difference.
            </p>
        </section>

        <section className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-6">
            <h2 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500 pb-2">
              Current Openings
            </h2>
            <div className="relative w-full md:w-auto md:min-w-[300px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input type="text" placeholder="Search by keyword..." className="w-full p-3 pl-11 border rounded-lg bg-slate-50 dark:bg-slate-800 border-slate-300 dark:border-slate-700 text-black dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500 outline-none transition" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
          </div>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="flex flex-col bg-slate-50 dark:bg-slate-800 shadow-md hover:shadow-xl dark:hover:bg-slate-700/50 border border-slate-200 dark:border-slate-700 rounded-xl transition-all duration-300 group">
                  <CardHeader>
                    <CardTitle className="text-blue-600 dark:text-white">{job.title}</CardTitle>
                    <div className="flex flex-wrap gap-2 text-sm mt-2">
                        <Badge variant={job.featured ? "default" : "secondary"}>{job.type}</Badge>
                        <Badge variant="outline" className="dark:border-slate-600 dark:text-slate-400">{job.department}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex items-center text-sm text-slate-500 dark:text-slate-400 mb-4">
                        <MapPin className="w-4 h-4 mr-2" /> {job.location}
                    </div>
                    <p className="mb-4 text-slate-600 dark:text-slate-300">{job.description}</p>
                    <h4 className="font-semibold mb-2 text-slate-800 dark:text-slate-200">Requirements:</h4>
                    <ul className="list-disc list-inside text-sm space-y-1 text-slate-500 dark:text-slate-400">
                        {job.requirements.map((req, i) => <li key={i}>{req}</li>)}
                    </ul>
                  </CardContent>
                  <div className="p-6 pt-0 mt-4">
                    <Button onClick={() => handleApplyClick(job)} className="w-full font-bold text-white bg-gradient-to-r from-blue-600 to-red-600 hover:opacity-90 transition-opacity duration-300 shadow-lg hover:shadow-xl">
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
          darkMode={isDarkModeForModal}
        />
      )}
    </div>
  );
}