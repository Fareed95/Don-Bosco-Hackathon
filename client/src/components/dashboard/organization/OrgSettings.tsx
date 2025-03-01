import { motion } from "framer-motion";

export default function OrgSettings() {
  return (
    <div className="space-y-6">
      <div className="bg-white/5 border border-glass-border p-6 rounded-xl backdrop-blur-sm relative group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
          <h3 className="text-lg font-semibold text-neutral-text mb-6">Organization Profile</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-neutral-accent mb-2">Organization Name</label>
              <input
                type="text"
                className="w-full bg-white/5 border border-glass-border rounded-lg px-4 py-2 text-neutral-text focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                placeholder="Enter organization name"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-accent mb-2">Contact Email</label>
              <input
                type="email"
                className="w-full bg-white/5 border border-glass-border rounded-lg px-4 py-2 text-neutral-text focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                placeholder="Enter contact email"
              />
            </div>
            <div>
              <label className="block text-sm text-neutral-accent mb-2">Description</label>
              <textarea
                className="w-full bg-white/5 border border-glass-border rounded-lg px-4 py-2 text-neutral-text focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
                rows={4}
                placeholder="Enter organization description"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white/5 border border-glass-border p-6 rounded-xl backdrop-blur-sm relative group overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
          <h3 className="text-lg font-semibold text-neutral-text mb-6">Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 bg-white/5 border border-glass-border rounded focus:ring-2 focus:ring-cyan-500/50"
              />
              <label className="ml-2 text-neutral-text">Enable email notifications</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 bg-white/5 border border-glass-border rounded focus:ring-2 focus:ring-cyan-500/50"
              />
              <label className="ml-2 text-neutral-text">Allow member registration</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                className="w-4 h-4 bg-white/5 border border-glass-border rounded focus:ring-2 focus:ring-cyan-500/50"
              />
              <label className="ml-2 text-neutral-text">Make organization public</label>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-4 py-2 bg-white/5 border border-glass-border rounded-lg text-neutral-accent hover:text-white transition-colors"
        >
          Cancel
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group px-4 py-2 rounded-lg overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-white/10 to-cyan-500/20 group-hover:opacity-100 opacity-50 transition-opacity" />
          <div className="relative bg-neutral-glass border border-glass-border px-4 py-2 rounded-lg text-neutral-text group-hover:text-white transition-colors">
            Save Changes
          </div>
        </motion.button>
      </div>
    </div>
  );
} 