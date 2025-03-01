"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useRoadmap } from '@/app/context/RoadmapContext';
import { Timeline } from "@/components/ui/timeline";
import { buttons } from "@/components/Button";
import { motion } from "framer-motion";

const RoadmapCard = ({ title, content, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.3, delay: index * 0.1 }}
    className="border border-neutral-800 p-6 rounded-xl relative group overflow-hidden"
  >
    <div className="absolute inset-0 bg-neutral-800/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <div className="relative z-10">
      <h3 className="text-lg font-semibold text-neutral-200 mb-2">{title}</h3>
      <div className="text-neutral-400">{content}</div>
    </div>
  </motion.div>
);

function Timeline_roadmap_function({ roadmapData }) {
  const router = useRouter();
  const { setRoadmap } = useRoadmap();

  console.log("Timeline", roadmapData.first_component);

  if (!roadmapData) {
    return (
      <div className="min-h-[400px] flex items-center justify-center">
        <div className="border border-neutral-800 p-8 rounded-xl">
          <p className="text-neutral-400 text-lg">
            No roadmap data available. Please try again.
          </p>
        </div>
      </div>
    );
  }

  const timelineData = roadmapData.roadmap.map((component, index) => ({
    id: index + 1,
    title: component.name,
    content: (
      <div className="space-y-2">
        <p className="text-neutral-400 leading-relaxed">
          {component.description}
        </p>
        {component.skills && (
          <div className="flex flex-wrap gap-2 mt-2">
            {component.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 bg-neutral-800/50 rounded-full text-xs text-neutral-300"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    ),
  }));

  const playlistButton = buttons.find(button => button.name === "Playlist");

  const handleButtonClick = () => {
    setRoadmap({
      roadmap_id: roadmapData.roadmap_id,
      total_components: roadmapData.total_components,
      first_component: roadmapData.first_component
    });

    router.push('/Learning');
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-neutral-800 p-6 rounded-xl"
        >
          <h1 className="text-3xl font-bold text-neutral-200">Learning Roadmap</h1>
          <p className="text-neutral-400 mt-2">
            Total Components: {roadmapData.total_components}
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="border border-neutral-800 p-6 rounded-xl">
          <div className="space-y-6">
            {timelineData.map((item, index) => (
              <RoadmapCard
                key={item.id}
                title={item.title}
                content={item.content}
                index={index}
              />
            ))}
          </div>
        </div>

        {/* Action Button */}
        {timelineData.length > 0 && playlistButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="border border-neutral-800 p-6 rounded-xl w-full">
              {React.cloneElement(playlistButton.component, {
                onClick: handleButtonClick,
                className: "w-full bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105"
              }, "START LEARNING")}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default Timeline_roadmap_function;
