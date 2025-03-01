"use client";

import { motion } from "framer-motion";

interface Mentor {
  id: string;
  name: string;
  expertise: string[];
  rating: number;
  activeMentees: number;
  totalSessions: number;
  status: 'active' | 'inactive' | 'pending';
  joinDate: string;
}

const MentorCard = ({ mentor }: { mentor: Mentor }) => (
  <div className="glass p-6 rounded-xl hover-glow">
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-electric-blue">{mentor.name}</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {mentor.expertise.map((skill) => (
              <span 
                key={skill}
                className="px-2 py-1 text-xs rounded-full bg-deep-indigo/20 text-neon-cyan"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs ${
          mentor.status === 'active' ? 'bg-green-500/20 text-green-500' :
          mentor.status === 'inactive' ? 'bg-red-500/20 text-red-500' :
          'bg-yellow-500/20 text-yellow-500'
        }`}>
          {mentor.status.charAt(0).toUpperCase() + mentor.status.slice(1)}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-neon-cyan">Rating</p>
          <p className="text-lg font-semibold text-electric-blue flex items-center">
            {mentor.rating.toFixed(1)}
            <span className="text-yellow-500 ml-1">★</span>
          </p>
        </div>
        <div>
          <p className="text-sm text-neon-cyan">Active Mentees</p>
          <p className="text-lg font-semibold text-electric-blue">{mentor.activeMentees}</p>
        </div>
        <div>
          <p className="text-sm text-neon-cyan">Total Sessions</p>
          <p className="text-lg font-semibold text-electric-blue">{mentor.totalSessions}</p>
        </div>
        <div>
          <p className="text-sm text-neon-cyan">Join Date</p>
          <p className="text-lg font-semibold text-electric-blue">{mentor.joinDate}</p>
        </div>
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <button className="glass px-3 py-1 rounded-lg hover:bg-deep-indigo/20 text-sm">
          View Profile
        </button>
        <button className="neon-btn text-sm">
          Manage
        </button>
      </div>
    </div>
  </div>
);

export default function MentorManagement() {
  // Mock data - replace with actual data fetching
  const mentors: Mentor[] = [
    {
      id: '1',
      name: 'Dr. Sarah Chen',
      expertise: ['Machine Learning', 'Data Science', 'Python'],
      rating: 4.9,
      activeMentees: 8,
      totalSessions: 156,
      status: 'active',
      joinDate: '2023-06-15',
    },
    {
      id: '2',
      name: 'James Wilson',
      expertise: ['Web Development', 'React', 'Node.js'],
      rating: 4.8,
      activeMentees: 6,
      totalSessions: 98,
      status: 'active',
      joinDate: '2023-08-22',
    },
    {
      id: '3',
      name: 'Maria Garcia',
      expertise: ['UI/UX Design', 'Product Design', 'Figma'],
      rating: 4.7,
      activeMentees: 5,
      totalSessions: 72,
      status: 'active',
      joinDate: '2023-10-05',
    },
    {
      id: '4',
      name: 'Alex Thompson',
      expertise: ['Cloud Architecture', 'AWS', 'DevOps'],
      rating: 4.9,
      activeMentees: 0,
      totalSessions: 45,
      status: 'inactive',
      joinDate: '2023-11-15',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-electric-blue">Mentor Management</h2>
          <p className="text-neon-cyan mt-1">Manage and monitor mentor performance</p>
        </div>
        <div className="flex space-x-4">
          <button className="glass px-4 py-2 rounded-lg hover:bg-deep-indigo/20">
            Filter
          </button>
          <button className="neon-btn">
            Add New Mentor
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mentors.map((mentor, index) => (
          <motion.div
            key={mentor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <MentorCard mentor={mentor} />
          </motion.div>
        ))}
      </div>
    </div>
  );
} 