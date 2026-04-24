'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User as UserIcon } from 'lucide-react';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormValues) => {
    setIsLoading(true);
    setError(null);
    try {
      await api.post('/auth/register', data);
      router.push('/login?registered=true');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-12">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full bg-emerald-600/10 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] h-[40%] w-[40%] rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full max-w-md"
      >
        <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-8 shadow-2xl backdrop-blur-xl">
          <div className="mb-8 text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            >
              <UserPlus className="h-6 w-6 text-white" />
            </motion.div>
            <h1 className="text-3xl font-bold tracking-tight text-white">Create account</h1>
            <p className="mt-2 text-slate-400">Join our modern ecommerce community</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="rounded-lg bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20"
              >
                {error}
              </motion.div>
            )}

            <Input
              label="Full Name"
              placeholder="John Doe"
              icon={<UserIcon className="h-5 w-5" />}
              error={errors.name?.message}
              {...register('name')}
            />

            <Input
              label="Email Address"
              type="email"
              placeholder="name@example.com"
              icon={<Mail className="h-5 w-5" />}
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              icon={<Lock className="h-5 w-5" />}
              error={errors.password?.message}
              {...register('password')}
            />

            <Button
              type="submit"
              variant="secondary"
              className="w-full"
              isLoading={isLoading}
            >
              Sign Up
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-emerald-400 hover:text-emerald-300 transition-colors">
              Sign in instead
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
