'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { FaUsers, FaGraduationCap, FaLightbulb, FaChartLine } from 'react-icons/fa';
import NitinImage from '../../../../public/Nitin.jpg';
import FareedImage from '../../../../public/Fareed.jpg';
import RouteNavigator from '@/components/RouteNavigator';
import InternshipForm from '@/components/dashboard/organization/InternshipForm';


const HeroBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    {/* Enhanced gradient background */}
    <div className="absolute inset-0 bg-gradient-to-b from-deep-indigo/30 via-soft-purple/20 to-electric-blue/10" />
    
    {/* Animated grid with parallax effect */}
    <motion.div 
      className="absolute inset-0 bg-grid-small-white/[0.2] -z-10"
      animate={{
        backgroundPosition: ['0px 0px', '100px 100px'],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        repeatType: 'reverse',
      }}
    />
    
    {/* Enhanced gradient dots */}
    <div className="absolute inset-0 bg-dot-white/[0.3] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
    
    {/* Animated radial gradient */}
    <motion.div 
      className="absolute inset-0 bg-gradient-radial from-soft-purple/30 via-transparent to-transparent"
      animate={{
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        repeat: Infinity,
        repeatType: 'reverse',
      }}
    />
  </div>
);

const features = [
  {
    icon: <FaGraduationCap className="text-4xl text-electric-blue" />,
    title: "Expert Education",
    description: "Learn from industry professionals and experienced educators"
  },
  {
    icon: <FaLightbulb className="text-4xl text-neon-cyan" />,
    title: "Innovative Learning",
    description: "Interactive courses designed for maximum engagement"
  },
  {
    icon: <FaChartLine className="text-4xl text-soft-purple" />,
    title: "Track Progress",
    description: "Monitor your growth with detailed analytics and insights"
  },
  {
    icon: <FaUsers className="text-4xl text-electric-blue" />,
    title: "Community",
    description: "Join a vibrant community of learners and mentors"
  }
];

const teamMembers = [
  {
    name: "Nitin Gupta",
    role: "UI/UX Designer & Frontend Developer",
    image: NitinImage,
    priority: true
  },
  {
    name: "Fareed Sayed",
    role: "Backend Developer & Machine Learning Engineer",
    image: FareedImage,
    priority: false
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-neutral-950 relative overflow-hidden">
      <HeroBackground />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-4xl mx-auto space-y-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-electric-blue to-neon-cyan">
              About Us
            </span>
          </h1>
          <p className="text-xl text-foreground/80 leading-relaxed">
            We're on a mission to transform education through technology and innovation,
            making quality learning accessible to everyone.
          </p>
        </motion.div>
      </section>

        <InternshipForm />

      <motion.section 
          className="mt-20 px-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
        >
          <RouteNavigator />
        </motion.section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass p-8 rounded-2xl hover-glow relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-electric-blue/5 rounded-full -mr-16 -mt-16 group-hover:bg-electric-blue/10 transition-colors" />
              <div className="relative z-10 space-y-4">
                {feature.icon}
                <h3 className="text-xl font-semibold text-neon-cyan">
                  {feature.title}
                </h3>
                <p className="text-foreground/80">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Team Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-electric-blue mb-4">
            Meet Our Team
          </h2>
          <p className="text-xl text-foreground/80">
            The passionate individuals behind our success
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="glass p-8 rounded-2xl hover-glow relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-electric-blue/5 rounded-full -mr-24 -mt-24 group-hover:bg-electric-blue/10 transition-colors" />
              <div className="relative z-10 flex flex-col items-center space-y-4">
                <div className="relative w-32 h-32 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100px, 128px"
                    className="object-cover hover:scale-110 transition-transform duration-300"
                    priority={member.priority}
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-neon-cyan">
                    {member.name}
                  </h3>
                  <p className="text-foreground/80">
                    {member.role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Join Section */}
      <section className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass p-12 rounded-2xl text-center max-w-4xl mx-auto relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/10 to-neon-cyan/10" />
          <div className="relative z-10 space-y-6">
            <h2 className="text-3xl font-bold text-electric-blue">
              Join Our Journey
            </h2>
            <p className="text-xl text-foreground/80 max-w-2xl mx-auto">
              Be part of our mission to revolutionize education and empower learners worldwide.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="neon-btn px-8 py-3 text-lg"
            >
              Get Started Today
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
