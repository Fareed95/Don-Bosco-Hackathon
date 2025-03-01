'use client';
// http://localhost:8000/api/oauth2/login/
import { motion } from 'framer-motion';
import Link from 'next/link';

const RouteNavigator = () => {
  const routes = [
    { path: '/avatar', label: 'AI Avatar' },
    { path: '/quiz', label: 'Quiz' },
    { path: '/Learning', label: 'Learning' },
    { path: '/userInfo', label: 'Profile' },
    { path: '/Lobby', label: 'Chat Lobby' },
    { path: '/Login', label: 'Login' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/mentor/dashboard', label: 'Mentor Dashboard' },
    { path: '/organization/dashboard', label: 'Organization Dashboard' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass p-8 rounded-2xl"
    >
      <h2 className="text-2xl font-bold text-electric-blue mb-6 text-center">
        Quick Navigation
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {routes.map((route, index) => (
          <motion.div
            key={route.path}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Link href={route.path}>
              <motion.button
                className="w-full glass px-4 py-3 rounded-xl text-neon-cyan hover:text-electric-blue transition-colors relative group overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-electric-blue/10 to-neon-cyan/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="relative z-10">{route.label}</span>
              </motion.button>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default RouteNavigator; 