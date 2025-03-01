"use client";

import { useEffect, useState } from "react";
import { PlaceholdersAndVanishInput } from "./ui/placeholders-and-vanish-input";
import { useUserContext } from "@/app/context/Userinfo";
import Timeline_roadmap_function from "./Timeline_roadmap";
import { MultiStepLoader } from "./ui/multi-step-loader";
import { motion } from 'framer-motion';

function MainInput() {
  const [inputValue, setInputValue] = useState("");
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { contextemail } = useUserContext();
  
  const MODEL_API_SERVER = process.env.NEXT_PUBLIC_MODEL_API_SERVER;

  const loadingStates = [
    {
      text: "Analyzing your learning goals...",
    },
    {
      text: "Identifying key concepts and skills...",
    },
    {
      text: "Structuring your personalized roadmap...",
    },
    {
      text: "Gathering learning resources...",
    },
    {
      text: "Finalizing your learning path...",
    },
  ];

  const placeholders = [
    "How can I learn advanced backend development?",
    "How can I learn linear algebra?",
    "How can I learn database optimization?",
    "How can I learn to design scalable APIs?",
    "How can I learn machine learning?",
  ];

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue || !contextemail || !MODEL_API_SERVER) return;

    setLoading(true);
    setRoadmapData(null);

    const MAX_RETRIES = 5;
    let attempts = 0;
    let success = false;

    while (attempts < MAX_RETRIES && !success) {
      try {
        const response = await fetch(`${MODEL_API_SERVER}/generate-roadmap-first-component`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            input_value: inputValue,
            email: contextemail,
          }),
        });

        if (!response.ok) {
          attempts++;
          if (attempts >= MAX_RETRIES) {
            window.alert("Failed to load roadmap. Please try again.");
          }
        } else {
          const data = await response.json();
          setRoadmapData(data);
          console.log("Roadmap data loaded successfully:", data);
          success = true;
        }
      } catch (error) {
        console.error(`Attempt ${attempts + 1} failed:`, error);
        attempts++;
        if (attempts >= MAX_RETRIES) {
          window.alert("Failed to load roadmap. Please try again.");
        }
      }
    }

    setLoading(false);
  };

  useEffect(() => {
  const fetchFullRoadmap = async () => {
    if (!roadmapData?.roadmap_id) return;

    console.log("Sending request to generate-roadmap-all for roadmap_id:", roadmapData.roadmap_id);
    
    try {
      const response = await fetch(`${MODEL_API_SERVER}/generate-roadmap-all`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: roadmapData.roadmap_id }),
      });

      console.log("Response:", response);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Roadmap all generated successfully:", data);

    } catch (error) {
      console.error("Error generating full roadmap:", error);
    }
  };

  fetchFullRoadmap();
}, [roadmapData]);

  

  return (
    <div className="max-w-4xl mx-auto w-full px-4">
      <motion.div 
        className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={onSubmit} className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Tell us what you want to learn..."
            value={inputValue}
            onChange={handleChange}
            className="flex-1 bg-neutral-800/50 text-white placeholder-neutral-400 border border-neutral-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-neutral-600 transition-all duration-300"
          />
          <button
            type="submit"
            disabled={loading}
            className={`bg-neutral-800 hover:bg-neutral-700 text-white px-6 py-3 rounded-xl border border-neutral-700 transition-all duration-300 font-medium ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </form>
        <div className="mt-4 text-neutral-400 text-sm">
          Popular: Web Development, Data Science, AI/ML
        </div>
      </motion.div>

      {loading && (
        <div className="fixed inset-0 z-50">
          <MultiStepLoader
            loadingStates={loadingStates}
            loading={loading}
            duration={1000}
            loop={true}
          />
        </div>
      )}

      {roadmapData && !loading && (
        <div className="mt-8 w-full p-6 rounded-xl page-transition">
          <Timeline_roadmap_function roadmapData={roadmapData} />
        </div>
      )}
    </div>
  );
}

export default MainInput;
