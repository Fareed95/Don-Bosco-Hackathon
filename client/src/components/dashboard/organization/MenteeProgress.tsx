"use client";

import { motion } from "framer-motion";

interface Mentee {
  id: string;
  name: string;
  mentor: string;
  program: string;
  progress: number;
  completedModules: number;
  totalModules: number;
  lastActive: string;
  status: 'on-track' | 'at-risk' | 'completed';
}

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full h-2 bg-deep-indigo/20 rounded-full overflow-hidden">
    <div 
      className="h-full bg-electric-blue rounded-full transition-all duration-500"
      style={{ width: `${progress}%` }}
    />
  </div>
);

const MenteeCard = ({ mentee }: { mentee: Mentee }) => (
  <div className="glass p-6 rounded-xl hover-glow">
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-electric-blue">{mentee.name}</h3>
          <p className="text-sm text-neon-cyan">Mentor: {mentee.mentor}</p>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs ${
          mentee.status === 'on-track' ? 'bg-green-500/20 text-green-500' :
          mentee.status === 'at-risk' ? 'bg-red-500/20 text-red-500' :
          'bg-blue-500/20 text-blue-500'
        }`}>
          {mentee.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </span>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <p className="text-sm text-foreground/60">{mentee.program}</p>
          <p className="text-sm font-medium text-electric-blue">
            {mentee.progress}%
          </p>
        </div>
        <ProgressBar progress={mentee.progress} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-neon-cyan">Completed Modules</p>
          <p className="text-lg font-semibold text-electric-blue">
            {mentee.completedModules}/{mentee.totalModules}
          </p>
        </div>
        <div>
          <p className="text-sm text-neon-cyan">Last Active</p>
          <p className="text-lg font-semibold text-electric-blue">{mentee.lastActive}</p>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <button className="glass px-3 py-1 rounded-lg hover:bg-deep-indigo/20 text-sm">
          View Details
        </button>
        <button className="neon-btn text-sm">
          Contact
        </button>
      </div>
    </div>
  </div>
);

export default function MenteeProgress() {
  // Mock data - replace with actual data fetching
  const mentees: Mentee[] = [
    {
      id: '1',
      name: 'Emma Thompson',
      mentor: 'Dr. Sarah Chen',
      program: 'Data Science Fundamentals',
      progress: 75,
      completedModules: 6,
      totalModules: 8,
      lastActive: '2 days ago',
      status: 'on-track',
    },
    {
      id: '2',
      name: 'Michael Chen',
      mentor: 'James Wilson',
      program: 'Full Stack Development',
      progress: 45,
      completedModules: 4,
      totalModules: 10,
      lastActive: '5 days ago',
      status: 'at-risk',
    },
    {
      id: '3',
      name: 'Sofia Rodriguez',
      mentor: 'Maria Garcia',
      program: 'UI/UX Design',
      progress: 90,
      completedModules: 9,
      totalModules: 10,
      lastActive: '1 day ago',
      status: 'on-track',
    },
    {
      id: '4',
      name: 'David Kim',
      mentor: 'Alex Thompson',
      program: 'Cloud Computing',
      progress: 100,
      completedModules: 8,
      totalModules: 8,
      lastActive: '1 week ago',
      status: 'completed',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-electric-blue">Mentee Progress</h2>
          <p className="text-neon-cyan mt-1">Track and monitor mentee development</p>
        </div>
        <div className="flex space-x-4">
          <button className="glass px-4 py-2 rounded-lg hover:bg-deep-indigo/20">
            Filter
          </button>
          <button className="neon-btn">
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mentees.map((mentee, index) => (
          <motion.div
            key={mentee.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <MenteeCard mentee={mentee} />
          </motion.div>
        ))}
      </div>
    </div>
  );
} 