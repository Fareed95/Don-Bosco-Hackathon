"use client";
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Menu, MoreVertical, MessageCircle, UserPlus, Settings, Bell, Users, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';

const HeroBackground = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden">
    <div className="absolute inset-0 bg-neutral-950" />
    <div className="absolute inset-0 bg-grid-small-white/[0.05] -z-10" />
    <div className="absolute inset-0 bg-dot-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]" />
    <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent" />
  </div>
);

const chatRooms = [
  {
    id: 1,
    name: 'Java Beginners',
    participants: 24,
    messages: 156,
    lastActive: '2m ago'
  },
  {
    id: 2,
    name: 'Web Development',
    participants: 32,
    messages: 243,
    lastActive: '5m ago'
  },
  {
    id: 3,
    name: 'Data Science',
    participants: 18,
    messages: 98,
    lastActive: '12m ago'
  },
  {
    id: 4,
    name: 'Machine Learning',
    participants: 27,
    messages: 178,
    lastActive: '15m ago'
  }
];

const ChatRoomCard = ({ name, participants, messages, lastActive }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="bg-neutral-900/50 border border-neutral-800 p-6 rounded-xl backdrop-blur-sm hover:bg-neutral-800/50 transition-all"
  >
    <div className="flex justify-between items-start mb-4">
      <h3 className="text-xl font-semibold text-neutral-200">{name}</h3>
      <span className="px-2 py-1 bg-neutral-800 rounded-full text-xs text-neutral-400">
        {lastActive}
      </span>
    </div>
    <div className="space-y-2">
      <div className="flex items-center text-neutral-400">
        <Users className="w-4 h-4 mr-2" />
        <span>{participants} participants</span>
      </div>
      <div className="flex items-center text-neutral-400">
        <MessageSquare className="w-4 h-4 mr-2" />
        <span>{messages} messages</span>
      </div>
    </div>
  </motion.div>
);

const Page = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isLoggedIn = !!session;
  const userEmail = session?.user?.email || '';

  const people = [
    { name: 'John Doe', email: 'john.doe@example.com', lastMessage: 'Hey, how are you?', time: '12:30 PM', status: 'online', },
    { name: 'Jane Smith', email: 'jane.smith@example.com', lastMessage: 'Meeting at 3 PM', time: '11:45 AM', status: 'offline' },
    { name: 'Michael Johnson', email: 'michael.johnson@example.com', lastMessage: 'Thanks!', time: '10:20 AM', status: 'online' },
    { name: 'Emily Davis', email: 'emily.davis@example.com', lastMessage: 'See you tomorrow', time: '9:15 AM', status: 'away' },
    { name: 'Chris Lee', email: 'chris.lee@example.com', lastMessage: 'Got it!', time: 'Yesterday', status: 'online' },
    { name: 'Sarah Brown', email: 'sarah.brown@example.com', lastMessage: 'No problem', time: 'Yesterday', status: 'offline' },
    { name: 'David Wilson', email: 'david.wilson@example.com', lastMessage: 'Sounds good', time: 'Yesterday', status: 'online' },
    { name: 'Laura Martinez', email: 'laura.martinez@example.com', lastMessage: 'Ok, perfect!', time: 'Yesterday', status: 'away' },
    { name: 'Daniel Garcia', email: 'daniel.garcia@example.com', lastMessage: 'Will do', time: 'Tuesday', status: 'offline' },
    { name: 'Sophia Hernandez', email: 'sophia.hernandez@example.com', lastMessage: 'Great idea!', time: 'Monday', status: 'online' },
  ];

  const [person1, setPerson] = useState('');
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const roomNamesRef = useRef('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  useEffect(() => {
    if (isLoggedIn && userEmail && person1 && selectedPerson !== null) {
      const generateRoomNames = () => {
        const emails = [
          userEmail.replace('@', '.'),
          person1.replace('@', '.'),
        ].sort();
        roomNamesRef.current = `${emails[0]}_${emails[1]}`;
        router.push(`/ChatRoom/${roomNamesRef.current}`);
        setPerson('');
      };
      generateRoomNames();
    }
  }, [isLoggedIn, userEmail, person1, router, selectedPerson]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-neutral-950 pt-24 flex items-center justify-center">
        <HeroBackground />
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-electric-blue"></div>
      </div>
    );
  }

  if (!isLoggedIn || !userEmail) {
    return (
      <motion.div 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }} 
        className="min-h-screen bg-neutral-950 pt-24"
      >
        <HeroBackground />
        <div className="container mx-auto px-4 flex items-center justify-center">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="glass p-8 rounded-2xl shadow-xl text-center max-w-md w-full mx-4"
          >
            <h1 className="text-3xl font-semibold text-electric-blue mb-4">Please Login First</h1>
            <p className="text-neon-cyan mb-6">You need to be logged in to access the chat lobby.</p>
            <Link href="/">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="neon-btn w-full"
              >
                Go to Home
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // const filteredPeople = people.filter(person =>
  //   person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //   person.email.toLowerCase().includes(searchQuery.toLowerCase())
  // );



  const filteredRooms = chatRooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neutral-950 p-4 relative">
      <HeroBackground />
      
      <div className="max-w-6xl mx-auto pt-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-neutral-200 mb-4">Chat Lobby</h1>
          <p className="text-neutral-400 max-w-2xl mx-auto">
            Join a room to discuss and learn with other students. Share knowledge, ask questions, and grow together.
          </p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Search chat rooms..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl pl-10 pr-4 py-3 text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-neutral-700 transition-colors"
            />
          </div>
        </motion.div>

        {/* Chat Rooms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room, index) => (
            <motion.div
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/ChatRoom/${room.name}`}>
                <ChatRoomCard {...room} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Create Room Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-12 text-center"
        >
          <button
            onClick={() => router.push('/CreateRoom')}
            className="bg-neutral-900/50 border border-neutral-800 px-6 py-3 rounded-xl text-neutral-200 hover:bg-neutral-800/50 transition-all"
          >
            Create New Room
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Page;