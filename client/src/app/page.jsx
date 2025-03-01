"use client";

import { motion } from 'framer-motion';
import MainInput from '@/components/MainInput';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import TrueFocus from '@/components/TrueFocus';
import Leaderboard from '@/components/Leaderboard';
import SplashCursor from '@/components/SplashCursor';

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const HeroBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    {/* Neutral gradient background */}
    <div className="absolute inset-0 bg-neutral-950" />
    
    {/* Subtle grid */}
    <div className="absolute inset-0 bg-grid-small-white/[0.05] -z-10" />
    
    {/* Subtle dots */}
    <div className="absolute inset-0 bg-dot-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
    
    {/* Gentle radial gradient */}
    <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent" />
  </div>
);

const FloatingElements = () => {
  const elements = [
    { icon: "🎓", delay: 0 },
    { icon: "💡", delay: 0.2 },
    { icon: "📚", delay: 0.4 },
    { icon: "🚀", delay: 0.6 },
    { icon: "💻", delay: 0.8 },
  ];

  return (
    <div className="absolute inset-0 -z-5 overflow-hidden">
      {elements.map((el, index) => (
        <motion.div
          key={index}
          className="absolute text-4xl"
          initial={{ opacity: 0, y: 100 }}
          animate={{ 
            opacity: [0.5, 1, 0.5],
            y: [-20, 20, -20],
            x: index % 2 === 0 ? [-20, 20, -20] : [20, -20, 20]
          }}
          transition={{
            duration: 5,
            delay: el.delay,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          style={{
            left: `${(index + 1) * 15}%`,
            top: `${(index + 1) * 10}%`
          }}
        >
          {el.icon}
        </motion.div>
      ))}
    </div>
  );
};

// Test component data for debugging
const testComponentData = {
  name: "Introduction to React",
  description: "Learn the basics of React",
  topics: ["JSX", "Components", "Props", "State"],
  difficulty: "Beginner"
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [response, setResponse] = useState('');
  const [messages, setMessages] = useState();
  const [isLoading, setIsLoading] = useState(false);
  return (
    <main className="relative min-h-screen">
      <HeroBackground />
      <FloatingElements />
      <SplashCursor />
      
      <div className="flex flex-col">
        <motion.section 
          className="mt-32 relative"
          initial="initial"
          animate="animate"
          variants={fadeIn}
        >
          {/* Hero Section */}
          <div className="text-center mb-12 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <TrueFocus
                sentence="Learn Grow Excel"
                manualMode={false}
                blurAmount={3}
                borderColor="#ffffff"
                glowColor="rgba(255, 255, 255, 0.5)"
                animationDuration={0.2}
                pauseBetweenAnimations={2}
              />
            </motion.div>
            <motion.p 
              className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Discover personalized learning paths and connect with expert mentors to achieve your goals.
            </motion.p>
          </div>

          {/* Search Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <MainInput />
          </motion.div>
        </motion.section>

        {/* Features Section */}
        <motion.section 
          className="mt-20 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-neutral-200 text-center mb-8">
              Why Choose Us?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: "🎯",
                  title: "Personalized Learning",
                  description: "Tailored paths that adapt to your goals and pace"
                },
                {
                  icon: "👥",
                  title: "Expert Mentors",
                  description: "Learn from industry professionals who've been there"
                },
                {
                  icon: "📈",
                  title: "Track Progress",
                  description: "Monitor your growth with detailed analytics"
                }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  className="glass p-6 rounded-xl text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + (index * 0.1) }}
                >
                  <span className="text-4xl mb-4 block">{feature.icon}</span>
                  <h3 className="text-xl font-semibold text-neutral-200 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-neutral-400">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section 
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1 }}
        >
        </motion.section>

        <motion.section 
          className="mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
          >
            <Footer />
          </motion.div>
          
        </motion.section>
      </div>
    </main>
  );
}