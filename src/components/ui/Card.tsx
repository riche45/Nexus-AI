import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
}

export default function Card({ children, className = '', hover = false, glass = false }: CardProps) {
  const baseClasses = 'rounded-xl p-6 transition-all duration-200';
  const glassClasses = glass ? 'glass' : 'bg-white shadow-sm border border-gray-100';
  const hoverClasses = hover ? 'hover:shadow-md hover:scale-105' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`${baseClasses} ${glassClasses} ${hoverClasses} ${className}`}
    >
      {children}
    </motion.div>
  );
}