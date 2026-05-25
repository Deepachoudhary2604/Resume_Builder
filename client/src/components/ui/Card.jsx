import React from 'react';
import { motion } from 'framer-motion';

export const Card = ({ children, className = '', hoverEffect = false, ...props }) => {
  const baseStyle = "bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm";
  const hoverStyle = hoverEffect ? "hover:shadow-xl hover:-translate-y-1 transition-all duration-300" : "";
  
  return (
    <motion.div 
      className={`${baseStyle} ${hoverStyle} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
