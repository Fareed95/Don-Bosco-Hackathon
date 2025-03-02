"use client";
import React, { useEffect, useState, useRef } from 'react';
import { useUserContext } from '@/app/context/Userinfo';
import { useParams } from 'next/navigation';
import { Send } from 'lucide-react';

const Page = () => {
  // Core states for chat
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const webSocketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const { contextemail } = useUserContext();
  const roomNamesRef = useRef('');

  // Scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // WebSocket connection setup
  useEffect(() => {
    if (!roomNamesRef.current) return;

    const ws = new WebSocket(`${process.env.NEXT_PUBLIC_CHAT_APP_SERVER}/ws/chat/${roomNamesRef.current}/`);
    webSocketRef.current = ws;

    ws.onopen = () => console.log("Connected to chat");
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'chat_history') {
        setMessages(data.messages);
      } else {
        setMessages((prev) => [...prev, data]);
      }
    };

    return () => ws.close();
  }, [roomNamesRef.current]);

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

  return (
    <main className="container mx-auto px-4 py-6 max-w-6xl mt-12">
      <div className="bg-neutral-900 rounded-xl shadow-lg overflow-hidden border border-neutral-800">
        {/* Chat Header */}
        <div className="p-4 bg-neutral-900 border-b border-neutral-800">
          <h1 className="text-lg font-semibold text-neutral-100">Community Chat</h1>
          <p className="text-sm text-neutral-400">Connected as {contextemail}</p>
        </div>

        {/* Chat Container */}
        <div className="flex flex-col h-[calc(80vh-4rem)]">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.username === contextemail ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[70%] break-words`}>
                  <div
                    className={`rounded-2xl px-4 py-2 ${
                      msg.username === contextemail
                        ? 'bg-neutral-700 text-neutral-100'
                        : 'bg-neutral-800 text-neutral-100'
                    }`}
                  >
                    <div className="text-xs text-neutral-400 mb-1">
                      {msg.username === contextemail ? 'You' : msg.username}
                    </div>
                    <p className="text-sm">{msg.message}</p>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <form 
            onSubmit={sendMessage}
            className="p-4 bg-neutral-900 border-t border-neutral-800"
          >
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 bg-neutral-800 text-neutral-100 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-neutral-600 text-sm"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(e);
                  }
                }}
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className={`p-2.5 rounded-lg ${
                  message.trim()
                    ? 'bg-neutral-700 hover:bg-neutral-600 text-white'
                    : 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                } transition-colors`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Page;