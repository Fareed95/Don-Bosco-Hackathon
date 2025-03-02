'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef, use } from 'react';
import { usePortfolio } from '@/hooks/usePortfolio';
import { useAuth } from '@/app/context/AuthContext';
// import SplashCursor from '@/components/SplashCursor';
// import { TextGenerateEffect } from '@/components/ui/text-generate-effect';
// import { Vortex } from '@/components/ui/vortex';
// import { InfiniteMovingText } from '@/components/ui/infinite-moving-text';
// import { WavyBackground } from '@/components/ui/wavy-background';
import { useSession } from "next-auth/react";
// import { useRouter } from 'next/navigation';
import { Palette, Edit } from 'lucide-react';
import { Toaster, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';



// const StatsCard = ({ icon: Icon, label, value }) => (
//   <motion.div
//     whileHover={{ scale: 1.05 }}
//     className="rounded-xl border border-neutral-700 p-6"
//   >
//     <div className="flex items-center gap-4">
//       <div className="p-3 rounded-lg bg-cyan-500/10">
//         <Icon className="w-6 h-6 text-cyan-500" />
//       </div>
//       <div>
//         <p className="text-neutral-400 text-sm">{label}</p>
//         <h4 className="text-2xl font-bold text-neutral-200">{value}</h4>
//       </div>
//     </div>
//   </motion.div>
// );

// Add SparklesCore component
// const SparklesCore = ({ children }) => {
//   const [particles, setParticles] = useState([]);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     const generateParticles = () => {
//       const newParticles = Array.from({ length: 50 }).map((_, i) => ({
//         id: i,
//         x: Math.random() * 100,
//         y: Math.random() * 100,
//         size: Math.random() * 2 + 1,
//         duration: Math.random() * 2 + 1,
//       }));
//       setParticles(newParticles);
//     };

//     generateParticles();
//     const interval = setInterval(generateParticles, 3000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div ref={containerRef} className="relative">
//       {particles.map((particle) => (
//         <motion.div
//           key={particle.id}
//           className="absolute bg-cyan-500/30 rounded-full pointer-events-none"
//           style={{
//             width: particle.size,
//             height: particle.size,
//             left: `${particle.x}%`,
//             top: `${particle.y}%`,
//           }}
//           animate={{
//             opacity: [0, 1, 0],
//             scale: [0, 1, 0],
//           }}
//           transition={{
//             duration: particle.duration,
//             repeat: Infinity,
//             ease: "linear",
//           }}
//         />
//       ))}
//       {children}
//     </div>
//   );
// };

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

// Add this new AI animation component
const AIEffect = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-gradient-to-b from-neutral-950 to-neutral-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent animate-pulse" />
      <div className="absolute inset-0 bg-grid-small-white/[0.05] -z-10" />
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px w-px bg-cyan-500/50 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "linear",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Add this new component for the glowing border effect
const GlowingBorder = ({ children }) => (
  <div className="relative group">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
    {children}
  </div>
);

// Enhance the hero section with AI-themed elements
const AIHero = ({ userDetails }) => (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
    className="relative pt-32 pb-16 overflow-hidden"
  >
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-transparent" />
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-blue-500/5"
          animate={{
            x: ["0%", "100%"],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: i * 2,
            ease: "linear",
          }}
        />
      ))}
    </div>
    <div className="max-w-4xl mx-auto px-4 relative z-10">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <GlowingBorder>
          <div className="bg-neutral-900/50 backdrop-blur-xl p-8 rounded-lg">
            <motion.h1
              className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500 mb-4"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              {userDetails.name || 'AI Portfolio'}
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-neutral-400 mt-4">{userDetails.email}</p>
              <p className="text-neutral-400 mt-2">{userDetails.phone_number}</p>
              <p className="text-neutral-400 mt-2 max-w-2xl mx-auto">{userDetails.about}</p>
            </motion.div>
            </div>
        </GlowingBorder>
        </motion.div>
      </div>
  </motion.div>
);

// Enhance the skills section with AI-themed cards
const AISkillCard = ({ toolName }) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
    whileHover={{ y: -5, scale: 1.02 }}
    className="relative overflow-hidden"
                >
    <GlowingBorder>
      <div className="p-6 rounded-lg bg-neutral-900/50 backdrop-blur-xl relative z-10">
                  <h3 className="text-xl font-semibold text-neutral-200 mb-4">{toolName.name}</h3>
                  <div className="space-y-3">
                    {toolName.tools?.map((tool) => (
            <motion.div
              key={tool.id}
              className="space-y-2"
              whileHover={{ x: 5 }}
            >
              <p className="text-cyan-400 font-medium flex items-center">
                <span className="mr-2">⚡</span>
                {tool.name}
              </p>
                        {tool.components?.map((component) => (
                <p key={component.id} className="text-neutral-400 pl-6 text-sm flex items-center">
                  <span className="w-1 h-1 bg-cyan-500 rounded-full mr-2" />
                  {component.name}
                          </p>
                        ))}
            </motion.div>
                    ))}
                  </div>
      </div>
    </GlowingBorder>
                </motion.div>
);

const TemplateOne = ({ userDetails, portfolioData }) => {
  return (
    <div className="min-h-screen bg-neutral-950 relative">
      <AIEffect />
      <AIHero userDetails={userDetails} />
      <div className="max-w-7xl mx-auto px-4 space-y-24 pb-32">
        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -top-16 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
          <h2 className="text-3xl font-bold text-center mb-16">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
              AI Skills & Expertise
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolioData?.toolNames?.map((toolName) => (
              <AISkillCard key={toolName.id} toolName={toolName} />
            ))}
          </div>
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

                    {proj.link && proj.link.length > 0 && (
                      <div className="flex flex-wrap gap-3 mt-4">
                        {proj.link.map((link) => (
                          <motion.a
                            key={link.id}
                              href={link.link}
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
    </div>
  );
};

const TemplateTwo = ({ userDetails, portfolioData }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-white relative"
    >
      {/* Side Navigation */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-50 border-r border-gray-200 p-8">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900">{userDetails?.name}</h1>
            <p className="text-gray-600 mt-2">{userDetails?.title}</p>
            <p className="text-gray-500 text-sm">{userDetails?.email}</p>
          </div>
          <div className="space-y-2">
            <a href="#about" className="block text-gray-600 hover:text-gray-900">About</a>
            <a href="#skills" className="block text-gray-600 hover:text-gray-900">Skills</a>
            <a href="#projects" className="block text-gray-600 hover:text-gray-900">Projects</a>
            <a href="#education" className="block text-gray-600 hover:text-gray-900">Education</a>
            <a href="#certificates" className="block text-gray-600 hover:text-gray-900">Certificates</a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-12">
        {/* About Section */}
        <motion.section
          id="about"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">{userDetails?.about}</p>
        </motion.section>

        {/* Skills Grid */}
        <motion.section
          id="skills"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Skills & Expertise</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {portfolioData?.toolNames?.map((tool) => (
              <motion.div
                key={tool.id}
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="font-semibold text-gray-900">{tool.name}</h3>
                {tool.tools?.map((t) => (
                  <p key={t.id} className="text-gray-600 text-sm mt-2">{t.name}</p>
                ))}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Projects */}
        <motion.section
          id="projects"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Projects</h2>
          <div className="grid grid-cols-1 gap-8">
            {portfolioData?.userDetails?.project?.map((proj) => (
              <motion.div
                key={proj.id}
                whileHover={{ scale: 1.01 }}
                className="p-8 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="text-2xl font-semibold text-gray-900">{proj.name}</h3>
                <p className="text-gray-600 mt-4">{proj.description}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {proj.link?.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm hover:bg-gray-300 transition-colors"
                    >
                      {link.name}
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Education */}
        <motion.section
          id="education"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Education</h2>
          <div className="space-y-8">
            {portfolioData?.userDetails?.education?.map((edu) => (
              <motion.div
                key={edu.id}
                whileHover={{ scale: 1.01 }}
                className="p-8 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-600">{edu.field_of_study}</p>
                    <p className="text-gray-500 mt-2">{edu.University}</p>
                    <p className="text-gray-500">{edu.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-500">{edu.start_date} - {edu.end_date}</p>
                    {edu.current_grade && (
                      <p className="text-gray-600 mt-2">Grade: {edu.current_grade}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Certificates */}
        <motion.section
          id="certificates"
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Certificates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {portfolioData?.userDetails?.certificate?.map((cert) => (
              <motion.div
                key={cert.id}
                whileHover={{ scale: 1.01 }}
                className="p-6 bg-gray-50 rounded-xl shadow-sm hover:shadow-md transition-all"
              >
                <h3 className="text-xl font-semibold text-gray-900">{cert.name}</h3>
                <p className="text-gray-600 mt-2">{cert.issuing_organization}</p>
                <div className="mt-4 space-y-2">
                  <p className="text-gray-500">Competitions Battled: {cert.competition_battled}</p>
                  <p className="text-gray-500">Competitions Won: {cert.competition_won}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

const TemplateThree = ({ userDetails, portfolioData }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-indigo-800 text-white relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        {/* Animated gradient orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="relative">
        {/* Hero Section */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="min-h-screen flex flex-col items-center justify-center text-center px-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm max-w-3xl mx-auto"
          >
            <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-6">
              {userDetails?.name}
            </h1>
            <p className="text-2xl text-purple-200">{userDetails?.title}</p>
            <p className="text-purple-300 mt-2">{userDetails?.email}</p>
            <p className="text-purple-200 mt-6 text-lg">{userDetails?.about}</p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <div className="animate-bounce">
              <p className="text-purple-300">Scroll to explore</p>
              <div className="w-6 h-6 border-b-2 border-r-2 border-purple-300 transform rotate-45 mx-auto mt-4"></div>
            </div>
          </motion.div>
        </motion.div>

        {/* Projects Showcase */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="min-h-screen py-20 px-4"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
              Featured Projects
            </h2>
            <div className="space-y-20">
              {portfolioData?.userDetails?.project?.map((proj, index) => (
                <motion.div
                  key={proj.id}
                  initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="bg-white/10 rounded-2xl backdrop-blur-sm p-8"
                >
                  <h3 className="text-3xl font-bold text-purple-200 mb-4">{proj.name}</h3>
                  <p className="text-purple-300 text-lg mb-6">{proj.description}</p>
                  <div className="flex flex-wrap gap-4">
                    {proj.link?.map((link) => (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-purple-500/20 hover:bg-purple-500/30 rounded-full text-purple-200 transition-all"
                      >
                        {link.name}
                      </a>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Skills & Tools */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="py-20 px-4 bg-gradient-to-b from-transparent to-black/30"
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
              Skills & Expertise
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioData?.toolNames?.map((tool) => (
                <motion.div
                  key={tool.id}
                  whileHover={{ scale: 1.02, rotate: 1 }}
                  className="bg-white/10 rounded-2xl backdrop-blur-sm p-6 border border-white/10"
                >
                  <h3 className="text-2xl font-semibold text-purple-200 mb-4">{tool.name}</h3>
                  <div className="space-y-3">
                    {tool.tools?.map((t) => (
                      <p key={t.id} className="text-purple-300 flex items-center">
                        <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                        {t.name}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Education & Certificates Combined */}
        <motion.section
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="py-20 px-4"
        >
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
            {/* Education */}
            <div>
              <h2 className="text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                Education
              </h2>
              <div className="space-y-8">
                {portfolioData?.userDetails?.education?.map((edu) => (
                  <motion.div
                    key={edu.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/10 rounded-2xl backdrop-blur-sm p-6 border border-white/10"
                  >
                    <h3 className="text-xl font-semibold text-purple-200">{edu.degree}</h3>
                    <p className="text-purple-300 mt-2">{edu.field_of_study}</p>
                    <p className="text-purple-400 mt-1">{edu.University}</p>
                    <p className="text-purple-400/80 mt-4">{edu.start_date} - {edu.end_date}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certificates */}
            <div>
              <h2 className="text-4xl font-bold mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-purple-500">
                Certificates
              </h2>
              <div className="space-y-8">
                {portfolioData?.userDetails?.certificate?.map((cert) => (
                  <motion.div
                    key={cert.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/10 rounded-2xl backdrop-blur-sm p-6 border border-white/10"
                  >
                    <h3 className="text-xl font-semibold text-purple-200">{cert.name}</h3>
                    <p className="text-purple-300 mt-2">{cert.issuing_organization}</p>
                    <div className="mt-4 flex justify-between text-purple-400/80">
                      <span>Battles: {cert.competition_battled}</span>
                      <span>Wins: {cert.competition_won}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
};

// Add this CSS at the top of your file or in your global CSS
const pageTransitionVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.98 }
};

const Page = ({ params }) => {
  // Unwrap params using React.use()
  const unwrappedParams = use(params);
  const decodedEmail = decodeURIComponent(unwrappedParams.email);
  console.log(decodedEmail);
  console.log(unwrappedParams.email);

  const { data: session } = useSession();
  const { email: authEmail } = useAuth();

  // Update the ownership check to compare both session email and auth context email
  const isOwner = (session?.user?.email === decodedEmail) || (authEmail === decodedEmail);

  // Simplify the auth check to just require either the session token or ownership
  const canEdit = isOwner && (session?.user?.accessToken || session?.user?.email);

  const { portfolioData, updateUserDetails, loading, error } = usePortfolio(decodedEmail);
  const [isEditing, setIsEditing] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [currentTemplate, setCurrentTemplate] = useState('template1');
  const [isLoading, setIsLoading] = useState(false);
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
      tools: [
      ]
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
        toolname: portfolioData.userDetails.toolname || [],
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
    setIsLoading(true);

    try {
      // 1. Update user details
      const userResponse = await fetch(`http://localhost:8000/api/userdetails/${decodedEmail}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: userDetails.name || '',
          email: userDetails.email || '',
          phone_number: userDetails.phone_number || '',
          about: userDetails.about || '',
        }),
      });

      if (!userResponse.ok) {
        throw new Error('Failed to update user details');
      }

      // 2. Add toolnames
      if (userDetails.toolname?.[0]?.name) {
        await fetch('http://localhost:8000/api/toolnames/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: userDetails.toolname[0].name,
            user: userDetails.id,
            tools: userDetails.toolname[0].tools || []
          }),
        });
      }

      // 3. Add education
      if (userDetails.education?.[0]) {
        await fetch('http://localhost:8000/api/education/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            degree: userDetails.education[0].degree || '',
            field_of_study: userDetails.education[0].field_of_study || '',
            University: userDetails.education[0].University || '',
            location: userDetails.education[0].location || '',
            start_date: userDetails.education[0].start_date || '',
            end_date: userDetails.education[0].end_date || '',
            current_grade: userDetails.education[0].current_grade || '',
            user: userDetails.id
          }),
        });
      }

      // 4. Add projects
      if (userDetails.project?.[0]) {
        const projectResponse = await fetch('http://localhost:8000/api/projects/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: userDetails.project[0].name || '',
            description: userDetails.project[0].description || '',
            user: userDetails.id
          }),
        });

        if (projectResponse.ok) {
          const projectData = await projectResponse.json();
          
          // Add link for the project if exists
          if (userDetails.project[0].link?.[0]) {
            await fetch('http://localhost:8000/api/links/', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                name: userDetails.project[0].link[0].name || '',
                url: userDetails.project[0].link[0].url || '',
                project: projectData.id
              }),
            });
          }
        }
      }

      // 5. Add certificates
      if (userDetails.certificate?.[0]) {
        await fetch('http://localhost:8000/api/certificates/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: userDetails.certificate[0].name || '',
            competition_battled: userDetails.certificate[0].competition_battled || 0,
            competition_won: userDetails.certificate[0].competition_won || 0,
            user: userDetails.id
          }),
        });
      }

      toast.success('Profile updated successfully');
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    } finally {
      setIsLoading(false);
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

  // const handleRemoveEducation = (index) => {
  //   setUserDetails(prev => ({
  //     ...prev,
  //     education: prev.education.filter((_, i) => i !== index)
  //   }));
  // };

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

  // const handleRemoveProject = (index) => {
  //   setUserDetails(prev => ({
  //     ...prev,
  //     project: prev.project.filter((_, i) => i !== index)
  //   }));
  // };

  // const handleAddProjectLink = (projectIndex) => {
  //   setUserDetails(prev => {
  //     const newProjects = [...prev.project];
  //     newProjects[projectIndex] = {
  //       ...newProjects[projectIndex],
  //       link: [...newProjects[projectIndex].link, { name: '', url: '' }]
  //     };
  //     return { ...prev, project: newProjects };
  //   });
  // };

  // const handleRemoveProjectLink = (projectIndex, linkIndex) => {
  //   setUserDetails(prev => {
  //     const newProjects = [...prev.project];
  //     newProjects[projectIndex] = {
  //       ...newProjects[projectIndex],
  //       link: newProjects[projectIndex].link.filter((_, i) => i !== linkIndex)
  //     };
  //     return { ...prev, project: newProjects };
  //   });
  // };

  // Add this state in your Page component
  const [selectedTemplate, setSelectedTemplate] = useState('template1');

  // Add this function in your Page component
  const handleTemplateChange = async (template) => {
    // Convert template string to corresponding integer value
    let templateValue;
    switch (template) {
      case 'template1':
        templateValue = 0;
        break;
      case 'template2':
        templateValue = 1;
        break;
      case 'template3':
        templateValue = 2;
        break;
      default:
        templateValue = 0; // Default to template1
    }

    setCurrentTemplate(template);
    try {
      const response = await fetch(`http://localhost:8000/api/userdetails/${decodedEmail}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          template: templateValue,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update template');
      }

      const data = await response.json();
      console.log('Template updated successfully:', data);
      toast.success('Template updated successfully!');
    } catch (error) {
      console.error('Error updating template:', error);
      toast.error('Failed to update template');
    }
  };

  // Render the appropriate template
  const renderTemplate = () => {
    return (
      <motion.div
        key={currentTemplate}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransitionVariants}
        transition={{ duration: 0.3 }}
      >
        {(() => {
          switch (currentTemplate) {
            case 'template1':
              return <TemplateOne userDetails={userDetails} portfolioData={portfolioData} />;
            case 'template2':
              return <TemplateTwo userDetails={userDetails} portfolioData={portfolioData} />;
            case 'template3':
              return <TemplateThree userDetails={userDetails} portfolioData={portfolioData} />;
            default:
              return <TemplateOne userDetails={userDetails} portfolioData={portfolioData} />;
          }
        })()}
      </motion.div>
    );
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
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#333',
            color: '#fff',
          },
        }}
      />
      <div className="min-h-screen bg-neutral-950 relative">
        {/* Main content */}
        {renderTemplate()}
        {/* Enhanced edit button */}
      {isOwner && (
          <div className="fixed bottom-8 right-8 flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowTemplateModal(true)}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span className="flex items-center">
                <Palette className="w-5 h-5 mr-2" />
                Change Design
              </span>
            </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsEditing(true)}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
              <span className="flex items-center">
                <Edit className="w-5 h-5 mr-2" />
          Edit Profile
              </span>
        </motion.button>
          </div>
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
                        value={userDetails.name || ''}
                    onChange={(e) => setUserDetails(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                      <label className="text-neutral-400 block mb-2">Email</label>
                  <input
                        type="email"
                        value={userDetails.email || ''}
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
                    <div key={index} className="p-4 border border-neutral-800 rounded-lg space-y-4">
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
                            type="datetime-local"
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
                            type="datetime-local"
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
                    <div key={index} className="p-4 border border-neutral-800 rounded-lg space-y-4">
                      <div className="grid grid-cols-1 gap-4">
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
                        {/* Project Links */}
                        {proj.link.map((link, linkIndex) => (
                          <div key={linkIndex} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <label className="text-neutral-400 block mb-2">Link Name</label>
                              <input
                                type="text"
                                value={link.name}
                                onChange={(e) => {
                                  const newProjects = [...userDetails.project];
                                  newProjects[index].link[linkIndex] = { ...link, name: e.target.value };
                                  setUserDetails(prev => ({ ...prev, project: newProjects }));
                                }}
                                className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                              />
                            </div>
                            <div>
                              <label className="text-neutral-400 block mb-2">URL</label>
                  <input
                    type="url"
                                value={link.url}
                                onChange={(e) => {
                                  const newProjects = [...userDetails.project];
                                  newProjects[index].link[linkIndex] = { ...link, url: e.target.value };
                                  setUserDetails(prev => ({ ...prev, project: newProjects }));
                                }}
                    className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
                        ))}
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
                      onClick={() => setUserDetails(prev => ({
                        ...prev,
                        certificate: [...prev.certificate, {
                          name: '',
                          competition_battled: 0,
                          competition_won: 0
                        }]
                      }))}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                >
                      Add Certificate
                </motion.button>
                  </div>
                  {userDetails.certificate.map((cert, index) => (
                    <div key={index} className="p-4 border border-neutral-800 rounded-lg space-y-4">
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
                          <label className="text-neutral-400 block mb-2">Competitions Battled</label>
                          <input
                            type="number"
                            value={cert.competition_battled}
                            onChange={(e) => {
                              const newCertificates = [...userDetails.certificate];
                              newCertificates[index] = { ...cert, competition_battled: parseInt(e.target.value) || 0 };
                              setUserDetails(prev => ({ ...prev, certificate: newCertificates }));
                            }}
                            className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="text-neutral-400 block mb-2">Competitions Won</label>
                          <input
                            type="number"
                            value={cert.competition_won}
                            onChange={(e) => {
                              const newCertificates = [...userDetails.certificate];
                              newCertificates[index] = { ...cert, competition_won: parseInt(e.target.value) || 0 };
                              setUserDetails(prev => ({ ...prev, certificate: newCertificates }));
                            }}
                            className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tools Section */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-neutral-300">Tools</h3>
                <motion.button
                      type="button"
                      onClick={() => setUserDetails(prev => ({
                        ...prev,
                        toolname: [...prev.toolname, {
                          name: '',
                          user: '',
                          tools: []
                        }]
                      }))}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-blue-500/10 text-blue-400 rounded-lg hover:bg-blue-500/20 transition-colors"
                >
                      Add Tool
                </motion.button>
                  </div>
                  {userDetails.toolname.map((tool, index) => (
                    <div key={index} className="p-4 border border-neutral-800 rounded-lg">
                      <div>
                        <label className="text-neutral-400 block mb-2">Tool Name</label>
                        <input
                          type="text"
                          value={tool.name}
                          onChange={(e) => {
                            const newTools = [...userDetails.toolname];
                            newTools[index] = { ...tool, name: e.target.value };
                            setUserDetails(prev => ({ ...prev, toolname: newTools }));
                          }}
                          className="w-full bg-neutral-800 px-4 py-2 rounded-lg border border-neutral-700 text-neutral-200 focus:border-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50"
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}


        {/* Template Selection Modal */}
        {showTemplateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="bg-neutral-900 p-6 rounded-2xl w-full max-w-4xl mx-4"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Choose Template</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { id: 'template1', name: 'Modern Dark', description: 'A sleek dark theme with AI effects' },
                  { id: 'template2', name: 'Minimal Light', description: 'Clean and minimal design with light colors' },
                  { id: 'template3', name: 'Gradient Glow', description: 'Dynamic design with gradient effects' },
                ].map((template) => (
                  <motion.button
                    key={template.id}
                    onClick={() => handleTemplateChange(template.id)}
                    className={`p-4 rounded-xl border-2 transition-all duration-300 ${currentTemplate === template.id
                        ? 'border-blue-500 bg-blue-500/10'
                        : 'border-neutral-700 hover:border-neutral-500'
                      }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="aspect-video bg-neutral-800 rounded-lg mb-4">
                      {/* Template preview image placeholder */}
                      <div className="w-full h-full flex items-center justify-center text-neutral-400">
                        Preview
    </div>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{template.name}</h3>
                    <p className="text-sm text-neutral-400">{template.description}</p>
                  </motion.button>
                ))}
              </div>
              <div className="mt-6 flex justify-end">
                <motion.button
                  onClick={() => setShowTemplateModal(false)}
                  className="px-6 py-3 rounded-lg bg-neutral-800 text-white hover:bg-neutral-700 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Close
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}


      </div>
    </>
  );
};

export default Page; 