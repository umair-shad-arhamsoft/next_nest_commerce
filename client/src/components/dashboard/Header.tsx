'use client';

import { ShoppingBag, Bell } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useAppSelector } from '@/redux/hooks';

export const Header = () => {
  const { user } = useAuth();
  const cart = useAppSelector((state) => state.cart);

  if (!user) return null;

  return (
    <header className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 p-6 backdrop-blur-xl">
      <h2 className="text-2xl font-semibold text-white">Dashboard Overview</h2>
      <div className="flex items-center gap-4">
        <div className="relative mr-4 cursor-pointer group">
          <div className="absolute -inset-2 rounded-full bg-indigo-500/0 group-hover:bg-indigo-500/10 transition-all" />
          <ShoppingBag className="h-6 w-6 text-slate-400 group-hover:text-indigo-400 transition-colors" />
          {cart.totalQuantity > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-bold text-white shadow-lg shadow-indigo-600/40">
              {cart.totalQuantity}
            </span>
          )}
        </div>
        <button className="rounded-full bg-slate-800 p-2 text-slate-400 hover:text-white transition-all">
          <Bell className="h-5 w-5" />
        </button>
        <div className="flex items-center gap-3 border-l border-slate-800 pl-4">
          <div className="text-right">
            <p className="text-sm font-medium text-white">{user.name}</p>
            <p className="text-xs text-slate-500 capitalize">{user.role}</p>
          </div>
          <div className="h-10 w-10 rounded-full bg-indigo-600 flex items-center justify-center font-bold shadow-lg shadow-indigo-600/20 text-white">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
};
