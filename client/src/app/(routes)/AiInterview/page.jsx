"use client"
import React, { useState, useEffect, useRef, use } from 'react';
import AvatarComponent from '@/components/avatar/AvatarComponent';
import VoiceControls from '@/components/avatar/VoiceControls';
import { Volume2, VolumeX, Settings } from 'lucide-react';
import Avatar from '@/components/avatar/Avatar';
import { useUserContext } from '@/app/context/Userinfo';

const Page = () => {
  const { setcontextInterview,contextInterview ,contextInterviewdeets,contextemail} = useUserContext(); // Updated hook
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const [devices, setDevices] = useState([]);
  const [selectedDeviceId, setSelectedDeviceId] = useState('');
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Speech recognition states
  const [isListening, setIsListening] = useState(false);

  const [interviewee_name, setinterviewee_name] = useState('');
  const [course_name, setcourse_name] = useState('');
  const [company_email, setcompany_email] = useState('');
  const [company_data, setcompany_data] = useState('');
  const [internship_data, setinternship_data] = useState('');
  const [ans,setans] = useState('Not');
  const [ID, setID] = useState(1);

  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);
  const timeoutRef = useRef(null);
  const interimTranscriptRef = useRef('');

  // Add avatar-related states
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [response, setResponse] = useState('')

  useEffect(() => {
    setcompany_data(contextInterviewdeets.company_description)
    setcompany_email(contextInterviewdeets.company_email)
    setinternship_data(contextInterviewdeets.internship_description)
    setcourse_name(contextInterviewdeets.internship_name)
    setinterviewee_name(contextInterviewdeets.user_name)
    console.log(contextInterviewdeets)
  }, [contextInterviewdeets]);
  



  const Interview = async () => {
  

    try {
      const response = await fetch('http://localhost:8010/api/interviews/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "interviewee_email": contextemail,
          "interviewee_name":interviewee_name,
          "course_name": course_name,
          "company_email": company_email,
          "company_data": company_data,
          "internship_data": internship_data,
           "answer":ans,
          "question_id": ID
      }),
      });
      console.log(contextemail)
      console.log(interviewee_name)
      console.log(course_name)
      console.log(company_email)
      console.log(company_data)
      console.log(internship_data)
      console.log(ans)
      console.log(ID)

      // Log the response status and status text
      console.log('Response Status:', response.status, response.statusText);

      if (!response.ok) {
        console.error("Error Ai responce not got", response);
      
        return;
      }

      const result = await response.json();
      
      setResponse(result.question)
      setID(result.question_id)
      console.log("result",result)

    } catch (error) {
      console.error("Error Getting from Ai", error);
    
    }
  };

  useEffect(() => {
    if(company_email){
      Interview()
    }
  
  }, [ transcript,company_email]);

  useEffect(() => {
    console.log(response);
    setcontextInterview(response)
  }, [response]);
  
  // Get list of available camera devices
  const getVideoDevices = async () => {
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setDevices(videoDevices);
      
      // Select the first device by default if available
      if (videoDevices.length > 0 && !selectedDeviceId) {
        setSelectedDeviceId(videoDevices[0].deviceId);
      }
    } catch (err) {
      console.error('Error getting video devices:', err);
      setCameraError('Unable to access camera devices');
    }
  };

  // Initialize devices on component mount
  useEffect(() => {
    getVideoDevices();
  }, [internship_data]);

  // Start or stop the camera
  const toggleCamera = async () => {
    if (isCameraActive) {
      // Stop the camera
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      setIsCameraActive(false);
    } else {
      // Start the camera
      try {
        const constraints = {
          video: selectedDeviceId ? { deviceId: { exact: selectedDeviceId } } : true
        };
        
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        streamRef.current = stream;
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        
        setIsCameraActive(true);
        setCameraError(null);
      } catch (err) {
        console.error('Error accessing camera:', err);
        setCameraError('Unable to access camera: ' + err.message);
      }
    }
  };

  // Initialize speech recognition
  useEffect(() => {
    // Check if browser supports the Web Speech API
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      console.error('Speech recognition is not supported in this browser');
      return;
    }

    // Create the recognition object
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    
    // Configure the recognition
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = true;
    recognitionInstance.lang = 'en-US';
    
    // Set up event handlers
    recognitionInstance.onresult = (event) => {
      clearTimeout(timeoutRef.current);
      
      let finalTranscript = '';
      let interimTranscript = '';
      
      // Process the results
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptText = event.results[i][0].transcript;
        
        if (event.results[i].isFinal) {
          // This is a final result (sentence ended naturally)
          finalTranscript += transcriptText;
          console.log('Final speech (sentence complete):', transcriptText);
          setTranscript(transcriptText);
        } else {
          // This is an interim result
          interimTranscript += transcriptText;
        }
      }
      
      // Save the interim transcript to check for pauses
      if (interimTranscript) {
        interimTranscriptRef.current = interimTranscript;
        
        // Set a timeout to detect pauses
        timeoutRef.current = setTimeout(() => {
          console.log('Final speech (after 2-second pause):', interimTranscriptRef.current);
          setTranscript(interimTranscriptRef.current);
          interimTranscriptRef.current = '';
        }, 2000);
      }
    };
    
    recognitionInstance.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };
    
    recognitionInstance.onend = () => {
      if (isListening) {
        recognitionInstance.start();
      }
    };
    
    setRecognition(recognitionInstance);
    
    // Cleanup
    return () => {
      if (recognition) {
        recognition.stop();
      }
      clearTimeout(timeoutRef.current);
    };
  }, [isListening]);
  
  const toggleListening = () => {
    if (!recognition) return;
    
    if (isListening) {
      recognition.stop();
      setIsListening(false);
      clearTimeout(timeoutRef.current);
    } else {
      recognition.start();
      setIsListening(true);
    }
  };

  // Handle device selection change
  const handleDeviceChange = (e) => {
    setSelectedDeviceId(e.target.value);
    
    // If camera is already active, restart with new device
    if (isCameraActive) {
      toggleCamera().then(() => toggleCamera());
    }
  };

  useEffect(() => {
    // Start camera immediately on component mount
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true,
          audio: true
        });
        streamRef.current = stream;
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        
        setIsCameraActive(true);
      } catch (err) {
        console.error('Error accessing camera:', err);
        setCameraError('Unable to access camera: ' + err.message);
      }
    };

    startCamera();
   
    // Cleanup
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  useEffect(() => {
    if(transcript!==''){
      setans(transcript)

    }
    if(ID!==1){
      setans(transcript)
    }
  }, [transcript]);
  return (
    <div className="flex flex-col min-h-screen bg-neutral-950 ">
      {/* Main Content */}
      <div className="flex flex-1 mt-20 gap-4 p-4">
        {/* Left Panel - Camera Feed */}
        <div className="w-[40%] h-full flex flex-col gap-4 justify-center items-center">
          <div className="flex-1 bg-black/30 rounded-xl border border-neutral-800/50 overflow-hidden backdrop-blur-sm">
            <div className="w-full h-full relative">
              {!isCameraActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                  <p className="text-white/70 text-sm">Connecting camera...</p>
                </div>
              )}
              <video
                ref={videoRef}
                className="w-full h-full object-cover"
                autoPlay
                playsInline
                muted
              />
            </div>
            
            {cameraError && (
              <div className="p-2 bg-red-900/20 border-t border-red-500/20">
                <p className="text-red-200 text-xs">{cameraError}</p>
              </div>
            )}
          </div>

          {/* Interview Info */}
          <div className="bg-black/30 rounded-xl border border-neutral-800/50 p-4 backdrop-blur-sm">
            <h3 className="text-lg font-semibold text-white mb-2">Interview Session</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-neutral-400 text-sm">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span>Live Interview</span>
              </div>
              <div className="text-neutral-500 text-xs">
                Your responses are being analyzed in real-time
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Avatar and Caption */}
        <div className="w-[28%] h-full flex flex-col gap-4">
          {/* Avatar Container */}
          <div className="flex-1 bg-black/30 rounded-xl border border-neutral-800/50 overflow-hidden backdrop-blur-sm">
            <div className="w-full h-full relative">
              <Avatar />
            </div>
          </div>

          {/* Caption Box */}
          <div className="h-32 bg-black/30 rounded-xl border border-neutral-800/50 backdrop-blur-sm p-4">
            <div className="h-full flex flex-col">
              <div className="flex-1 text-neutral-400 text-sm">
                {transcript || "Your speech will appear here..."}
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-neutral-800/50">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-green-500 animate-pulse' : 'bg-neutral-600'}`}></div>
                  <span className="text-xs text-neutral-500">{isListening ? 'Listening...' : 'Click to start'}</span>
                </div>
                <button
                  onClick={toggleListening}
                  className={`px-3 py-1 rounded-lg text-xs ${
                    isListening 
                      ? 'bg-red-500/20 text-red-400 hover:bg-red-500/30' 
                      : 'bg-blue-500/20 text-blue-400 hover:bg-blue-500/30'
                  }`}
                >
                  {isListening ? 'Stop' : 'Start'} Listening
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;