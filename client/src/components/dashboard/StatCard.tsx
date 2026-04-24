'use client';

import { motion } from 'framer-motion';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface StatCardProps {
  title: string;
  value: string | number;
  subValue?: string;
  trend?: string;
  variant?: 'indigo' | 'emerald' | 'purple';
}

export const StatCard = ({ title, value, subValue, trend, variant = 'indigo' }: StatCardProps) => {
  const variants = {
    indigo: 'text-indigo-400',
    emerald: 'text-emerald-400',
    purple: 'text-purple-400',
  };

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6 shadow-lg backdrop-blur-sm">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
      {(subValue || trend) && (
        <div className="mt-4 flex items-center gap-2 text-sm">
          {trend && <span className={variants[variant]}>{trend}</span>}
          {subValue && <span className="text-slate-500">{subValue}</span>}
        </div>
      )}
    </div>
  );
};
