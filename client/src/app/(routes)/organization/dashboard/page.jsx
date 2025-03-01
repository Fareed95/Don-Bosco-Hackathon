"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useSession } from "next-auth/react";

// import OrgOverview from "@/components/dashboard/organization/OrgOverview";
// import MemberManagement from "@/components/dashboard/organization/MemberManagement";
// import CourseLibrary from "@/components/dashboard/organization/CourseLibrary";
import OrgAnalytics from "@/components/dashboard/organization/OrgAnalytics";
// import OrgSettings from "@/components/dashboard/organization/OrgSettings";
import InterviewPanels from "@/components/dashboard/organization/InterviewPanels";
// import Forms from "@/components/dashboard/organization/InternshipForm";

export default function OrganizationDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const { data: session } = useSession();
  const orgName = session?.user?.name || "Organization";

  const tabs = [
    { id: "analytics", label: "Analytics" },
    { id: "interviews", label: "Interviews" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "analytics":
        return <OrgAnalytics />;
      case "interviews":
        return <InterviewPanels />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black p-6 mt-20">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-neutral-glass border border-glass-border p-6 rounded-2xl backdrop-blur-md">
          <h1 className="text-3xl font-bold text-neutral-text">Organization Dashboard</h1>
          <p className="text-neutral-accent mt-2">Welcome, {orgName}</p>
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