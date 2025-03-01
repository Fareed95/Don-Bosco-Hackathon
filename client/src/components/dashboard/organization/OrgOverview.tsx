import { motion } from "framer-motion";

export default function OrgOverview() {
  const stats = [
    { label: "Total Members", value: "250+" },
    { label: "Active Courses", value: "15" },
    { label: "Completion Rate", value: "85%" },
    { label: "Avg. Engagement", value: "92%" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 border border-glass-border p-4 rounded-xl backdrop-blur-sm relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <h3 className="text-neutral-accent text-sm">{stat.label}</h3>
              <p className="text-2xl font-bold text-neutral-text mt-1">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-glass-border p-6 rounded-xl backdrop-blur-sm relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <h3 className="text-lg font-semibold text-neutral-text mb-4">Recent Activity</h3>
            {/* Add your recent activity content here */}
          </div>
        </div>

        <div className="bg-white/5 border border-glass-border p-6 rounded-xl backdrop-blur-sm relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <h3 className="text-lg font-semibold text-neutral-text mb-4">Performance Overview</h3>
            {/* Add your performance overview content here */}
          </div>
        </div>
      </div>
    </div>
  );
} 