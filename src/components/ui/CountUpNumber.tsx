import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface CountUpNumberProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  decimals?: number;
  separator?: string;
}

export default function CountUpNumber({
  end,
  duration = 2,
  prefix = '',
  suffix = '',
  className = '',
  decimals = 0,
  separator = ','
}: CountUpNumberProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (endTime - startTime), 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      setCount(end * easeOutQuart);

      if (progress < 1) {
        requestAnimationFrame(updateCount);
      }
    };

    requestAnimationFrame(updateCount);
  }, [end, duration]);

  const formatNumber = (num: number) => {
    const rounded = Number(num.toFixed(decimals));
    return rounded.toLocaleString('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    });
  };

  return (
    <motion.span
      className={`font-mono font-bold ${className}`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {prefix}{formatNumber(count)}{suffix}
    </motion.span>
  );
}