"use client"
import { useState } from 'react';
import { motion } from 'framer-motion';
import Cookies from 'js-cookie';

const Forms = () => {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    stipend: '',
    duration: '',
    location: 'remote',
    skills_required: '',
    openings: '',
    application_deadline: '',
    posted_at: new Date().toISOString()
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting form data:', formData);

    try {
      // Get the token from cookies

      // First fetch the user data to get the company ID
      const response = await fetch('http://localhost:8000/api/user', {
        method: 'GET', // Changed to GET since we're fetching user data
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userData = await response.json();
      console.log('User data received:', userData);

      // Get the company ID from the first company in the array
      const companyId = userData.companies[0]?.id;
      if (!companyId) {
        console.error('No company ID found');
        alert('No company found for this user');
        return;
      }
      console.log('Company ID:', companyId);

      // Prepare the internship data
      const internshipData = {
        company: companyId,
        title: formData.title,
        description: formData.description,
        stipend: formData.stipend,
        duration: formData.duration,
        location: formData.location,
        skills_required: formData.skills_required,
        openings: parseInt(formData.openings),
        application_deadline: formData.application_deadline,
        posted_at: new Date().toISOString()
      };

      console.log('Sending internship data:', internshipData);

      // Post the internship data
      const postResponse = await fetch('http://localhost:8000/api/internships/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        credentials: 'include',
        body: JSON.stringify(internshipData),
      });

      if (!postResponse.ok) {
        throw new Error(`HTTP error! status: ${postResponse.status}`);
      }

      const result = await postResponse.json();
      console.log('API Response:', result);

      // Reset form and close modal
      setShowModal(false);
      setFormData({
        title: '',
        description: '',
        stipend: '',
        duration: '',
        location: '',
        skills_required: '',
        openings: '',
        application_deadline: '',
        posted_at: new Date().toISOString()
      });

      alert('Internship posted successfully!');

    } catch (error) {
      console.error('Error posting internship:', error);
      alert('Failed to post internship. Please try again.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    console.log('Form field updated:', name, value);
  };

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-6rem)]">
      <div className="w-full max-w-7xl mx-auto px-4">
        <div className="flex justify-center mb-8">
          <motion.button
            onClick={() => setShowModal(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-neutral-800 text-neutral-200 px-8 py-4 rounded-xl hover:bg-neutral-700 transition-all duration-300 border border-neutral-700 text-lg font-semibold"
          >
            Add New Internship
          </motion.button>
        </div>

        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-neutral-900/90 backdrop-blur-xl p-8 rounded-2xl w-full max-w-4xl border border-neutral-800 shadow-2xl text-neutral-200 mx-4"
            >
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-neutral-200 to-neutral-400 bg-clip-text text-transparent">
                  Post New Internship
                </h2>
                <p className="text-neutral-400 mt-2">Fill in the details below to create a new internship posting</p>
              </div>

              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Text Inputs */}
                {['title', 'description', 'stipend', 'duration', 'skills_required', 'openings'].map((field) => (
                  <div key={field} className="space-y-2">
                    <label className="block capitalize text-neutral-400 font-medium">{field}</label>
                    <input
                      type={['stipend', 'openings'].includes(field) ? 'number' : 'text'}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full bg-neutral-800/50 border border-neutral-700 p-4 rounded-xl text-neutral-200 focus:outline-none focus:border-neutral-500 transition-colors placeholder-neutral-500"
                      required
                      placeholder={`Enter ${field}`}
                    />
                  </div>
                ))}

                {/* Location Select */}
                <div className="space-y-2">
                  <label className="block text-neutral-400 font-medium">Location Type</label>
                  <select
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full bg-neutral-800/50 border border-neutral-700 p-4 rounded-xl text-neutral-200 focus:outline-none focus:border-neutral-500 transition-colors"
                  >
                    {['remote', 'hybrid', 'onsite'].map(option => (
                      <option key={option} value={option} className="bg-neutral-800 capitalize">{option}</option>
                    ))}
                  </select>
                </div>

              

                {/* Date Inputs */}
                {['application_deadline'].map((field) => (
                  <div key={field} className="space-y-2">
                    <label className="block capitalize text-neutral-400 font-medium">{field}</label>
                    <input
                      type="date"
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full bg-neutral-800/50 border border-neutral-700 p-4 rounded-xl text-neutral-200 focus:outline-none focus:border-neutral-500 transition-colors"
                      required
                    />
                  </div>
                ))}

                <div className="col-span-1 md:col-span-2 flex justify-center gap-4 mt-8">
                  <motion.button
                    type="button"
                    onClick={() => setShowModal(false)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 rounded-xl bg-neutral-800 text-neutral-300 hover:bg-neutral-700 transition-all duration-300 border border-neutral-700 min-w-[150px]"
                  >
                    Cancel
                  </motion.button>
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-8 py-4 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 min-w-[150px]"
                  >
                    Submit
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Forms;