import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, BrainCircuit, Target, ShieldCheck, Zap } from 'lucide-react';
import Titles from './Titles.jsx';

const Features = () => {
  return (
    <div id="features" className="py-24 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-sm font-medium mb-6"
          >
            <Zap className="w-4 h-4" />
            <span>Powerful Features</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white mb-6"
          >
            Everything you need to <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">stand out.</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-400"
          >
            Our AI doesn't just check your grammar. It analyzes your career trajectory and strategically positions you for your dream role.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Feature 1 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="col-span-1 lg:col-span-2 relative group rounded-3xl bg-white/5 border border-white/10 p-8 overflow-hidden hover:bg-white/10 transition-colors"
          >
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
              <BrainCircuit className="w-32 h-32 text-indigo-500" />
            </div>
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/20 flex items-center justify-center mb-6 border border-indigo-500/30">
                <BrainCircuit className="w-6 h-6 text-indigo-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">AI Content Optimization</h3>
              <p className="text-slate-400 max-w-md">
                Instantly transform weak bullet points into powerful, metric-driven achievements that grab recruiters' attention.
              </p>
            </div>
          </motion.div>

          {/* Feature 2 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="col-span-1 relative group rounded-3xl bg-white/5 border border-white/10 p-8 overflow-hidden hover:bg-white/10 transition-colors"
          >
             <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center mb-6 border border-purple-500/30">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">ATS Compatibility</h3>
              <p className="text-slate-400">
                Scan your resume against any job description to get an instant match score and keyword gap analysis.
              </p>
          </motion.div>

          {/* Feature 3 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="col-span-1 relative group rounded-3xl bg-white/5 border border-white/10 p-8 overflow-hidden hover:bg-white/10 transition-colors"
          >
             <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mb-6 border border-emerald-500/30">
                <Sparkles className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Smart Suggestions</h3>
              <p className="text-slate-400">
                Auto-generate professional summaries and discover highly sought-after skills tailored to your exact industry.
              </p>
          </motion.div>

          {/* Feature 4 */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="col-span-1 lg:col-span-2 relative group rounded-3xl bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-white/10 p-8 overflow-hidden hover:border-indigo-500/50 transition-colors"
          >
             <div className="flex flex-col md:flex-row gap-8 items-center justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center mb-6 border border-white/20">
                    <ShieldCheck className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Bank-Grade Privacy</h3>
                  <p className="text-slate-400 max-w-sm">
                    Your data is strictly yours. End-to-end encryption ensures your personal information is never shared or sold.
                  </p>
                </div>
                {/* Abstract UI representation */}
                <div className="hidden md:flex flex-col gap-3 w-64 p-4 rounded-xl bg-slate-950/50 border border-white/10 shadow-2xl">
                  <div className="h-2 w-full bg-indigo-500/50 rounded-full" />
                  <div className="h-2 w-3/4 bg-white/20 rounded-full" />
                  <div className="h-2 w-5/6 bg-white/20 rounded-full" />
                  <div className="flex items-center gap-2 mt-4">
                    <div className="w-4 h-4 rounded-full bg-emerald-500" />
                    <span className="text-xs text-slate-300 font-medium">Encrypted & Secured</span>
                  </div>
                </div>
             </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Features;
