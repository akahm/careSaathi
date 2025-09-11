"use client";

import React from "react";

const teamMembers = [
  {
    name: "Anil Kumar",
    role: "Chief Executive Officer (CEO)",
    bio: "Visionary leader driving CareSaathi’s mission for accessible elderly care.",
    image: "/images/team/anil.jpg",
    linkedin: "https://linkedin.com/in/anilkumar"
  },
  {
    name: "Akash Verma",
    role: "Chief Technology Officer (CTO)",
    bio: "Leads the technology team, building secure and scalable solutions.",
    image: "/images/team/akash.jpg",
    linkedin: "https://linkedin.com/in/akashverma"
  },
  {
    name: "Dr. Neha Sharma",
    role: "Chief Medical Officer (CMO)",
    bio: "Experienced doctor ensuring quality medical partnerships and services.",
    image: "/images/team/neha.jpg",
    linkedin: "https://linkedin.com/in/nehasharma"
  },
  {
    name: "Priya Singh",
    role: "Chief Operating Officer (COO)",
    bio: "Manages daily operations and smooth service delivery for families.",
    image: "/images/team/priya.jpg",
    linkedin: "https://linkedin.com/in/priyasingh"
  },
  {
    name: "Ravi Mehra",
    role: "Chief Design Officer (CDO)",
    bio: "Designs user-friendly interfaces for patients, families, and caregivers.",
    image: "/images/team/ravi.jpg",
    linkedin: "https://linkedin.com/in/ravimehra"
  },
  {
    name: "Saurabh Yadav",
    role: "Tech Lead",
    bio: "Full-stack specialist working on CareSaathi’s web platform.",
    image: "/images/team/saurabh.jpg",
    linkedin: "https://linkedin.com/in/saurabhyadav"
  },
  {
    name: "Meena Roy",
    role: "Tech Lead",
    bio: "Leads mobile app development for seamless caregiver booking.",
    image: "/images/team/meena.jpg",
    linkedin: "https://linkedin.com/in/meenaroy"
  },
];

export default function TeamPage() {
  return (
    <div className="container mx-auto px-5 py-10">
      <h1 className="text-4xl font-bold mb-2 text-center">Meet Our Team</h1>
      <p className="text-center mb-10 text-gray-600">
        The leaders and innovators behind CareSaathi.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg p-6 text-center"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 mx-auto rounded-full object-cover mb-4"
            />
            <h2 className="text-xl font-semibold">{member.name}</h2>
            <p className="text-indigo-600">{member.role}</p>
            <p className="text-gray-600 mt-2">{member.bio}</p>
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-blue-600 underline"
              >
                LinkedIn
              </a>
            )}
          </div>
        ))}
      </div>
      <p className="text-center mt-12 text-gray-700">
        Want to join our mission? Write to us at{" "}
        <a href="mailto:careers@caresaathi.com" className="underline text-blue-600">
          careers@caresaathi.com
        </a>
      </p>
    </div>
  );
}
