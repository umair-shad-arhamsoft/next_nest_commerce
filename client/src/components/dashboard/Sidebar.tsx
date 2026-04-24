'use client';

import { User, LogOut, LayoutDashboard, ShoppingBag, Settings } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export const Sidebar = () => {
  const { logout } = useAuth();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, active: true },
    { name: 'Orders', icon: ShoppingBag },
    { name: 'Profile', icon: User },
    { name: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl">
      <div className="p-6">
        <div className="flex items-center gap-3 text-indigo-500">
          <ShoppingBag className="h-8 w-8" />
          <span className="text-xl font-bold tracking-tight text-white">Commerce</span>
        </div>
      </div>
      
      <nav className="mt-6 space-y-1 px-4">
        {navItems.map((item) => (
          <a
            key={item.name}
            href="#"
            className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-all ${
              item.active 
                ? 'bg-indigo-600/10 text-indigo-400' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-white'
            }`}
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.name}</span>
          </a>
        ))}
      </nav>

      <div className="absolute bottom-8 w-full px-4">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="h-5 w-5" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};
