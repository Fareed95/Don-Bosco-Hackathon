import { motion } from "framer-motion";

export default function OrgAnalytics() {
  const metrics = [
    { label: "Total Learning Hours", value: "2,500+", change: "+15%" },
    { label: "Average Completion Rate", value: "85%", change: "+5%" },
    { label: "Active Users", value: "180", change: "+12%" },
    { label: "Course Satisfaction", value: "4.8/5", change: "+0.3" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/5 border border-glass-border p-4 rounded-xl backdrop-blur-sm relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative z-10">
              <h3 className="text-neutral-accent text-sm">{metric.label}</h3>
              <div className="flex items-end gap-2 mt-1">
                <p className="text-2xl font-bold text-neutral-text">{metric.value}</p>
                <span className="text-emerald-400 text-sm mb-1">{metric.change}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 border border-glass-border p-6 rounded-xl backdrop-blur-sm relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <h3 className="text-lg font-semibold text-neutral-text mb-4">Learning Progress</h3>
            <div className="h-64 flex items-center justify-center">
              {/* Add your chart component here */}
              <p className="text-neutral-accent">Chart Placeholder</p>
            </div>
          </div>
        </div>

        <div className="bg-white/5 border border-glass-border p-6 rounded-xl backdrop-blur-sm relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <h3 className="text-lg font-semibold text-neutral-text mb-4">Course Engagement</h3>
            <div className="h-64 flex items-center justify-center">
              {/* Add your chart component here */}
              <p className="text-neutral-accent">Chart Placeholder</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white/5 border border-glass-border p-6 rounded-xl backdrop-blur-sm relative group overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10">
            <h3 className="text-lg font-semibold text-neutral-text mb-4">Monthly Activity Overview</h3>
            <div className="h-64 flex items-center justify-center">
              {/* Add your chart component here */}
              <p className="text-neutral-accent">Chart Placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 