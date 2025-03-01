'use client'
import { useEffect, useState } from 'react';
import { useUserContext } from '@/app/context/Userinfo';
import { motion } from 'framer-motion';

export default function StudentDashboard() {
  const [internships, setInternships] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { contextorganisation } = useUserContext();

  const handleSelectForInterview = async (studentId) => { // Rename parameter to studentId
    console.log('Selected student ID:', studentId);
    try {
      const response = await fetch(`http://localhost:8000/api/internships/${studentId}/`, { // Correct endpoint
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_selected: true })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const updatedStudent = await response.json();

      // Update state to reflect changes
      setInternships(prevInternships =>
        prevInternships.map(internship => ({
          ...internship,
          students_under_review: internship.students_under_review.filter(student => student.id !== studentId),
          students_for_interview: [...internship.students_for_interview, updatedStudent]
        }))
      );

      alert('Student selected for interview successfully!');
    } catch (error) {
      console.error('Error updating student status:', error);
      alert('Failed to update student status. Please try again.');
    }
  };

  useEffect(() => {
    if (contextorganisation && contextorganisation.length > 0) {
      const allInternships = contextorganisation.flatMap(company => company.internships);
      setInternships(allInternships);
      setIsLoading(false);
    }
  }, [contextorganisation]);

  useEffect(() => {
    console.log('Internships data:', internships);
  }, [internships]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {internships.map((internship) => (
            <motion.div
              key={internship.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-xl overflow-hidden"
            >
              {/* Internship Header */}
              <div className="p-6 border-b border-neutral-800">
                <h2 className="text-2xl font-bold text-white mb-2">{internship.title}</h2>
                <div className="flex flex-wrap gap-4 text-sm text-neutral-400">
                  <span>💰 Stipend: ₹{internship.stipend}</span>
                  <span>⏳ Duration: {internship.duration}</span>
                  <span>📍 Location: {internship.location}</span>
                </div>
              </div>

              {/* Students for Interview */}
              <div className="p-6 border-b border-neutral-800">
                <h3 className="text-lg font-semibold text-blue-400 mb-4">
                  Students for Interview ({internship.students_for_interview?.length || 0})
                </h3>
                <div className="space-y-4">
                  {internship.students_for_interview?.map((student) => (
                    <motion.div
                      key={student.id}
                      className="bg-neutral-800/50 rounded-lg p-4"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-white font-medium">{student.user_name}</h4>
                          <p className="text-sm text-neutral-400">Interview: {formatDate(student.interviw_time)}</p>
                          <p className="text-sm text-neutral-500">Registered: {formatDate(student.registered_at)}</p>
                        </div>
                        <div className="flex items-center">
                          <span className="px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                            Selected
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Students Under Review */}
              <div className="p-6">
                <h3 className="text-lg font-semibold text-orange-400 mb-4">
                  Under Review ({internship.students_under_review?.length || 0})
                </h3>
                <div className="space-y-4">
                  {internship.students_under_review?.map((student) => (
                    <motion.div
                      key={student.id}
                      className="bg-neutral-800/50 rounded-lg p-4"
                      whileHover={{ scale: 1.02 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-white font-medium">{student.user_name}</h4>
                          <p className="text-sm text-neutral-500">Registered: {formatDate(student.registered_at)}</p>
                        </div>
                        <div className="flex items-center">
                          <span className="px-2 py-1 text-xs rounded-lg bg-orange-500/10 text-orange-400 border border-orange-500/20">
                            Under Review
                          </span>
                          <button
                          className='bg-blue-500 text-white px-4 py-2 rounded-full'
                          onClick={() => handleSelectForInterview(internship.id)}
                          >Select for Interview</button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}