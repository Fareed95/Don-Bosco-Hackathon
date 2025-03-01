'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef, use } from 'react';
import { usePortfolio } from '@/hooks/usePortfolio';
import { useAuth } from '@/app/context/AuthContext';
// import SplashCursor from '@/components/SplashCursor';
import { ExternalLink, Globe } from "lucide-react";
// import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
// import { Vortex } from '@/components/ui/vortex';
import { InfiniteMovingText } from '@/components/ui/infinite-moving-text';
import { WavyBackground } from '@/components/ui/wavy-background';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';



const StatsCard = ({ icon: Icon, label, value }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="rounded-xl border border-neutral-700 p-6"
  >
    <div className="flex items-center gap-4">
      <div className="p-3 rounded-lg bg-cyan-500/10">
        <Icon className="w-6 h-6 text-cyan-500" />
      </div>
      <div>
        <p className="text-neutral-400 text-sm">{label}</p>
        <h4 className="text-2xl font-bold text-neutral-200">{value}</h4>
      </div>
  </div>
  </motion.div>
);

// Add SparklesCore component
const SparklesCore = ({ children }) => {
  const [particles, setParticles] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 50 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 2 + 1,
        duration: Math.random() * 2 + 1,
      }));
      setParticles(newParticles);
    };

    generateParticles();
    const interval = setInterval(generateParticles, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute bg-cyan-500/30 rounded-full pointer-events-none"
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
      {children}
    </div>
  );
};

// Modify TextRevealCard to remove background
const TextRevealCard = ({ children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative overflow-hidden rounded-xl"
    >
      <motion.div
        className="relative z-10"
        animate={{
          y: isHovered ? -5 : 0,
        }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};

const Page = ({ params }) => {
  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const decodedEmail = decodeURIComponent(unwrappedParams.email);
  
  const { data: session } = useSession();
  const { email: authEmail } = useAuth();
  
  // Update the ownership check to compare both session email and auth context email
  const isOwner = (session?.user?.email === decodedEmail) || (authEmail === decodedEmail);
  
  // Simplify the auth check to just require either the session token or ownership
  const canEdit = isOwner && (session?.user?.accessToken || session?.user?.email);

  const { portfolioData, updateUserDetails, loading, error } = usePortfolio(decodedEmail);
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone_number: '',
    about: '',
    education: [{
      degree: '',
      field_of_study: '',
      University: '',
    location: '',
      start_date: '',
      end_date: '',
      current_grade: ''
    }],
    certificate: [{
      name: '',
      competition_battled: 0,
      competition_won: 0
    }],
    project: [{
      name: '',
      description: '',
      link: [
        {
          name: '',
          url: '',
          project: '',
        }
      ]
    }],
    toolname: [{
      name: '',
      user: '',
      tools: []
    }]
  });

  useEffect(() => {
    if (portfolioData?.userDetails) {
      setUserDetails({
        id: portfolioData.userDetails.id,
        name: portfolioData.userDetails.name || '',
        email: portfolioData.userDetails.email || '',
        phone_number: portfolioData.userDetails.phone_number || '',
        about: portfolioData.userDetails.about || '',
        education: portfolioData.userDetails.education || [],
        certificate: portfolioData.userDetails.certificate || [],
        project: portfolioData.userDetails.project || [],
        toolname: portfolioData.userDetails.toolname || []


      });
    }
  }, [portfolioData]);

  // Add debug logging
  useEffect(() => {
    console.log('Auth Debug:', {
      sessionEmail: session?.user?.email,
      authEmail,
      paramsEmail: decodedEmail,
      isOwner,
      canEdit,
      hasToken: !!session?.user?.accessToken
    });
  }, [session, authEmail, decodedEmail, isOwner, canEdit]);

  // Add these handler functions
  const handleUpdateUserDetails = async (e) => {
    e.preventDefault();
    
    try {
      // 1. Update user details
      const userResponse = await fetch(`http://localhost:8000/api/userdetails/${decodedEmail}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userDetails.name,
          phone_number: userDetails.phone_number,
          about: userDetails.about,
        }),
      });

      if (!userResponse.ok) throw new Error('Failed to update user details');

      // 2. Add toolnames
      if (userDetails.toolname.length > 0) {
        for (const tool of userDetails.toolname) {
          await fetch('http://localhost:8000/api/toolnames/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: tool.name,
              user: userDetails.id,
            }),
          });
        }
      }

      // 3. Add education
      if (userDetails.education.length > 0) {
        for (const edu of userDetails.education) {
          await fetch('http://localhost:8000/api/education/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              degree: edu.degree,
              field_of_study: edu.field_of_study,
              University: edu.University,
              location: edu.location,
              start_date: edu.start_date,
              end_date: edu.end_date,
              current_grade: edu.current_grade,
              user: userDetails?.id,
            }),
          });
        }
      }

      // 4. Add projects and their links
      if (userDetails.project.length > 0) {
        for (const proj of userDetails.project) {
          // Create project
          const projectResponse = await fetch('http://localhost:8000/api/projects/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: proj.name,
              description: proj.description,
              user: userDetails?.id,
            }),
          });

          if (!projectResponse.ok) throw new Error('Failed to create project');
          
          const projectData = await projectResponse.json();

          // Add links for the project
          if (proj.link && proj.link.length > 0) {
            for (const link of proj.link) {
              await fetch('http://localhost:8000/api/links/', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  name: link.name,
                  url: link.url,
                  project: projectData.id, // Use the ID from the created project
                }),
              });
            }
          }
        }
      }

      // Close modal and refresh data
      setIsEditing(false);
      // Refresh the portfolio data
      if (typeof window !== 'undefined') {
        window.location.reload();
      }

    } catch (error) {
      console.error('Error updating profile:', error);
      // Add error handling UI feedback here
    }
  };

  // Add these helper functions for form arrays
  const handleAddEducation = () => {
    setUserDetails(prev => ({
      ...prev,
      education: [...prev.education, {
        degree: '',
        field_of_study: '',
        University: '',
        location: '',
        start_date: '',
        end_date: '',
        current_grade: ''
      }]
    }));
  };

  const handleRemoveEducation = (index) => {
    setUserDetails(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const handleAddProject = () => {
    setUserDetails(prev => ({
      ...prev,
      project: [...prev.project, {
        name: '',
        description: '',
        link: []
      }]
    }));
  };

  const handleRemoveProject = (index) => {
    setUserDetails(prev => ({
      ...prev,
      project: prev.project.filter((_, i) => i !== index)
    }));
  };

  const handleAddProjectLink = (projectIndex) => {
    setUserDetails(prev => {
      const newProjects = [...prev.project];
      newProjects[projectIndex] = {
        ...newProjects[projectIndex],
        link: [...newProjects[projectIndex].link, { name: '', url: '' }]
      };
      return { ...prev, project: newProjects };
    });
  };

  const handleRemoveProjectLink = (projectIndex, linkIndex) => {
    setUserDetails(prev => {
      const newProjects = [...prev.project];
      newProjects[projectIndex] = {
        ...newProjects[projectIndex],
        link: newProjects[projectIndex].link.filter((_, i) => i !== linkIndex)
      };
      return { ...prev, project: newProjects };
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-900/50 border border-neutral-800 p-8 rounded-2xl backdrop-blur-md text-center"
        >
          <p className="text-red-400">Error loading portfolio data</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950">
      <SparklesCore>
        {/* <SplashCursor /> */}
        <WavyBackground>
      {/* Hero Section */}
        <div className="relative pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto px-4"
          >
            <TextRevealCard>
              <div className="text-center">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 mb-4"
                >
                  {userDetails.name || 'Portfolio'}
                  <p className="text-neutral-400 mt-4"> {userDetails.email}</p>
                  <p className="text-neutral-400 mt-4"> {userDetails.phone_number}</p>
                  <p className="text-neutral-400 mt-4"> {userDetails.about}</p>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl text-neutral-400 mb-6"
                >
                  {userDetails.title}
                </motion.p>
          {userDetails.bio && (
                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-neutral-300 max-w-2xl mx-auto mb-8"
                  >
              {userDetails.bio}
                  </motion.p>
                )}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center justify-center space-x-6"
                >

            {userDetails.location && (
                    <span className="text-neutral-400 flex items-center">
                      <Globe className="w-4 h-4 mr-2" /> {userDetails.location}
              </span>
            )}

            {userDetails.website && (
              <a
                href={userDetails.website}
                target="_blank"
                rel="noopener noreferrer"
                      className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center"
              >
                      <ExternalLink className="w-4 h-4 mr-2" /> Website
              </a>
            )}
                </motion.div>
          </div>
            </TextRevealCard>
        </motion.div>
      </div>
        </WavyBackground>



        <div className="max-w-7xl mx-auto px-4 space-y-24 pb-32">
        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
            <TextRevealCard>
              <div>
                <h2 className="text-3xl font-bold text-neutral-200 mb-8">Skills & Expertise</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioData?.toolNames?.map((toolName) => (
              <motion.div
                key={toolName.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                      className="p-6 rounded-xl border border-neutral-700 hover:border-blue-500/50 transition-all duration-300"
              >
                      <h3 className="text-xl font-semibold text-neutral-200 mb-4">{toolName.name}</h3>
                <div className="space-y-3">
                  {toolName.tools?.map((tool) => (
                    <div key={tool.id} className="space-y-2">
                            <p className="text-blue-400 font-medium">{tool.name}</p>
                      {tool.components?.map((component) => (
                              <p key={component.id} className="text-neutral-400 pl-4 text-sm">
                          • {component.name}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
              </div>
            </TextRevealCard>
        </motion.section>


        {/* Education Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
            <TextRevealCard>
              <div>
                <h2 className="text-3xl font-bold text-neutral-200 mb-8">Education</h2>
                <div className="space-y-6">
            {portfolioData?.userDetails?.education?.map((edu) => (
              <motion.div
                key={edu.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                      className="p-6 rounded-xl border border-neutral-700 hover:border-blue-500/50 transition-all duration-300"
              >
                      <div className="grid md:grid-cols-2 gap-6">
                  <div>
                          <h3 className="text-xl font-semibold text-neutral-200">{edu.degree}</h3>
                          <p className="text-blue-400 mt-2">{edu.field_of_study}</p>
                          <p className="text-neutral-400 mt-1">{edu.University}</p>
                          <p className="text-neutral-400">{edu.location}</p>
                  </div>
                  <div className="text-right">
                          <p className="text-neutral-300">{edu.start_date} - {edu.end_date}</p>
                    {edu.current_grade && (
                            <p className="text-blue-400 mt-2">Grade: {edu.current_grade}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
              </div>
            </TextRevealCard>
        </motion.section>

        {/* Projects Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
            <TextRevealCard>
              <div>
                <h2 className="text-3xl font-bold text-neutral-200 mb-8">Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioData?.userDetails?.project?.map((proj) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                      className="p-6 rounded-xl border border-neutral-700 hover:border-blue-500/50 transition-all duration-300"
              >
                      <h3 className="text-xl font-semibold text-neutral-200">{proj.name}</h3>
                      <p className="text-neutral-400 mt-4">{proj.description}</p>
                <div className="mt-6">
                        <p className="text-blue-400">
                    {proj.start_date} - {proj.end_date || 'Present'}
                  </p>
                  {proj.link && proj.link.length > 0 && (
                    <div className="flex flex-wrap gap-3 mt-4">
                      {proj.link.map((link) => (
                        <motion.a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                                className="px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all duration-300 text-sm"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          {link.name}
                        </motion.a>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
              </div>
            </TextRevealCard>
        </motion.section>

        {/* Certificates Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative"
        >
            <TextRevealCard>
              <div>
                <h2 className="text-3xl font-bold text-neutral-200 mb-8">Certificates</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioData?.userDetails?.certificate?.map((cert) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                      className="p-6 rounded-xl border border-neutral-700 hover:border-blue-500/50 transition-all duration-300"
                    >
                      <h3 className="text-xl font-semibold text-neutral-200">{cert.name}</h3>
                      <p className="text-blue-400 mt-2">{cert.issuing_organization}</p>
                      <p className="text-neutral-400 mt-4">Competition Battled: {cert.competition_battled}</p>
                      <p className="text-neutral-400 mt-4">Competition Won: {cert.competition_won}</p>
                      
                {cert.credential_id && (
                        <p className="text-blue-400 mt-2">Credential ID: {cert.credential_id}</p>
                )}
                {cert.credential_url && (
                  <motion.a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                          className="inline-block px-4 py-2 mt-4 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition-all duration-300 text-sm"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Certificate
                  </motion.a>
                )}
              </motion.div>
            ))}
          </div>
              </div>
            </TextRevealCard>
        </motion.section>
      </div>
      </SparklesCore>

      {/* Add debug info for development */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-20 right-4 bg-black/80 p-4 rounded-lg text-xs text-white z-50">
          <p>Session Email: {session?.user?.email}</p>
          <p>Auth Email: {authEmail}</p>
          <p>Profile Email: {decodedEmail}</p>
          <p>Is Owner: {isOwner.toString()}</p>
          <p>Can Edit: {canEdit.toString()}</p>
        </div>
      )}

      {/* Edit Profile Button - Only visible to authenticated owner */}
      {isOwner && (
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsEditing(true)}
          className="fixed bottom-8 right-8 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition-all duration-300"
      >
        Edit Profile
      </motion.button>
      )}

      {/* Edit Modal */}
      {isEditing && isOwner && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-neutral-900/80 p-8 rounded-2xl max-w-4xl w-full mx-4 border border-neutral-800 backdrop-blur-md max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-2xl font-bold text-neutral-200 mb-6">Edit Profile</h2>
            <form onSubmit={handleUpdateUserDetails} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-neutral-300">Basic Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-neutral-400 block mb-2">Name</label>
                  <input
                    type="text"
                    value={userDetails.name}
                    onChange={(e) => setUserDetails(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 block mb-2">Email</label>
                    <input
                      type="email"
                      value={userDetails.email}
                      onChange={(e) => setUserDetails(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                    <label className="text-neutral-400 block mb-2">Phone Number</label>
                  <input
                      type="tel"
                      value={userDetails.phone_number || ''}
                      onChange={(e) => setUserDetails(prev => ({ ...prev, phone_number: e.target.value }))}
                      className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                    <label className="text-neutral-400 block mb-2">About</label>
                  <textarea
                      value={userDetails.about || ''}
                      onChange={(e) => setUserDetails(prev => ({ ...prev, about: e.target.value }))}
                      className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                      rows={3}
                    />
                  </div>
                </div>
              </div>

              {/* Education Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-neutral-300">Education</h3>
                  <motion.button
                    type="button"
                    onClick={handleAddEducation}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                  >
                    Add Education
                  </motion.button>
                </div>
                {userDetails.education.map((edu, index) => (
                  <div key={index} className="relative p-4 border border-neutral-800 rounded-lg">
                    <motion.button
                      type="button"
                      onClick={() => handleRemoveEducation(index)}
                      className="absolute top-4 right-4 p-2 text-red-400 hover:text-red-300 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      ×
                    </motion.button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-neutral-400 block mb-2">Degree</label>
                        <input
                          type="text"
                          value={edu.degree}
                          onChange={(e) => {
                            const newEducation = [...userDetails.education];
                            newEducation[index] = { ...edu, degree: e.target.value };
                            setUserDetails(prev => ({ ...prev, education: newEducation }));
                          }}
                          className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-400 block mb-2">Field of Study</label>
                        <input
                          type="text"
                          value={edu.field_of_study}
                          onChange={(e) => {
                            const newEducation = [...userDetails.education];
                            newEducation[index] = { ...edu, field_of_study: e.target.value };
                            setUserDetails(prev => ({ ...prev, education: newEducation }));
                          }}
                          className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-400 block mb-2">University</label>
                        <input
                          type="text"
                          value={edu.University}
                          onChange={(e) => {
                            const newEducation = [...userDetails.education];
                            newEducation[index] = { ...edu, University: e.target.value };
                            setUserDetails(prev => ({ ...prev, education: newEducation }));
                          }}
                          className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-400 block mb-2">Location</label>
                        <input
                          type="text"
                          value={edu.location}
                          onChange={(e) => {
                            const newEducation = [...userDetails.education];
                            newEducation[index] = { ...edu, location: e.target.value };
                            setUserDetails(prev => ({ ...prev, education: newEducation }));
                          }}
                          className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-400 block mb-2">Start Date</label>
                        <input
                          type="date"
                          value={edu.start_date}
                          onChange={(e) => {
                            const newEducation = [...userDetails.education];
                            newEducation[index] = { ...edu, start_date: e.target.value };
                            setUserDetails(prev => ({ ...prev, education: newEducation }));
                          }}
                          className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-400 block mb-2">End Date</label>
                        <input
                          type="date"
                          value={edu.end_date}
                          onChange={(e) => {
                            const newEducation = [...userDetails.education];
                            newEducation[index] = { ...edu, end_date: e.target.value };
                            setUserDetails(prev => ({ ...prev, education: newEducation }));
                          }}
                          className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                        <label className="text-neutral-400 block mb-2">Current Grade</label>
                  <input
                    type="text"
                          value={edu.current_grade}
                          onChange={(e) => {
                            const newEducation = [...userDetails.education];
                            newEducation[index] = { ...edu, current_grade: e.target.value };
                            setUserDetails(prev => ({ ...prev, education: newEducation }));
                          }}
                          className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Projects Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-neutral-300">Projects</h3>
                  <motion.button
                    type="button"
                    onClick={handleAddProject}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                  >
                    Add Project
                  </motion.button>
                </div>
                {userDetails.project.map((proj, index) => (
                  <div key={index} className="relative p-4 border border-neutral-800 rounded-lg">
                    <motion.button
                      type="button"
                      onClick={() => handleRemoveProject(index)}
                      className="absolute top-4 right-4 p-2 text-red-400 hover:text-red-300 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      ×
                    </motion.button>
                <div>
                      <label className="text-neutral-400 block mb-2">Project Name</label>
                  <input
                        type="text"
                        value={proj.name}
                        onChange={(e) => {
                          const newProjects = [...userDetails.project];
                          newProjects[index] = { ...proj, name: e.target.value };
                          setUserDetails(prev => ({ ...prev, project: newProjects }));
                        }}
                        className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-2">Description</label>
                      <textarea
                        value={proj.description}
                        onChange={(e) => {
                          const newProjects = [...userDetails.project];
                          newProjects[index] = { ...proj, description: e.target.value };
                          setUserDetails(prev => ({ ...prev, project: newProjects }));
                        }}
                        className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                        rows={3}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Certificates Section */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-neutral-300">Certificates</h3>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                  >
                    Add Certificate
                  </motion.button>
                </div>
                {userDetails.certificate.map((cert, index) => (
                  <div key={index} className="relative p-4 border border-neutral-800 rounded-lg">
                    <motion.button
                      type="button"
                      onClick={() => handleRemoveCertificate(index)}
                      className="absolute top-4 right-4 p-2 text-red-400 hover:text-red-300 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      ×
                    </motion.button>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-neutral-400 block mb-2">Certificate Name</label>
                        <input
                          type="text"
                          value={cert.name}
                          onChange={(e) => {
                            const newCertificates = [...userDetails.certificate];
                            newCertificates[index] = { ...cert, name: e.target.value };
                            setUserDetails(prev => ({ ...prev, certificate: newCertificates }));
                          }}
                          className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-400 block mb-2">Start Date</label>
                        <input
                          type="datetime-local"
                          value={cert.started_at.slice(0, 16)}
                          onChange={(e) => {
                            const newCertificates = [...userDetails.certificate];
                            newCertificates[index] = { ...cert, started_at: e.target.value };
                            setUserDetails(prev => ({ ...prev, certificate: newCertificates }));
                          }}
                          className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-neutral-400 block mb-2">End Date</label>
                        <input
                          type="datetime-local"
                          value={cert.ended_at.slice(0, 16)}
                          onChange={(e) => {
                            const newCertificates = [...userDetails.certificate];
                            newCertificates[index] = { ...cert, ended_at: e.target.value };
                            setUserDetails(prev => ({ ...prev, certificate: newCertificates }));
                          }}
                          className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4">
                <motion.button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 bg-neutral-700 hover:bg-neutral-600 text-neutral-200 rounded-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Save Changes
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default Page;