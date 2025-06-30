import React from 'react';
import { motion } from 'framer-motion';
import { Network, User, Settings, Crown } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';
import Button from '../ui/Button';

export default function Header() {
  const { user, isAuthenticated } = useUser();

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="bg-white/80 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <Network size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-primary-900">Nexus AI</h1>
              <p className="text-xs text-primary-600">From Information to Execution</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-primary-600 hover:text-primary-900 transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-primary-600 hover:text-primary-900 transition-colors">
              Pricing
            </a>
            <a href="#agents" className="text-primary-600 hover:text-primary-900 transition-colors">
              Future Agents
            </a>
          </nav>

          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                {user?.plan === 'pro' && (
                  <div className="flex items-center space-x-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    <Crown size={14} />
                    <span>Pro</span>
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <User size={20} className="text-primary-600" />
                  <span className="text-sm font-medium text-primary-900">{user?.name}</span>
                </div>
                <Button variant="ghost" icon={Settings} size="sm">
                  Settings
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
                <Button size="sm">
                  Get Started
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
}