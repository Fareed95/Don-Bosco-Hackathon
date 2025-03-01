'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Settings } from 'lucide-react';
import { useUserContext } from '@/app/context/Userinfo';

const HeroBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-neutral-950" />
    <div className="absolute inset-0 bg-grid-small-white/[0.05] -z-10" />
    <div className="absolute inset-0 bg-dot-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
    <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent" />
  </div>
);

const Avatar = () => {
  const {contextname} = useUserContext();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const videoRef = useRef(null);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showVoiceSettings, setShowVoiceSettings] = useState(false);
  const [speechRate, setSpeechRate] = useState(1);
  const [speechPitch, setSpeechPitch] = useState(1);

  useEffect(() => {
    // Get available voices and select a default female voice
    const setVoice = () => {
      const voices = window.speechSynthesis.getVoices();
      // Try to find a female English voice
      const maleVoice = voices.find(voice =>
        voice.lang.startsWith('en') &&
        (voice.name.includes('male') || voice.name.includes('Male') || voice.name.includes('Ava'))
      );
      setSelectedVoice(maleVoice || voices[0]);
    };

    // Set voice when voices are loaded
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = setVoice;
    }
    setVoice();
  }, []);

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
    }
  };

  const speak = (text) => {
    if (!selectedVoice) return;

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    // Break the text into smaller chunks (around 150 characters each)
    const chunks = text.match(/.{1,150}(?:\s|$)/g) || [];
    let currentChunk = 0;
    let isLastChunk = false;

    const stopVideo = () => {
      setIsSpeaking(false);
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        videoRef.current.loop = false;
      }
    };

    const speakChunk = () => {
      if (currentChunk < chunks.length) {
        const utterance = new SpeechSynthesisUtterance(chunks[currentChunk]);
        utterance.voice = selectedVoice;
        utterance.rate = speechRate;
        utterance.pitch = speechPitch;
        utterance.volume = isMuted ? 0 : volume;

        // Check if this is the last chunk
        isLastChunk = currentChunk === chunks.length - 1;

        // Start or ensure video is playing
        if (currentChunk === 0) {
          setIsSpeaking(true);
        }
        
        if (videoRef.current) {
          // Ensure video keeps playing and loops
          videoRef.current.loop = true;
          const playVideo = () => {
            if (videoRef.current && videoRef.current.paused) {
              videoRef.current.play().catch(console.error);
            }
          };
          playVideo();
          
          // Keep checking if video is playing during speech
          const videoCheckInterval = setInterval(playVideo, 100);
          
          utterance.onend = () => {
            clearInterval(videoCheckInterval);
            currentChunk++;
            
            if (currentChunk < chunks.length) {
              speakChunk(); // Speak next chunk
            } else {
              // Ensure video stops after a small delay to prevent any lingering speech
              setTimeout(stopVideo, 100);
            }
          };

          utterance.onerror = (err) => {
            console.error('Speech error:', err);
            clearInterval(videoCheckInterval);
            stopVideo();
          };
        }

        window.speechSynthesis.speak(utterance);
      }
    };

    // Start speaking the first chunk
    speakChunk();

    // Safety timeout to stop video if speech somehow doesn't trigger onend
    const maxSpeechTime = chunks.length * 10000; // 10 seconds per chunk maximum
    const safetyTimeout = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused) {
        stopVideo();
      }
    }, maxSpeechTime);

    // Cleanup safety timeout when component unmounts or new speech starts
    return () => clearTimeout(safetyTimeout);
  };

  // Handle user input (both voice and text)
  const handleUserInput = async (text) => {
    if (!text.trim()) return;

    setIsLoading(true);
    setMessages(prev => [...prev, { type: 'user', content: text }]);

    // Mock response with a single test message
    const sampleText = "Hello! This is a sample response to test the avatar's speech functionality. So please be patient with me. I am a senior HR manager. I am here to help you with your HR needs. basically she is beautiful and she is a senior HR manager.";

    // Simulate API response delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    setResponse(sampleText);
    setMessages(prev => [...prev, { type: 'ai', content: sampleText }]);

    // Speak the response
    speak(sampleText);
    setIsLoading(false);
  };
useEffect(() => {
  handleUserInput("hello")
}, [contextname ]);
  return (
    <div className="w-full h-full relative">
      {/* Background with reduced opacity */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-neutral-950/50" />
        <div className="absolute inset-0 bg-grid-small-white/[0.02] -z-10" />
        <div className="absolute inset-0 bg-dot-white/[0.02] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
      </div>

      {/* Avatar Container */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div className="w-full h-full relative overflow-hidden rounded-xl">
          {/* Video Element */}
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            src="/seniorhr.mp4"
            playsInline
            muted={isMuted}
            loop={isSpeaking}
            style={{ objectPosition: '50% 20%' }}
          >
            Your browser does not support the video tag.
          </video>

          {/* Speaking Indicator */}
          {isSpeaking && (
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
              <div className="flex space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse delay-75" />
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse delay-150" />
              </div>
            </div>
          )}

          {/* Volume Controls - Only show on hover */}
          <div className="absolute bottom-0 right-0 p-2 opacity-0 hover:opacity-100 transition-opacity">
            <button
              onClick={toggleMute}
              className="p-1.5 rounded-full bg-black/40 hover:bg-black/60 transition-colors"
            >
              {isMuted ? (
                <VolumeX className="w-4 h-4 text-white/80" />
              ) : (
                <Volume2 className="w-4 h-4 text-white/80" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Avatar; 