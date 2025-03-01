"use client";

import { useState } from "react";
import { MultiStepLoader } from "./ui/multi-step-loader";
import { motion } from 'framer-motion';

function MainInput({ onSubmit }) {
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputValue) return;

    setLoading(true);
    await onSubmit(inputValue);
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto w-full px-4">
      <motion.div 
        className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Tell us what you want to learn..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
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
    </div>
  );
}

export default MainInput;
