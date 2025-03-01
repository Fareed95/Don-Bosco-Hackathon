'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useUserContext } from '@/app/context/Userinfo';
const HeroBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-neutral-950" />
    <div className="absolute inset-0 bg-grid-small-white/[0.05] -z-10" />
    <div className="absolute inset-0 bg-dot-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
    <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent" />
  </div>
);

function QuizPage() {
  const {contextinput} = useUserContext();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:8001/testseries`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            input_value: `${contextinput}`
          })
        });

        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }

        const data = await response.json();
        if (!data.questions || data.questions.length === 0) {
          throw new Error('No questions available');
        }
        setQuestions(data.questions);
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswer = (answer) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
    setIsAnswered(true);
    
    if (answer === questions[currentQuestionIndex].answer) {
      setScore(score + 1);
    }

    // Wait for 1.5 seconds before moving to the next question
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedAnswer(null);
        setIsAnswered(false);
      } else {
        // Quiz completed, navigate to results page
        router.push(`/quiz/congratulations?score=${score + (answer === questions[currentQuestionIndex].answer ? 1 : 0)}&total=${questions.length}&topic=Java`);
      }
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <HeroBackground />
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-neutral-400 mx-auto mb-4" />
          <p className="text-neutral-400">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <HeroBackground />
        <div className="text-center">
          <p className="text-red-400 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-neutral-800 text-neutral-200 rounded-lg hover:bg-neutral-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-neutral-950 pt-20 pb-8 px-4 relative">
      <HeroBackground />
      
      <div className="max-w-3xl mx-auto">
        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-neutral-400 mb-2">
            <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
            <span>Score: {score}</span>
          </div>
          <div className="w-full h-2 bg-neutral-800/50 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"
            />
          </div>
        </div>

        {/* Question */}
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-neutral-900/30 border border-neutral-800/50 p-8 rounded-2xl backdrop-blur-sm mb-6 shadow-xl"
        >
          <h2 className="text-2xl text-neutral-200 font-semibold mb-6">{currentQuestion.question}</h2>
          
          <div className="space-y-4">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => handleAnswer(option)}
                disabled={isAnswered}
                className={`w-full p-5 rounded-xl text-left transition-all ${
                  isAnswered
                    ? option === currentQuestion.answer
                      ? 'bg-green-500/10 text-green-300 border-green-500/30'
                      : option === selectedAnswer
                      ? 'bg-red-500/10 text-red-300 border-red-500/30'
                      : 'bg-neutral-800/30 text-neutral-400'
                    : 'bg-neutral-800/30 text-neutral-200 hover:bg-neutral-700/30 hover:border-neutral-700'
                } border border-neutral-800/50 backdrop-blur-sm`}
                whileHover={!isAnswered ? { scale: 1.02, transition: { duration: 0.2 } } : {}}
                whileTap={!isAnswered ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center">
                  <span className="w-8 h-8 rounded-lg border border-current flex items-center justify-center mr-4 text-sm">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-lg">{option}</span>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default QuizPage; 