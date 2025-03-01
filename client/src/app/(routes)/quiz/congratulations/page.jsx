'use client';
import { useUserContext } from '@/app/context/Userinfo';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import Confetti from 'react-confetti';
import GetUserInfo from '@/components/GetUserInfo';
import { useRoadmap } from '@/app/context/RoadmapContext';

function CongratulationsPage() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });
  const searchParams = useSearchParams();
  const [id, setId] = useState(); 
  const { contextId, contextinput, contextemail, contextsetId } = useUserContext();
  const score = parseInt(searchParams.get('score') || '0');
  const total = parseInt(searchParams.get('total') || '12');
  const theme = searchParams.get('theme') || 'Quiz';
  const percentage = Math.round((score / total) * 100);
  const [roadmapId, setRoadmapId] = useState(null);
  const { roadmap } = useRoadmap();
  const getUserInfo = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/userdetails/${contextemail}/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user ID');
      }

      const result = await response.json();
      setId(result.id);

    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };
  getUserInfo();

  const DownloadCertificate = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/certificate-generate/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error downloading certificate:', error);
    }
  };
  useEffect(() => {
    if (roadmap?.roadmap_id) {
      console.log("idhar ka roadmap ka id hai0",roadmap.roadmap_id)
      setRoadmapId(roadmap.roadmap_id);
    } else {
      // router.push('/');
      console.log("idhar ka roadmap ka id hai1",roadmap.roadmap_id)
    }
  }, [roadmap]);

  const handleDownloadCertificate = async () => {
    try {
      await getUserInfo();

      const response = await fetch(`http://localhost:8000/api/certificate/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: contextinput,
          competition_battled: 12,
          competition_won: score,
          user: id,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      await DownloadCertificate();
    } catch (error) {
      console.error('Error sending certificate:', error);
    }
  };
  console.log(id, score, contextinput)
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const getMessage = () => {
    if (percentage >= 90) return "Outstanding! You're a master!";
    if (percentage >= 70) return "Great job! You've got solid knowledge!";
    if (percentage >= 50) return "Good effort! Keep learning!";
    return "Keep practicing! You'll get better!";
  };

  const getEmoji = () => {
    if (percentage >= 90) return "🏆";
    if (percentage >= 70) return "🌟";
    if (percentage >= 50) return "👍";
    return "💪";
  };

  const handleApplyForInternships = async () => {
    try {
      console.log("Roadmap title:", roadmap.title);
      console.log("email:", contextemail);
  
      const response = await fetch(`http://localhost:8000/api/apply/${contextemail}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "internship_title": contextinput,
          "email": contextemail
        }), 
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log('Application submitted successfully:', result);
      alert('Successfully applied for internship!');
  
    } catch (error) {
      console.error('Error applying for internship:', error);
      alert('Failed to apply for internship. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 relative overflow-hidden">
      {percentage >= 70 && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.2}
        />
      )}

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl w-full glass p-8 rounded-2xl text-center relative z-10"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="text-6xl mb-4 block">{getEmoji()}</span>
          <h1 className="text-4xl font-bold text-electric-blue mb-2">
            Quiz Completed!
          </h1>
          <p className="text-neon-cyan mb-8">{theme}</p>
        </motion.div>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <div className="relative w-48 h-48 mx-auto">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-electric-blue">{percentage}%</span>
            </div>
            <svg className="transform -rotate-90 w-48 h-48">
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                className="text-deep-indigo/20"
              />
              <circle
                cx="96"
                cy="96"
                r="88"
                stroke="currentColor"
                strokeWidth="12"
                fill="transparent"
                strokeDasharray={2 * Math.PI * 88}
                strokeDashoffset={2 * Math.PI * 88 * (1 - percentage / 100)}
                className="text-electric-blue"
              />
            </svg>
          </div>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="space-y-4"
        >
          <p className="text-2xl text-neon-cyan font-medium">
            {getMessage()}
          </p>
          <p className="text-foreground/60">
            You scored {score} out of {total} questions correctly
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8 space-x-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="neon-btn"
            onClick={handleDownloadCertificate}
          >
            Download Certificate
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="glass px-6 py-2 rounded-lg hover:bg-deep-indigo/20"
            onClick={handleApplyForInternships}
          >
            Apply for Internships
          </motion.button>
        </motion.div>
      </motion.div>
      <GetUserInfo />
    </div>
  );
}

export default CongratulationsPage;
