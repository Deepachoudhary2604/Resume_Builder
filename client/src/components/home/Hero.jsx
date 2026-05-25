import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, FileText, CheckCircle } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white selection:bg-indigo-500/30">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[url('https://res.cloudinary.com/dzt1u4gsu/image/upload/v1704253303/grid-dark_x0a0p4.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-20 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-[800px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none transform -translate-y-1/2" />
      <div className="absolute top-0 left-1/4 w-[800px] h-[600px] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none transform -translate-y-1/2" />

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between w-full py-6 px-6 md:px-16 lg:px-24 text-sm max-w-7xl mx-auto border-b border-white/5 backdrop-blur-md bg-slate-950/50">
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-gradient-to-br from-indigo-500 to-purple-600 p-1.5 rounded-lg shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">ResumeAI</span>
        </Link>
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/login" className="hidden md:block font-medium text-slate-400 hover:text-white transition-colors">
            Log in
          </Link>
          <Link to="/register" className="px-5 py-2.5 bg-white text-slate-900 font-semibold rounded-full hover:scale-105 hover:bg-slate-100 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">
            Start Free
          </Link>
        </div>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center pt-32 pb-24 px-4 text-center max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-sm font-medium mb-8 backdrop-blur-md hover:bg-white/10 transition-colors cursor-pointer"
        >
          <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
          <span>ResumeAI Engine 2.0 is now live</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-white max-w-5xl mx-auto leading-[1.05]"
        >
          Your next job, <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 animate-gradient-x">engineered by AI.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-light"
        >
          Stop guessing what recruiters want. Build a highly-optimized, ATS-friendly resume in minutes with our advanced AI engine.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-4 mt-12"
        >
          <Link to='/app'>
            <button className="group relative flex items-center justify-center gap-3 px-8 py-4 bg-white text-slate-950 font-bold rounded-full overflow-hidden transition-transform hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
              <span className="relative z-10 flex items-center gap-2">
                Build My Resume
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </Link>
        </motion.div>

        {/* Abstract UI Preview Graphic */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative mt-24 w-full max-w-4xl mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10 pointer-events-none h-[120%]" />
          <div className="relative rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-xl p-4 shadow-2xl overflow-hidden ring-1 ring-white/5">
            <div className="flex items-center gap-2 border-b border-white/5 pb-4 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="grid grid-cols-3 gap-6 opacity-70">
              <div className="col-span-1 space-y-4">
                <div className="h-4 w-1/2 bg-white/5 rounded" />
                <div className="h-20 w-full bg-white/5 rounded-lg" />
                <div className="h-32 w-full bg-white/5 rounded-lg" />
              </div>
              <div className="col-span-2 space-y-4">
                <div className="flex gap-4">
                  <div className="h-10 flex-1 bg-indigo-500/10 border border-indigo-500/20 rounded-lg flex items-center px-4 gap-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <div className="h-2 w-32 bg-indigo-400/30 rounded" />
                  </div>
                </div>
                <div className="h-4 w-1/3 bg-white/5 rounded mt-8" />
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <div className="h-3 w-3/4 bg-white/10 rounded" />
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <div className="h-3 w-5/6 bg-white/10 rounded" />
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                    <div className="h-3 w-2/3 bg-white/10 rounded" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
