"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import MentorStats from "@/components/dashboard/mentor/MentorStats";
import MenteeList from "@/components/dashboard/mentor/MenteeList";
import SessionCalendar from "@/components/dashboard/mentor/SessionCalendar";
import ResourceCenter from "@/components/dashboard/mentor/ResourceCenter";
import PerformanceMetrics from "@/components/dashboard/mentor/PerformanceMetrics";
import { useSession } from "next-auth/react";

export default function MentorDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { data: session } = useSession();
  const mentorName = session?.user?.name || "Mentor";

  const tabs = [  
    { id: "overview", label: "Overview" },
    { id: "mentees", label: "Mentees" },
    { id: "sessions", label: "Sessions" },
    { id: "resources", label: "Resources" },
    { id: "performance", label: "Performance" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "overview":
        return <MentorStats />;
      case "mentees":
        return <MenteeList />;
      case "sessions":
        return <SessionCalendar />;
      case "resources":
        return <ResourceCenter />;
      case "performance":
        return <PerformanceMetrics />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black p-6 mt-20">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-neutral-glass border border-glass-border p-6 rounded-2xl backdrop-blur-md">
          <h1 className="text-3xl font-bold text-neutral-text">Mentor Dashboard</h1>
          <p className="text-neutral-accent mt-2">Welcome back, {mentorName}</p>
        </div>

        {/* Navigation */}
        <div className="bg-neutral-glass border border-glass-border p-4 rounded-2xl backdrop-blur-md">
          <nav className="flex flex-wrap gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? "bg-white/10 text-white"
                    : "text-neutral-text hover:bg-white/5"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-neutral-glass border border-glass-border p-6 rounded-2xl backdrop-blur-md"
        >
          {renderContent()}
        </motion.div>
      </div>
    </div>
  );
} 