"use client";
import Link from 'next/link';
import React, { useEffect, useState, useRef } from 'react';
import { useUserContext } from '@/app/context/Userinfo';
import { useRouter, useParams } from 'next/navigation';
import { Search, Menu, MoreVertical, MessageCircle, Send, Video } from 'lucide-react';

const Page = () => {
  const people = [
    { name: 'John Doe', email: 'john.doe@example.com', lastMessage: 'Hey, how are you?', time: '12:30 PM' },
    { name: 'Jane Smith', email: 'jane.smith@example.com', lastMessage: 'Meeting at 3 PM', time: '11:45 AM' },
    { name: 'Michael Johnson', email: 'michael.johnson@example.com', lastMessage: 'Thanks!', time: '10:20 AM' },
    { name: 'Emily Davis', email: 'emily.davis@example.com', lastMessage: 'See you tomorrow', time: '9:15 AM' },
    { name: 'Chris Lee', email: 'chris.lee@example.com', lastMessage: 'Got it!', time: 'Yesterday' },
    { name: 'Sarah Brown', email: 'sarah.brown@example.com', lastMessage: 'No problem', time: 'Yesterday' },
    { name: 'David Wilson', email: 'david.wilson@example.com', lastMessage: 'Sounds good', time: 'Yesterday' },
    { name: 'Laura Martinez', email: 'laura.martinez@example.com', lastMessage: 'Ok, perfect!', time: 'Yesterday' },
    { name: 'Daniel Garcia', email: 'daniel.garcia@example.com', lastMessage: 'Will do', time: 'Tuesday' },
    { name: 'Sophia Hernandez', email: 'sophia.hernandez@example.com', lastMessage: 'Great idea!', time: 'Monday' },
  ];

  // Chat room states and refs
  const params = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const webSocketRef = useRef(null);
  const messagesEndRef = useRef(null);
  
  const { contextisLoggedIn, contextemail,contextSelectedPerson, contextSetSelectedPerson } = useUserContext();
  const [person1, setPerson] = useState('');
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const roomNamesRef = useRef('');
  const router = useRouter();

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // WebSocket connection
  useEffect(() => {
    if (!roomNamesRef.current) return;

    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_CHAT_APP_SERVER}/ws/chat/${roomNamesRef.current}/`);
    webSocketRef.current = ws;

    ws.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'chat_history') {
        setMessages(data.messages);
      } else {
        setMessages((prev) => [...prev, data]);
      }
    };

    ws.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => ws.close();
  }, [roomNamesRef.current]);

  useEffect(() => {
    if (contextisLoggedIn && contextemail && person1) {
      const generateRoomNames = () => {
        const emails = [
          contextemail.replace('@', '.'),
          person1.replace('@', '.'),
        ].sort();
        roomNamesRef.current = `${emails[0]}_${emails[1]}`;
      };
      generateRoomNames();
    }
  }, [contextisLoggedIn, contextemail, person1]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (message.trim() && webSocketRef.current) {
      const data = {
        username: contextemail,
        message,
      };
      webSocketRef.current.send(JSON.stringify(data));
      setMessage('');
    }
  };

  if (!contextisLoggedIn || contextemail === '') {
    return (
      <div className="flex items-center justify-center min-h-screen bg-neutral-950">
        <div className="bg-neutral-900 p-8 rounded-lg shadow-xl text-center">
          <h1 className="text-3xl font-semibold text-white mb-4">Please Login First</h1>
          <Link href="/login" className="text-neutral-200 hover:text-white transition-colors">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  const filteredPeople = people.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-neutral-950">
      {/* Left Sidebar */}
      <div className="w-96 bg-neutral-900 border-r border-neutral-800 flex flex-col">
        {/* Header */}
        <div className="p-4 bg-neutral-800 border-b border-neutral-700 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-neutral-700 rounded-full"></div>
            <span className="font-semibold text-white">{contextemail}</span>
          </div>
          <div className="flex items-center space-x-3 text-neutral-400">
            <Menu className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
            <MoreVertical className="w-5 h-5 cursor-pointer hover:text-white transition-colors" />
          </div>
        </div>

        {/* Search */}
        <div className="p-3 bg-neutral-900">
          <div className="relative">
            <input
              type="text"
              placeholder="Search or start new chat"
              className="w-full py-2 px-4 pl-10 bg-neutral-800 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-neutral-600 placeholder-neutral-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="w-5 h-5 text-neutral-500 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Chats List */}
        <div className="flex-1 overflow-y-auto hide-scrollbar">
          {filteredPeople.map((person, index) => (
            <div
              key={index}

              onClick={() => {
                
                
                  if (contextisLoggedIn && contextemail && person.email) {
                    const generateRoomNames = () => {
                      const emails = [
                        contextemail.replace('@', '.'),
                        person.email.replace('@', '.'),
                      ].sort();
                      roomNamesRef.current = `${emails[0]}_${emails[1]}`;
                      contextSetSelectedPerson(person);
                      router.push(`/ChatRoom/${roomNamesRef.current}`);
                      setPerson('');
                    };
                    generateRoomNames();
                  }
               else{
                console.log(contextemail,person)
               }

                
                
              }}
              className={`p-4 border-b border-neutral-800 hover:bg-neutral-800 cursor-pointer transition-colors ${
                selectedPerson?.email === person.email ? 'bg-neutral-800' : ''
              }`}
            >
              <div className="flex items-center space-x-3 ">
                <div className="w-12 h-12 bg-neutral-700 rounded-full flex-shrink-0"></div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-sm font-semibold text-white truncate">{person.name}</h3>
                    <span className="text-xs text-neutral-500">{person.time}</span>
                  </div>
                  <p className="text-sm text-neutral-400 truncate">{person.lastMessage}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Chat Area */}
      <div className="flex-1 flex flex-col bg-neutral-950">
        {contextSelectedPerson ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-neutral-700 rounded-full"></div>
                <div>
                  <h2 className="font-semibold text-white">{contextSelectedPerson.name}</h2>
                  <p className="text-sm text-neutral-400">{contextSelectedPerson.email}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Link href={`/VideoCall/${roomNamesRef.current}`}>
                  <Video className="w-5 h-5 text-neutral-400 cursor-pointer hover:text-white transition-colors" />
                </Link>
                <MoreVertical className="w-5 h-5 text-neutral-400 cursor-pointer hover:text-white transition-colors" />
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 p-4 bg-neutral-950 overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex ${
                    msg.username === contextemail ? 'justify-end' : 'justify-start'
                  } mb-4`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg ${
                      msg.username === contextemail
                        ? 'bg-neutral-700 text-white'
                        : 'bg-neutral-800 text-white'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-neutral-300">
                        {msg.username === contextemail ? 'You' : msg.username}
                      </span>
                      <span className="text-xs text-neutral-400">{msg.timestamp}</span>
                    </div>
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <form
              onSubmit={sendMessage}
              className="p-4 bg-neutral-900 border-t border-neutral-800 flex items-center space-x-2"
            >
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
                className="flex-grow p-3 rounded-lg bg-neutral-800 text-white placeholder-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-600"
              />
              <button
                type="submit"
                className="bg-neutral-700 p-3 rounded-full hover:bg-neutral-600 transition-colors"
              >
                <Send className="w-5 h-5 text-white" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-neutral-950 text-neutral-500">
            <div className="text-center">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 text-neutral-700" />
              <p className="text-neutral-400">Select a chat to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;