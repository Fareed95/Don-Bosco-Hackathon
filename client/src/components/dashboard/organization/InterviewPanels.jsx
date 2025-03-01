'use client'
import { useEffect, useState } from 'react';

export default function StudentDashboard() {
  const [studentsForInterview, setStudentsForInterview] = useState([]);
  const [studentsUnderReview, setStudentsUnderReview] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:8000/api/user')
      .then(res => res.json())
      .then(data => {
        // Extract the first company's first internship students
        const internship = data.companies[0]?.internships[0];
        if (internship) {
          setStudentsForInterview(internship.students_for_interview);
          setStudentsUnderReview(internship.students_under_review);
        }
        setIsLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div className="p-8 text-center">Loading...</div>;
  }

  return (
    <div className="flex min-h-screen bg-neutral-600">
      {/* Interview Students Panel */}
      <div className="w-1/2 p-6 bg-black">
        <h2 className="text-2xl font-bold mb-6 text-blue-800">
          Students for Interview ({studentsForInterview.length})
        </h2>
        <div className="space-y-4">
          {studentsForInterview.map(student => (
            <div key={student.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-lg">{student.user_name}</h3>
              <div className="mt-2 text-sm text-gray-600">
                <p>Interview Time: {new Date(student.interviw_time).toLocaleString()}</p>
                <p className="text-xs text-gray-500">
                  Registered: {new Date(student.registered_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Under Review Students Panel */}
      <div className="w-1/2 p-6 bg-black">
        <h2 className="text-2xl font-bold mb-6 text-orange-800">
          Students Under Review ({studentsUnderReview.length})
        </h2>
        <div className="space-y-4">
          {studentsUnderReview.map(student => (
            <div key={student.id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="font-semibold text-lg">{student.user_name}</h3>
              <div className="mt-2 text-sm text-gray-600">
                <p>Status: Under Review</p>
                <p className="text-xs text-gray-500">
                  Registered: {new Date(student.registered_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}