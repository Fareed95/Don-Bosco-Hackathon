"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from 'next-auth/react';
import { useUserContext } from '@/app/context/Userinfo';
import UserIcon from '@/components/UserIcon';
import { motion } from "framer-motion";
import img from '../../public/logo.png';
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { useRouter } from "next/navigation";

function Navbar() {
  const { data: session } = useSession();
  const { contextisLoggedIn, contextsetIsLoggedIn, contextsetName, contextsetEmail } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (session) {
      contextsetIsLoggedIn(true);
      contextsetEmail(session.user.email);
      contextsetName(session.user.name);
    }
  }, [session]);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/About" },
    { label: "Lobby", href: "/Lobby" },

  ];

  const Logout = () => {
    localStorage.setItem('authToken', "-");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent">
      <div className="bg-neutral-glass border border-glass-border mx-4 mt-4 rounded-2xl backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="h-10 w-10 overflow-hidden"
              >
                <img src={img.src} alt="Logo" className="h-full w-full object-cover" />
              </motion.div>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-neutral-text hover:text-white transition-colors"
                >
                  <motion.span
                    whileHover={{ y: -2 }}
                    className="relative group"
                  >
                    {item.label}
                    <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-cyan-500 to-white transform scale-x-0 group-hover:scale-x-100 transition-transform" />
                  </motion.span>
                </Link>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="flex items-center space-x-4">
              {session || contextisLoggedIn ? (
                <div className="flex items-center space-x-4">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => signOut() && Logout()}
                    className="relative group px-4 py-2 rounded-lg overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-white/10 to-cyan-500/20 group-hover:opacity-100 opacity-50 transition-opacity" />
                    <div className="relative border-glass-border rounded-lg text-neutral-text group-hover:text-white transition-colors">
                      Logout
                    </div>
                  </motion.button>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="cursor-pointer"
                  >
                    <div
                      onClick={() => router.push("/UserInfo")}
                      >
                      <AnimatedTooltip items={[{
                        id: 1,
                        name: session?.user?.name || "User",
                        designation: "Member",
                        image: session?.user?.image || "/default-avatar.png",
                      }]} /></div>
                  </motion.div>
                </div>

              ) : (
                <Link href="/Login">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group px-4 py-2 rounded-lg overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-white/10 to-cyan-500/20 group-hover:opacity-100 opacity-50 transition-opacity" />
                    <div className="relative bg-neutral-glass border border-glass-border px-4 py-2 rounded-lg text-neutral-text group-hover:text-white transition-colors">
                      Login
                    </div>
                  </motion.button>
                </Link>
              )}

              {/* Mobile Menu Button */}
              <div className="md:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="relative group p-2 rounded-lg overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-white/10 to-cyan-500/20 group-hover:opacity-100 opacity-50 transition-opacity" />
                  <div className="relative bg-neutral-glass border border-glass-border p-2 rounded-lg">
                    <svg
                      className="h-6 w-6 text-neutral-text group-hover:text-white transition-colors"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {isOpen ? (
                        <path d="M6 18L18 6M6 6l12 12" />
                      ) : (
                        <path d="M4 6h16M4 12h16M4 18h16" />
                      )}
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden py-4"
            >
              <div className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="text-neutral-text hover:text-white px-4 py-2 rounded-lg hover:bg-gradient-to-r hover:from-cyan-500/20 hover:to-white/10 transition-all duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
