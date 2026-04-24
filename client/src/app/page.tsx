'use client';

import { motion } from 'framer-motion';
import { ShoppingBag, ArrowRight, ShieldCheck, Zap, Globe } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-950 text-slate-50 selection:bg-indigo-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 z-50 w-full border-b border-slate-800/50 bg-slate-950/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3 text-indigo-500">
            <ShoppingBag className="h-8 w-8" />
            <span className="text-xl font-bold tracking-tight text-white">Commerce</span>
          </div>
          <div className="hidden items-center gap-8 md:flex">
            <a href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Products</a>
            <a href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Solutions</a>
            <a href="#" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Sign In</Link>
            <Link 
              href="/register" 
              className="rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(79,70,229,0.3)] transition-all hover:bg-indigo-500 hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] active:scale-95"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative flex min-h-screen items-center justify-center pt-20">
          <div className="absolute inset-0 z-0 overflow-hidden">
            <div className="absolute top-[20%] left-[20%] h-[50%] w-[50%] rounded-full bg-indigo-600/10 blur-[120px]" />
            <div className="absolute bottom-[20%] right-[20%] h-[50%] w-[50%] rounded-full bg-blue-600/10 blur-[120px]" />
          </div>

          <div className="container relative z-10 mx-auto px-6 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block rounded-full border border-indigo-500/20 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-400">
                New v2.0 is live
              </span>
              <h1 className="mt-8 text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl">
                The Future of <br />
                <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
                  Modern Commerce
                </span>
              </h1>
              <p className="mx-auto mt-8 max-w-2xl text-lg text-slate-400 md:text-xl">
                Build, scale, and manage your online business with the most advanced full-stack ecommerce platform. Powered by NestJS and Next.js.
              </p>
              <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Link 
                  href="/register"
                  className="group flex items-center gap-2 rounded-full bg-white px-8 py-4 font-bold text-slate-950 transition-all hover:bg-slate-200 active:scale-95"
                >
                  Start Building Now
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
                <button className="rounded-full border border-slate-800 bg-slate-900/50 px-8 py-4 font-bold text-white transition-all hover:bg-slate-800 active:scale-95">
                  View Demo
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-slate-900 bg-slate-950/50 py-24 backdrop-blur-sm">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-500">
                  <Zap className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Lightning Fast</h3>
                <p className="text-slate-400 leading-relaxed">Built with the latest technologies to ensure maximum performance and sub-second response times.</p>
              </div>
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Bank-Grade Security</h3>
                <p className="text-slate-400 leading-relaxed">Integrated JWT authentication and Prisma data safety ensures your users' data is always protected.</p>
              </div>
              <div className="space-y-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-500">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">Global Scale</h3>
                <p className="text-slate-400 leading-relaxed">Ready to handle millions of requests with a modular architecture that grows with your business.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-12">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-slate-500">© 2026 Modern Commerce Platform. Built with ❤️ for professional developers.</p>
        </div>
      </footer>
    </div>
  );
}
