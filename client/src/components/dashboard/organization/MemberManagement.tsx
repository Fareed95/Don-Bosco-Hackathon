import { motion } from "framer-motion";

export default function MemberManagement() {
  const members = [
    { id: 1, name: "John Doe", role: "Student", status: "Active", progress: "85%" },
    { id: 2, name: "Jane Smith", role: "Mentor", status: "Active", progress: "92%" },
    { id: 3, name: "Mike Johnson", role: "Student", status: "Inactive", progress: "45%" },
    // Add more members as needed
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-neutral-text">Member List</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative group px-4 py-2 rounded-lg overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-white/10 to-cyan-500/20 group-hover:opacity-100 opacity-50 transition-opacity" />
          <div className="relative bg-neutral-glass border border-glass-border px-4 py-2 rounded-lg text-neutral-text group-hover:text-white transition-colors">
            Add Member
          </div>
        </motion.button>
      </div>

      <div className="bg-white/5 border border-glass-border rounded-xl overflow-hidden backdrop-blur-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-glass-border">
                <th className="px-6 py-3 text-left text-sm font-medium text-neutral-accent">Name</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-neutral-accent">Role</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-neutral-accent">Status</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-neutral-accent">Progress</th>
                <th className="px-6 py-3 text-left text-sm font-medium text-neutral-accent">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <motion.tr
                  key={member.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="border-b border-glass-border hover:bg-white/5 transition-colors"
                >
                  <td className="px-6 py-4 text-sm text-neutral-text">{member.name}</td>
                  <td className="px-6 py-4 text-sm text-neutral-text">{member.role}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      member.status === "Active" 
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-red-500/20 text-red-300"
                    }`}>
                      {member.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-neutral-text">{member.progress}</td>
                  <td className="px-6 py-4 text-sm">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="text-neutral-accent hover:text-white transition-colors"
                    >
                      Edit
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
} 