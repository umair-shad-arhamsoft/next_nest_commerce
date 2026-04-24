'use client';

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { addItem } from '@/redux/features/cartSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { Sidebar } from '@/components/dashboard/Sidebar';
import { Header } from '@/components/dashboard/Header';
import { StatCard } from '@/components/dashboard/StatCard';
import { Button } from '@/components/ui/Button';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const dispatch = useAppDispatch();
  const cart = useAppSelector((state) => state.cart);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  const handleTestAddToCart = () => {
    dispatch(addItem({
      id: 'prod_' + Math.floor(Math.random() * 1000),
      name: 'Premium Product',
      price: 199.99,
      image: '/product.jpg'
    }));
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="h-12 w-12 rounded-full border-4 border-indigo-600 border-t-transparent"
        />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-50">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <Header />

        <div className="p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {/* Welcome Card */}
            <div className="col-span-full rounded-2xl border border-slate-800 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 p-8 shadow-xl backdrop-blur-md">
              <h1 className="text-4xl font-bold">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
              <p className="mt-2 text-lg text-slate-300">You have {cart.totalQuantity} items in your cart. Ready to checkout?</p>
              <div className="mt-6 flex gap-4">
                <Button>
                  View Recent Activity
                </Button>
                <Button 
                  onClick={handleTestAddToCart}
                  variant="outline"
                  className="border-indigo-500/30 bg-indigo-500/10 text-indigo-400 hover:bg-indigo-600"
                >
                  Quick Add Item
                </Button>
              </div>
            </div>

            {/* Stat Cards */}
            <StatCard 
              title="Cart Total (Redux)"
              value={`$${cart.totalAmount.toFixed(2)}`}
              trend={`${cart.totalQuantity} items`}
              subValue="managed by Toolkit"
            />
            <StatCard 
              title="Active Users"
              value="1,284"
              trend="+5.2%"
              subValue="from last month"
              variant="emerald"
            />
            <StatCard 
              title="Sales Growth"
              value="24%"
              trend="Stable"
              subValue="compared to last week"
            />
          </motion.div>
        </div>
      </main>
    </div>
  );
}
