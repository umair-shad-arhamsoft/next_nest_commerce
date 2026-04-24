'use client';

import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = ({ label, error, icon, className, ...props }: InputProps) => {
  return (
    <div className="w-full space-y-2">
      {label && <label className="text-sm font-medium text-slate-300">{label}</label>}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
            {icon}
          </div>
        )}
        <input
          className={cn(
            'w-full rounded-lg border border-slate-800 bg-slate-950/50 py-2.5 text-white placeholder-slate-600 transition-all focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20',
            icon && 'pl-10',
            !icon && 'pl-4',
            error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20',
            className
          )}
          {...props}
        />
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
};
