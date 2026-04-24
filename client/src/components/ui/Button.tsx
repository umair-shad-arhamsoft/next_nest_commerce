'use client';

import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ButtonProps } from '@/types';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  disabled,
  ...props
}: ButtonProps) => {
  const variants = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-lg shadow-indigo-600/20',
    secondary: 'bg-emerald-600 text-white hover:bg-emerald-500 shadow-lg shadow-emerald-600/20',
    outline: 'border border-slate-700 bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white',
    ghost: 'bg-transparent text-slate-400 hover:bg-slate-800 hover:text-white',
    danger: 'bg-red-500/10 text-red-500 border border-red-500/20 hover:bg-red-500 hover:text-white',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-xs',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3.5 text-base',
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={cn(
        'relative flex items-center justify-center gap-2 rounded-lg font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/40 disabled:opacity-70 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {!isLoading && leftIcon}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </motion.button>
  );
};
