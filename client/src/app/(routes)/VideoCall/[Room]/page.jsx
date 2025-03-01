'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { io } from 'socket.io-client';
import { useUserContext } from '@/app/context/Userinfo';
import { motion } from 'framer-motion';
import { Mic, MicOff, Video, VideoOff, Phone, Users, Settings, Share2 } from 'lucide-react';

const page = () => {
  const { room } = useParams();
  const [name, setName] = useState('');
  const [isNameEntered, setIsNameEntered] = useState(false);
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerConnection = useRef(null);
  const { contextisLoggedIn, contextname } = useUserContext();

  // Automatically set name from context when logged in
  useEffect(() => {
    if (contextisLoggedIn && contextname && !isNameEntered) {
      setName(contextname);
      setIsNameEntered(true);
    }
  }, [contextisLoggedIn, contextname, isNameEntered]);

  useEffect(() => {
    if (isNameEntered) {
      const initSocket = io(`${process.env.NEXT_PUBLIC_VIDEOCALL_SERVER}`);
      setSocket(initSocket);

      // Emit join room with more explicit user info
      initSocket.emit('joinRoom', {
        room,
        user: {
          name: name,
          id: initSocket.id
        }
      });

      // Handle user joining
      initSocket.on('userJoined', ({ user }) => {
        if (user) {
          setUsers((prevUsers) => {
            // Prevent duplicate users
            const isUserExists = prevUsers.some(u => u.name === user.name);
            return isUserExists ? prevUsers : [...prevUsers, user];
          });
        }
      });

      // Initialize room users
      initSocket.on('roomUsers', ({ users: roomUsers }) => {
        if (roomUsers && Array.isArray(roomUsers)) {
          setUsers(roomUsers.map(user => ({
            name: user.name,
            id: user.id
          })));
        }
      });

      initSocket.on('offer', async (offer) => {
        if (peerConnection.current) {
          await peerConnection.current.setRemoteDescription(new RTCSessionDescription(offer));
          const answer = await peerConnection.current.createAnswer();
          await peerConnection.current.setLocalDescription(answer);
          initSocket.emit('answer', {
            answer: peerConnection.current.localDescription,
            room,
            user: {
              name: name,
              id: initSocket.id
            }
          });
        }
      });

      initSocket.on('answer', async (answer) => {
        if (peerConnection.current) {
          await peerConnection.current.setRemoteDescription(new RTCSessionDescription(answer));
        }
      });

      initSocket.on('ice-candidate', (candidate) => {
        if (peerConnection.current) {
          peerConnection.current.addIceCandidate(new RTCIceCandidate(candidate));
        }
      });

      initSocket.on('callEnded', () => {
        endCall();
      });

      return () => {
        initSocket.disconnect();
      };
    }
  }, [isNameEntered, room, name]);

  const startCall = async () => {
    peerConnection.current = new RTCPeerConnection();

    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('ice-candidate', {
          candidate: event.candidate,
          room,
          user: {
            name: name,
            id: socket.id
          }
        });
      }
    };

    peerConnection.current.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localStream.getTracks().forEach((track) => {
      peerConnection.current.addTrack(track, localStream);
    });

    localVideoRef.current.srcObject = localStream;

    const offer = await peerConnection.current.createOffer();
    await peerConnection.current.setLocalDescription(offer);

    socket.emit('offer', {
      offer,
      room,
      user: {
        name: name,
        id: socket.id
      }
    });
  };

  const endCall = () => {
    if (peerConnection.current) {
      peerConnection.current.close();
      peerConnection.current = null;
    }

    if (localVideoRef.current.srcObject) {
      localVideoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      localVideoRef.current.srcObject = null;
    }

    if (remoteVideoRef.current.srcObject) {
      remoteVideoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      remoteVideoRef.current.srcObject = null;
    }

    if (socket) {
      socket.emit('endCall', {
        room,
        user: {
          name: name,
          id: socket.id
        }
      });
    }
  };

  // Automatically start call when logged in
  useEffect(() => {
    if (contextisLoggedIn && socket) {
      startCall();
    }
  }, [contextisLoggedIn, socket]);

  // Add UI state
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);

  return (
    contextisLoggedIn ? (
      <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 text-neutral-100 p-6 relative overflow-hidden mt-[5%]">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
        <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 to-neutral-900/80 backdrop-blur-3xl -z-10" />

        <div className="max-w-7xl mx-auto space-y-8">
          {/* Room Info & Participants */}
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4"
            >
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Room: {room}</h2>
                <p className="text-neutral-400 text-sm">{users.length} participants</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              {users.map((user, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="h-10 w-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center">
                    <span className="text-lg font-semibold">{user.name?.[0]?.toUpperCase()}</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full bg-green-500 border-2 border-neutral-900" />
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Video Grid */}
          <div className="grid md:grid-cols-2 gap-8 relative">
            {/* Local Video */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative group rounded-2xl overflow-hidden"
            >
              <video
                ref={localVideoRef}
                autoPlay
                playsInline
                muted
                className="w-full aspect-video object-cover bg-neutral-900 transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <div className="flex items-center gap-2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full border border-neutral-800">
                  <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                  <span className="text-sm">You ({name})</span>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setIsMuted(!isMuted)} className="p-2 rounded-full bg-black/70 backdrop-blur-sm border border-neutral-800 hover:bg-neutral-800 transition-colors">
                    {isMuted ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                  <button onClick={() => setIsVideoOff(!isVideoOff)} className="p-2 rounded-full bg-black/70 backdrop-blur-sm border border-neutral-800 hover:bg-neutral-800 transition-colors">
                    {isVideoOff ? <VideoOff className="w-4 h-4" /> : <Video className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Remote Video */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="relative group rounded-2xl overflow-hidden"
            >
              <video
                ref={remoteVideoRef}
                autoPlay
                playsInline
                className="w-full aspect-video object-cover bg-neutral-900 transition-transform duration-300 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {users.length > 0 && (
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full border border-neutral-800">
                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                    <span className="text-sm">{users[0]?.name || 'Remote Participant'}</span>
                  </div>
                </div>
              )}
            </motion.div>
          </div>

          {/* Control Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed -translate-x-1/2 w-full flex justify-center"
          >
            <div className="flex items-center gap-4 bg-neutral-900/90 backdrop-blur-xl p-4 rounded-2xl border border-neutral-800 shadow-xl">
              {/* Mute button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </motion.button>

              {/* Video off button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-full bg-neutral-800 hover:bg-neutral-700 transition-colors"
                onClick={() => setIsVideoOff(!isVideoOff)}
              >
                {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
              </motion.button>

              {/* End call button */}
              <motion.button
                onClick={endCall}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-4 rounded-full bg-red-500/20 hover:bg-red-500/30 text-red-500 border border-red-500/50 transition-colors"
              >
                <Phone className="w-6 h-6" />
              </motion.button>
            </div>
          </motion.div>

        </div>
      </div>
    ) : (
      <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-neutral-900/50 backdrop-blur-xl border border-neutral-800 rounded-2xl p-12 text-center max-w-lg w-full"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-cyan-500/10 rounded-2xl" />
          <div className="relative z-10">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 mx-auto mb-6 flex items-center justify-center">
              <Users className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-500 to-cyan-500 bg-clip-text text-transparent mb-4">
              Please Login First
            </h1>
            <p className="text-neutral-400 mb-8">
              You need to be logged in to join this video call
            </p>
            <div className="h-1 w-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" />
          </div>
        </motion.div>
      </div>
    )
  );
};

export default page;
